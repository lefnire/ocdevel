import type { Product } from './types';
import columnInfo from './columns';
import { getAttributeValue } from './formatters';
import React from 'react';

// Type for attribute calculation functions
type AttributeCalculator = (
  attrValue: any,
  attrRating: number,
  columnRating: number
) => number;

/**
 * Calculator configuration with specialized calculation functions for specific attributes
 * This makes it easy to edit calculations for specific columns
 */
const calculators: Record<string, AttributeCalculator> = {
  // Special handling for rating attribute (star ratings)
  rating: (attrValue, attrRating, columnRating) => {
    if (!attrValue) return 0;
    
    const ratingValue = attrValue as [[number, number], [number, number, number, number, number]];
    const [starRating, _] = ratingValue[0];
    
    // Adjust the rating based on the star rating (0-5 scale to 0-10 scale)
    const adjustedRating = (attrRating + (starRating * 2)) / 2;
    return adjustedRating * columnRating;
  },
  
  // Special handling for fakespot attribute (letter grades)
  fakespot: (attrValue, attrRating, columnRating) => {
    if (!attrValue) return 0;
    
    const fakespotValue = attrValue as [string, string];
    const [productScore, companyScore] = fakespotValue;
    
    // Convert letter grades to numeric values (A=4, B=3, C=2, D=1, F=0)
    const letterToNumber = (letter: string): number => {
      switch (letter) {
        case 'A': return 4;
        case 'B': return 3;
        case 'C': return 2;
        case 'D': return 1;
        case 'F': return 0;
        default: return 0;
      }
    };
    
    // Calculate combined score with product score weighted more heavily (60/40 split)
    const numericProductScore = letterToNumber(productScore);
    const numericCompanyScore = letterToNumber(companyScore);
    const combinedScore = (numericProductScore * 0.6) + (numericCompanyScore * 0.4);
    
    // Scale to 0-10 and blend with the attribute rating
    const scaledScore = (combinedScore / 4) * 10;
    const adjustedRating = (attrRating + scaledScore) / 2;
    
    return adjustedRating * columnRating;
  },
  
  // Add more specialized calculators here as needed
  // For example:
  // price: (attrValue, attrRating, columnRating) => { ... },
};

/**
 * Default calculator for attributes without specialized handling
 */
const defaultCalculator: AttributeCalculator = (attrValue, attrRating, columnRating) => {
  return attrRating * columnRating;
};

/**
 * Convert Fakespot letter grades to numeric values (A=10, B=8, C=6, D=3, F=1)
 * This is different from the original conversion to better reflect the scale described in the requirements
 */
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

/**
 * Calculate a distribution skew factor based on the star rating distribution
 * This penalizes distributions that are heavily skewed (e.g., lots of 5-stars and 1-stars)
 * @param distribution Array of [5-star, 4-star, 3-star, 2-star, 1-star] counts
 * @returns A modifier between 0.5 and 1.2 (0.5 = heavily penalized, 1.2 = bonus for good distribution)
 */
export const calculateDistributionFactor = (distribution: number[]): number => {
  if (!distribution || distribution.length !== 5) return 1.0;
  
  // Normalize the distribution to percentages
  const total = distribution.reduce((sum, count) => sum + count, 0);
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

/**
 * Calculate a weight factor based on the number of ratings
 * More ratings = more reliable score
 * @param count Number of ratings
 * @returns A factor between 0.6 and 1.0
 */
export const calculateRatingCountFactor = (count: number): number => {
  if (count <= 0) return 0.6;
  if (count >= 1000) return 1.0;
  
  // Logarithmic scale to give diminishing returns for higher counts
  // 1 review = 0.6, 10 reviews = 0.7, 100 reviews = 0.85, 1000+ reviews = 1.0
  return 0.6 + (0.4 * (Math.log10(count) / Math.log10(1000)));
};

/**
 * Calculate the combined rating score that incorporates star rating, distribution, and fakespot
 * @param product The product to calculate the score for
 * @returns The calculated combined rating on a 0-10 scale
 */
export const calculateCombinedRating = (product: Product): {
  score: number;
  details: {
    starRating: number;
    ratingCount: number;
    countFactor: number;
    distribution: number[];
    distributionFactor: number;
    fakespotProduct: string;
    fakespotCompany: string;
    fakespotScore: number;
  }
} => {
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
  if (product.rating && typeof product.rating === 'object' && 'value' in product.rating) {
    const ratingValue = product.rating.value as [[number, number], [number, number, number, number, number]];
    if (ratingValue && ratingValue.length === 2) {
      const [[starRating, ratingCount], distribution] = ratingValue;
      
      details.starRating = starRating;
      details.ratingCount = ratingCount;
      details.countFactor = calculateRatingCountFactor(ratingCount);
      
      if (distribution && distribution.length === 5) {
        details.distribution = distribution;
        details.distributionFactor = calculateDistributionFactor(distribution);
      }
      
      // Convert star rating (0-5) to a 0-10 scale
      starRatingBase = starRating * 2;
    }
  }
  
  // Apply the count factor to the star rating
  const weightedStarRating = starRatingBase * details.countFactor;
  
  // Apply the distribution factor
  const distributionAdjustedRating = weightedStarRating * details.distributionFactor;
  
  // Get the fakespot data
  let fakespotModifier = 0;
  if (product.fakespot && typeof product.fakespot === 'object' && 'value' in product.fakespot) {
    const fakespotValue = product.fakespot.value as [string, string];
    if (fakespotValue && fakespotValue.length === 2) {
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
      // This makes fakespot less impactful as mentioned in the requirements
      fakespotModifier = 0.7 + (combinedFakespotScore / 25); // 10 = 1.1, 1 = 0.74
    }
  }
  
  // Combine all factors for the final score
  const finalScore = distributionAdjustedRating * fakespotModifier;
  
  // Clamp the score between 0 and 10
  const clampedScore = Math.max(0, Math.min(10, finalScore));
  
  return {
    score: clampedScore,
    details
  };
};

/**
 * Generate a React element with the details of the combined rating calculation
 */
export const getCombinedRatingDetails = (product: Product): React.ReactElement => {
  const { details } = calculateCombinedRating(product);
  
  return (
    <div>
      <h5>Combined Rating Calculation</h5>
      <div>
        <strong>Star Rating:</strong> {details.starRating.toFixed(1)}/5 ({details.ratingCount} reviews)
        <div><small>Rating count factor: {details.countFactor.toFixed(2)} (more reviews = more reliable)</small></div>
      </div>
      <div className="mt-2">
        <strong>Rating Distribution:</strong>
        <div>5★: {details.distribution[0]}, 4★: {details.distribution[1]}, 3★: {details.distribution[2]}, 2★: {details.distribution[3]}, 1★: {details.distribution[4]}</div>
        <div><small>Distribution factor: {details.distributionFactor.toFixed(2)} (penalizes skewed distributions)</small></div>
      </div>
      <div className="mt-2">
        <strong>Fakespot Grades:</strong> Product: {details.fakespotProduct}, Company: {details.fakespotCompany}
        <div><small>Fakespot score: {details.fakespotScore.toFixed(1)}/10</small></div>
      </div>
    </div>
  );
};

/**
 * Calculate the final score for a product
 * @param product The product to calculate the score for
 * @returns The calculated score on a 0-10 scale
 */
export const calculateFinalScore = (product: Product): number => {
  let totalScore = 0;
  let totalWeight = 0;

  // Process each attribute that has a rating
  Object.entries(product).forEach(([key, attr]) => {
    // Skip non-attribute properties
    if (!attr || typeof attr !== 'object' || !('rating' in attr)) {
      return;
    }

    // Get the column info for this attribute
    const colInfo = columnInfo[key as keyof typeof columnInfo];
    if (!colInfo || typeof colInfo.rating !== 'number') {
      return;
    }

    // Get the attribute rating
    const attrRating = attr.rating as number;
    if (typeof attrRating !== 'number') {
      return;
    }

    // Get the attribute value
    const attrValue = 'value' in attr ? attr.value : undefined;
    
    // Get the column rating (weight)
    const columnRating = colInfo.rating;
    
    // Use specialized calculator if available, otherwise use default
    const calculator = calculators[key] || defaultCalculator;
    const weightedScore = calculator(attrValue, attrRating, columnRating);
    
    totalScore += weightedScore;
    totalWeight += columnRating;
  });

  // Normalize the score to a 0-10 scale
  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
};