import _sum from 'lodash/sum'
import * as r from './value-ranges'
import type {ScoreFn} from './utils'

const fakespotLetterToNumber = (letter: string): number => {
  switch (letter) {
    case 'A': return 10;
    case 'B': return 8;
    case 'C': return 6;
    case 'D': return 2;
    case 'F': return 0;
    default: return 8; // Default to "B" if not present
  }
};

/**
 * @task: This function calculates the score of a treadmill's rating. The rating looks
 * like `[[number, number], [number, number, number, number]]` - which breaks down to:
 * ```
 * [
 *   [ star ratings from amazon, number of ratings],
 *   [ 5-star percentage, 4-star, 3, 2, 1]
 * ]
 * ```
 * Then there's fakespot, which looks like [number, number]. This is:
 * ```
 * [ product fakespot grade, company fakespot grade ]
 * ```
 * The logic is as follows.
 * - Start with the star rating (row.rating.value[0][0])
 * - If there are too few ratings available, modify the rating to tend towards 4.0. Too
 *   few is subjective (10 is too few), but it should be calculated from the min/max range
 *   variables.
 * - Then comes 1-star skew. The proportion of 1-stars relative to the other stars is
 *   a smoking gun of quality issues or fake reviews. This should penalize the rating.
 *   Eg [90, 0, 0, 2, 8] is worse than [60, 30, 5, 4, 1]. Make this logic pretty tight
 *   and simple though, don't have a bunch of if/else. Really make it clever.
 * - Then comes fakespot reviews. The company's fakespot should be more impactful
 *   than the product's fakespot.
 */

export const rating: ScoreFn = (row) => {
  // Default values
  const details = {
    starRating: 0,
    ratingCount: 0,
    distribution: [0, 0, 0, 0, 0],
    fakespotProduct: 'B', // Default to B if not present
    fakespotCompany: 'B', // Default to B if not present
  };

  // Get the star rating data
  let starRatingBase = 0;
  const ratingValue = row.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;

  if (ratingValue?.length === 2) {
    const [[starRating, ratingCount], distribution] = ratingValue;

    details.starRating = starRating;
    details.ratingCount = ratingCount;
    
    if (distribution?.length === 5) {
      details.distribution = distribution;
    }

    // Star rating normalization using min-max from r.rating
    if (starRating <= r.rating.starRatings.min) {
      starRatingBase = 0;
    } else if (starRating >= r.rating.starRatings.max) {
      starRatingBase = 10;
    } else {
      starRatingBase = 10 * (starRating - r.rating.starRatings.min) /
                      (r.rating.starRatings.max - r.rating.starRatings.min);
    }
  }

  // Handle the "too few ratings" logic - make the rating tend towards 4.0
  // 4.0 on a 5-point scale is 80% or 8.0 on our 10-point scale
  let adjustedRating = starRatingBase;
  if (details.ratingCount > 0) {
    // Calculate a weight factor based on the number of ratings
    // Using log scale for rating counts since perception of count differences follows logarithmic pattern
    const logCount = Math.log10(Math.max(1, details.ratingCount));
    const logMin = r.rating.ratingCounts.log.min;
    const logMax = r.rating.ratingCounts.log.max;
    
    // Weight from 0.0 (few ratings) to 1.0 (many ratings)
    const ratingWeight = Math.min(1.0, Math.max(0.0, (logCount - logMin) / (logMax - logMin)));
    
    // Blend between 8.0 (representing 4.0 stars) and the actual rating based on count
    // With few ratings, it will be closer to 8.0
    // With many ratings, it will be closer to the actual rating
    adjustedRating = (8.0 * (1 - ratingWeight)) + (starRatingBase * ratingWeight);
  }

  // Apply the distribution factor with focus on 1-star skew
  let distributionFactor = 1.0;
  if (details.distribution.length === 5) {
    const total = _sum(details.distribution);
    if (total > 0) {
      // Calculate percentages
      const percentages = details.distribution.map(count => (count / total) * 100);
      const [five, four, three, two, one] = percentages;
      
      // Calculate 1-star skew - high 1-star percentage relative to 2,3,4 stars is suspicious
      // This is a more focused approach than the general C-shape detection
      const midStarAvg = (four + three + two) / 3;
      const oneStarRatio = midStarAvg > 0 ? one / midStarAvg : 0;
      
      // Penalize high 1-star to mid-star ratio
      // A ratio of 1.0 means equal 1-stars to average mid-stars
      // A ratio of 2.0 means twice as many 1-stars as average mid-stars
      const oneStarPenalty = Math.min(0.5, oneStarRatio * 0.25);
      
      // Check for stair-step pattern (ideal distribution)
      const isStairStep = five >= four && four >= three && three >= two && two >= one;
      const stairStepBonus = isStairStep ? 0.2 : 0;
      
      // Calculate final distribution factor
      distributionFactor = 1.0 - oneStarPenalty + stairStepBonus;
      
      // Clamp the factor between 0.5 and 1.2
      distributionFactor = Math.max(0.5, Math.min(1.2, distributionFactor));
    }
  }
  
  const distributionAdjustedRating = adjustedRating * distributionFactor;

  // Get the fakespot data
  let fakespotModifier = 1.0; // Default to neutral
  const fakespotValue = row.fakespot?.value as [string, string] | undefined;

  if (fakespotValue?.length === 2) {
    const [productGrade, companyGrade] = fakespotValue;

    details.fakespotProduct = productGrade || 'B';
    details.fakespotCompany = companyGrade || 'B';

    // Convert grades to numeric values (A=10, B=8, C=6, D=3, F=1)
    const productScore = fakespotLetterToNumber(productGrade);
    const companyScore = fakespotLetterToNumber(companyGrade);

    // Weight company score more heavily (70/30 split) as specified in the requirements
    const combinedFakespotScore = (productScore * 0.3) + (companyScore * 0.7);
    
    // Scale fakespot score to be a modifier (0.5 to 1.2)
    // This gives more impact to fakespot grades:
    // A,A (10) = 1.2 (20% boost)
    // F,F (1) = 0.5 (50% reduction)
    fakespotModifier = 0.5 + (combinedFakespotScore / 14.3); // 10 = 1.2, 1 = 0.57
  }

  // Combine all factors for the final score
  const finalScore = distributionAdjustedRating * fakespotModifier;

  // Clamp the score between 0 and 10
  return Math.max(0, Math.min(10, finalScore));
};