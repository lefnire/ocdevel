/*
 * Task: look for functions with a comment above with @minmax(attr). Then modify that function
 * like so:
 * 1. In these @minmax functions, you'll note that the code previously had hard-coded
 *    min/max ranges to use a linear scale to calculate the score. Use instead the
 *    new min/max for that attribute's xRange variable
 * 1. Important: I don't know which of linear-scale, log-scale, or other would be most
 *    appropriate for each function. So I want you to choose with your best judgement
 *    based on how the function comment describes that attribute.
 * 1. You can be fairly destructive if needed in terms of the current scaling logic. It
 *    was a placeholder meant to be replaced with this task.
 */

import data from "./data/index";

function getRangeFromVals(vals_: Array<number | undefined>) {
  const vals = vals_.filter(Boolean) as number[]
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const median = _.sortBy(vals)[Math.floor(vals.length / 2)];
  return { min, max, median };
}
function getRangeFromFn(getterFn: (product: Product) => number | undefined) {
  return getRangeFromVals(data.map(getterFn))
}

export const priceRange = getRangeFromFn(item => getPrice(item))
export const weightRange = getRangeFromFn(item => item.weight?.value)
export const maxWeightRange = getRangeFromFn(item => item.maxWeight?.value)
export const maxSpeedRange = getRangeFromFn(item => item.maxSpeed?.value)
export const horsePowerRange = getRangeFromFn(item => item.horsePower?.value)
export const decibelsRange = getRangeFromFn(item => item.decibels?.value)
export const dimensionsRange = (() => {
  const dimensions = {
    depth: [] as number[],
    width: [] as number[],
    height: [] as number[]
  };

  data.forEach(item => {
    const dims = item.dimensions?.value as [number, number, number] | undefined;
    if (dims) {
      dimensions.depth.push(dims[0]);
      dimensions.width.push(dims[1]);
      dimensions.height.push(dims[2]);
    }
  });

  return {
    depth: getRangeFromVals(dimensions.depth),
    width: getRangeFromVals(dimensions.width),
    height: getRangeFromVals(dimensions.height),
  };
})();

// Rating ranges for combined rating calculations
export const ratingRanges = (() => {
  const starRatings: number[] = [];
  const ratingCounts: number[] = [];
  const fakespotGrades: string[] = [];

  data.forEach(item => {
    const ratingValue = item.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;
    if (ratingValue?.length === 2) {
      const [[starRating, ratingCount]] = ratingValue;
      if (starRating) starRatings.push(starRating);
      if (ratingCount) ratingCounts.push(ratingCount);
    }

    const fakespotValue = item.fakespot?.value as [string, string] | undefined;
    if (fakespotValue?.[0]) {
      fakespotGrades.push(fakespotValue[0]);
    }
  });

  return {
    starRatings: getRangeFromVals(starRatings),
    ratingCounts: {
      ...getRangeFromVals(ratingCounts),
      log: {
        min: Math.log10(Math.max(1, Math.min(...ratingCounts))),
        max: Math.log10(Math.max(...ratingCounts))
      }
    }
  };
})();

import dayjs from 'dayjs'
import _ from 'lodash'
import type {Product} from "~/routes/walk/treadmills/data/types";
import {getPrice} from "~/routes/walk/treadmills/data/utils";

// @minmax(price). The price of this treadmill, lower is better
export const calculatePriceRating = (price: number): number => {
  // Using log scale since price typically has exponential perceived value
  // (difference between $100-$200 feels bigger than $2000-$2100)
  if (price <= priceRange.min) return 10;
  if (price >= priceRange.max) return 0;
  
  // Log scale transformation
  const logMin = Math.log(priceRange.min);
  const logMax = Math.log(priceRange.max);
  const logPrice = Math.log(price);
  
  // Invert the scale since lower price is better
  return 10 * (1 - ((logPrice - logMin) / (logMax - logMin)));
};

// @minmax(weight). The weight of this treadmill, lower is better
export const calculateWeightRating = (weight: number): number => {
  // Using linear scale since weight perception is fairly linear
  if (weight <= weightRange.min) return 10;
  if (weight >= weightRange.max) return 0;

  // Linear scale between min and max weight
  return 10 - (10 * (weight - weightRange.min) / (weightRange.max - weightRange.min));
};

// @minmax(maxWeight). The max weight capacity (the human) this treadmill
// can support, higher=better
export const calculateMaxWeightRating = (maxWeight: number): number => {
  // Using linear scale since weight capacity perception is fairly linear
  if (maxWeight <= maxWeightRange.min) return 0;
  if (maxWeight >= maxWeightRange.max) return 10;

  // Linear scale between min and max weight capacity
  return 10 * (maxWeight - maxWeightRange.min) / (maxWeightRange.max - maxWeightRange.min);
};

// @minmax(maxSpeed). The max speed this treadmill can go to, higher=better
export const calculateMaxSpeedRating = (maxSpeed: number): number => {
  // Using linear scale since speed perception is fairly linear
  if (maxSpeed <= maxSpeedRange.min) return 0;
  if (maxSpeed >= maxSpeedRange.max) return 10;

  // Linear scale between min and max speed
  return 10 * (maxSpeed - maxSpeedRange.min) / (maxSpeedRange.max - maxSpeedRange.min);
};

// @minmax(horsePower). The horse power of this treadmill, higher=better
export const calculateHorsePowerRating = (horsePower: number): number => {
  // Using a logarithmic scale since perceived power often follows a logarithmic curve
  // (difference between 1HP and 2HP feels bigger than 4HP and 5HP)
  if (horsePower <= horsePowerRange.min) return 0;
  if (horsePower >= horsePowerRange.max) return 10;
  
  // Log scale transformation
  const logMin = Math.log(horsePowerRange.min);
  const logMax = Math.log(horsePowerRange.max);
  const logPower = Math.log(horsePower);
  
  return 10 * (logPower - logMin) / (logMax - logMin);
};

// @minmax(released). When was this treadmill released (how old is it), lower=better.
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

// @minmax(decibels). The loudness of this treadmill, lower=better.
export const calculateDecibelsRating = (decibels: number | undefined): number => {
  if (decibels === undefined) return 5; // Default rating if no data

  // Using linear scale on the decibel values since decibels are already logarithmic
  // (the decibel scale itself accounts for how humans perceive sound intensity)
  if (decibels <= decibelsRange.min) return 10;
  if (decibels >= decibelsRange.max) return 0;

  // Invert the scale since lower decibels is better
  return 10 * (1 - ((decibels - decibelsRange.min) / (decibelsRange.max - decibelsRange.min)));
}

/*
@minmax(dimensions). The size of this treadill, D"xW"xH". Lower is better for
each individual dimension, then they're combined.
 */
export const calculateDimensionsRating = (dimensions: undefined | [number, number, number]): number => {
  if (!dimensions) return 5;

  const [depth, width, height] = dimensions;

  // Calculate score for depth (lower is better)
  const depthScore = depth >= dimensionsRange.depth.max ? 0 :
                     depth <= dimensionsRange.depth.min ? 10 :
                     10 - (10 * (depth - dimensionsRange.depth.min) /
                          (dimensionsRange.depth.max - dimensionsRange.depth.min));

  // Calculate score for width (lower is better)
  const widthScore = width >= dimensionsRange.width.max ? 0 :
                     width <= dimensionsRange.width.min ? 10 :
                     10 - (10 * (width - dimensionsRange.width.min) /
                          (dimensionsRange.width.max - dimensionsRange.width.min));

  // Calculate score for height (lower is better)
  const heightScore = height >= dimensionsRange.height.max ? 0 :
                      height <= dimensionsRange.height.min ? 10 :
                      10 - (10 * (height - dimensionsRange.height.min) /
                           (dimensionsRange.height.max - dimensionsRange.height.min));

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
    case 'D': return 3;
    case 'F': return 1;
    default: return 8; // Default to "B" if not present
  }
};

/*
@minmax(). This requires special handling. Individual item in this function
will use a min-max scale (again, decide if log or linear with your best judgement).
These are:
- row.rating[0][0] - the actual star rating of the product, on Amazon. Consider 4.1 the median (5 out of 10)
- row.rating[0][1] - the number of ratings globally
- row.fakespot?.value - the product's fakespot score (A-F)
- row.brand.fakespot - the brand's fakespot score
 */
export const calculateCombinedRating = (row: Product): number => {
  // Default values
  const details = {
    starRating: 0,
    ratingCount: 0,
    countFactor: 0.6,
    distribution: [0, 0, 0, 0, 0],
    distributionFactor: 1.0,
    fakespotProduct: 'B', // Default to B if not present
    fakespotCompany: 'B', // Default to B if not present
    fakespotScore: 0
  };

  // Get the star rating data
  let starRatingBase = 0;
  const ratingValue = row.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;

  if (ratingValue?.length === 2) {
    const [[starRating, ratingCount], distribution] = ratingValue;

    details.starRating = starRating;
    details.ratingCount = ratingCount;
    
    // Calculate rating count factor using logarithmic scale from the ratingRanges
    if (ratingCount > 0) {
      // Using log scale for rating counts since perception of count differences follows logarithmic pattern
      const logCount = Math.log10(Math.max(1, ratingCount));
      const logMin = ratingRanges.ratingCounts.log.min;
      const logMax = ratingRanges.ratingCounts.log.max;
      
      // Scale from 0.6 to 1.0 based on log position
      details.countFactor = 0.6 + (0.4 * (logCount - logMin) / (logMax - logMin));
    }

    if (distribution?.length === 5) {
      details.distribution = distribution;
      details.distributionFactor = calculateDistributionFactor(distribution);
    }

    // Star rating normalization using min-max from ratingRanges
    // Using linear scale for star ratings since they're already on a standardized scale
    if (starRating <= ratingRanges.starRatings.min) {
      starRatingBase = 0;
    } else if (starRating >= ratingRanges.starRatings.max) {
      starRatingBase = 10;
    } else {
      starRatingBase = 10 * (starRating - ratingRanges.starRatings.min) /
                      (ratingRanges.starRatings.max - ratingRanges.starRatings.min);
    }
  }

  // Apply the count factor to the star rating
  const weightedStarRating = starRatingBase * details.countFactor;

  // Apply the distribution factor
  const distributionAdjustedRating = weightedStarRating * details.distributionFactor;

  // Get the fakespot data
  let fakespotModifier = 0;
  const fakespotValue = row.fakespot?.value as [string, string] | undefined;

  if (fakespotValue?.length === 2) {
    const [productGrade, companyGrade] = fakespotValue;

    details.fakespotProduct = productGrade || 'B';
    details.fakespotCompany = companyGrade || 'B';

    // Convert grades to numeric values (A=10, B=8, C=6, D=3, F=1)
    const productScore = fakespotLetterToNumber(productGrade);
    const companyScore = fakespotLetterToNumber(companyGrade);

    // Weight company score more heavily (70/30 split)
    const combinedFakespotScore = (productScore * 0.3) + (companyScore * 0.7);
    details.fakespotScore = combinedFakespotScore;

    // Scale fakespot score to be a modifier (0.7 to 1.1)
    fakespotModifier = 0.7 + (combinedFakespotScore / 25); // 10 = 1.1, 1 = 0.74
  }

  // Combine all factors for the final score
  const finalScore = distributionAdjustedRating * fakespotModifier;

  // Clamp the score between 0 and 10
  return Math.max(0, Math.min(10, finalScore));
};

export const calculateDistributionFactor = (distribution: number[]): number => {
  if (!distribution || distribution.length !== 5) return 1.0;

  // Normalize the distribution to percentages
  const total = _.sum(distribution);
  if (total === 0) return 1.0;

  const percentages = distribution.map(count => (count / total) * 100);
  const [five, four, three, two, one] = percentages;

  // Calculate the skew - high 5-star and high 1-star is a bad sign
  // Ideal distribution is a stair-step pattern (5 > 4 > 3 > 2 > 1)

  // Check for C-shape distribution (high 5s and high 1s)
  const cShapeFactor = (five * one) / 100; // Higher value means more C-shaped

  // Check for stair-step pattern
  const isStairStep = five >= four && four >= three && three >= two && two >= one;
  const stairStepBonus = isStairStep ? 0.2 : 0;

  // Calculate the final factor (0.5 to 1.2)
  // Higher cShapeFactor means more penalty
  const factor = 1.0 - (cShapeFactor * 0.5) + stairStepBonus;

  // Clamp the factor between 0.5 and 1.2
  return Math.max(0.5, Math.min(1.2, factor));
};

export const calculateRatingCountFactor = (count: number): number => {
  if (count <= 0) return 0.6;
  if (count >= 1000) return 1.0;

  // Logarithmic scale to give diminishing returns for higher counts
  // 1 review = 0.6, 10 reviews = 0.7, 100 reviews = 0.85, 1000+ reviews = 1.0
  return 0.6 + (0.4 * (Math.log10(count) / Math.log10(1000)));
};