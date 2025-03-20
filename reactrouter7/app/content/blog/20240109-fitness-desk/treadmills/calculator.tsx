import type { Product } from './types';
import columnInfo from './columns';
import { getAttributeValue } from './formatters';

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