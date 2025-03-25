import data from "./data/index";
import dayjs from 'dayjs'
import _ from 'lodash'
import type {Product} from "~/routes/walk/treadmills/data/types";
import {getPrice} from "~/routes/walk/treadmills/data/utils";
import * as r from './value-ranges'

export const calculatePriceRating = (price: number): number => {
  // Using log scale since price typically has exponential perceived value
  // (difference between $100-$200 feels bigger than $2000-$2100)
  if (price <= r.price.min) return 10;
  if (price >= r.price.max) return 0;
  
  // Log scale transformation
  const logMin = Math.log(r.price.min);
  const logMax = Math.log(r.price.max);
  const logPrice = Math.log(price);
  
  // Invert the scale since lower price is better
  return 10 * (1 - ((logPrice - logMin) / (logMax - logMin)));
};

export const calculateWeightRating = (weight: number): number => {
  // Using linear scale since weight perception is fairly linear
  if (weight <= r.weight.min) return 10;
  if (weight >= r.weight.max) return 0;

  // Linear scale between min and max weight
  return 10 - (10 * (weight - r.weight.min) / (r.weight.max - r.weight.min));
};

export const calculateMaxWeightRating = (maxWeight: number): number => {
  // Using linear scale since weight capacity perception is fairly linear
  if (maxWeight <= r.maxWeight.min) return 0;
  if (maxWeight >= r.maxWeight.max) return 10;

  // Linear scale between min and max weight capacity
  return 10 * (maxWeight - r.maxWeight.min) / (r.maxWeight.max - r.maxWeight.min);
};

export const calculateMaxSpeedRating = (maxSpeed: number): number => {
  // Using linear scale since speed perception is fairly linear
  if (maxSpeed <= r.maxSpeed.min) return 0;
  if (maxSpeed >= r.maxSpeed.max) return 10;

  // Linear scale between min and max speed
  return 10 * (maxSpeed - r.maxSpeed.min) / (r.maxSpeed.max - r.maxSpeed.min);
};

export const calculateHorsePowerRating = (horsePower: number): number => {
  // Using a logarithmic scale since perceived power often follows a logarithmic curve
  // (difference between 1HP and 2HP feels bigger than 4HP and 5HP)
  if (horsePower <= r.horsePower.min) return 0;
  if (horsePower >= r.horsePower.max) return 10;
  
  // Log scale transformation
  const logMin = Math.log(r.horsePower.min);
  const logMax = Math.log(r.horsePower.max);
  const logPower = Math.log(horsePower);
  
  return 10 * (logPower - logMin) / (logMax - logMin);
};

export const calculateAgeRating = (ageValue: string | undefined): number => {
  if (!ageValue) return 5;

  // Try to parse the age as a date using dayjs
  let releaseDate = dayjs(ageValue);

  // Check if it's a year only (e.g., "2020")
  if (!releaseDate.isValid() && /^\d{4}$/.test(ageValue)) {
    releaseDate = dayjs(`${ageValue}-01-01`); // January 1st of that year
  }

  // If we couldn't parse a date, return default rating of 5
  if (!releaseDate.isValid()) {
    return 5;
  }

  // Calculate age in years
  const today = dayjs();
  const ageInYears = today.diff(releaseDate, 'year', true);

  // Calculate rating: 10 for today, 0 for 6+ years old
  if (ageInYears <= 0) return 10; // For future dates or today
  if (ageInYears >= 6) return 0;  // For 6+ years old

  // Linear scale between 0 and 6 years
  return 10 - (ageInYears * (10 / 6));
}

export const calculateDecibelsRating = (decibels: number | undefined): number => {
  if (decibels === undefined) return 5; // Default rating if no data

  // Using linear scale on the decibel values since decibels are already logarithmic
  // (the decibel scale itself accounts for how humans perceive sound intensity)
  if (decibels <= r.decibels.min) return 10;
  if (decibels >= r.decibels.max) return 0;

  // Invert the scale since lower decibels is better
  return 10 * (1 - ((decibels - r.decibels.min) / (r.decibels.max - r.decibels.min)));
}

export const calculateDimensionsRating = (dimensions: undefined | [number, number, number]): number => {
  if (!dimensions) return 5;

  const [depth, width, height] = dimensions;

  // Calculate score for depth (lower is better)
  const depthScore = depth >= r.dimensions.depth.max ? 0 :
                     depth <= r.dimensions.depth.min ? 10 :
                     10 - (10 * (depth - r.dimensions.depth.min) /
                          (r.dimensions.depth.max - r.dimensions.depth.min));

  // Calculate score for width (lower is better)
  const widthScore = width >= r.dimensions.width.max ? 0 :
                     width <= r.dimensions.width.min ? 10 :
                     10 - (10 * (width - r.dimensions.width.min) /
                          (r.dimensions.width.max - r.dimensions.width.min));

  // Calculate score for height (lower is better)
  const heightScore = height >= r.dimensions.height.max ? 0 :
                      height <= r.dimensions.height.min ? 10 :
                      10 - (10 * (height - r.dimensions.height.min) /
                           (r.dimensions.height.max - r.dimensions.height.min));

  // Average the three scores - using linear scale since dimensions are physical measurements
  return (depthScore + widthScore + heightScore) / 3;
}

export const calculatePickedByRating = (pickedBy: string[]): number => {
  if (!pickedBy || !Array.isArray(pickedBy)) return 5;

  let rating = 5; // Start with baseline

  if (pickedBy.includes("me")) rating += 4;
  if (pickedBy.includes("trusted")) rating += 4;
  if (pickedBy.includes("public")) rating += 1;
  if (pickedBy.includes("websites")) rating += 1;

  return Math.min(10, rating); // Cap at 10
};

export const calculateInclineRating = (incline: number): number => {
  if (incline === undefined || incline === 0) return 0; // No incline is below average
  if (incline >= 3) return 9; // 3% or more incline is very good (9)
  if (incline > 3) return 10; // More than 3% is exceptional (10), but only slightly better

  // Linear scale between 0 and 3%
  return Math.round(9 * (incline / 3));
};

export const fakespotLetterToNumber = (letter: string): number => {
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

export const calculateCombinedRating = (row: Product): number => {
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
    const total = _.sum(details.distribution);
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