import type {ScoreFn} from "./utils";
import type {Bump} from '../data/types'

export const columnWeights = {
  rating: 10,
  price: 4,
  maxWeight: 5,
  maxSpeed: 3,
  incline: 6,
  sturdy: 10,
  horsePower: 9,
  age: 6,
  pickedBy: 8,
  shock: 5,
  decibels: 4,
  dimensions: 2,
  weight: 1,
  easyLube: 2,
  amazon: 1,
  links: 0,
  app: 0,
}

// Helper function to calculate bump value from a Bump object
const calculateBumpValue = (bumpObj?: Bump): number => {
  return (
    (bumpObj?.up?.length ?? 0)
    - (bumpObj?.down?.length ?? 0)
    + (bumpObj?.extra ?? 0)
  )
};

export const total: ScoreFn = (row) => {
  let totalScore = 0;
  let totalWeight = 0;

  // Process each column that has a rating
  Object.entries(columnWeights).forEach(([key, weight]) => {
    const score = row[key]?.score
    if (!score) { return; }

    // Add to total score
    totalScore += score * weight;
    totalWeight += weight;
  });

  // Normalize the score to a 0-10 scale
  const normalizedScore = totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;

  // Calculate bumps from product and brand
  const productBump = calculateBumpValue(row.bump);
  const brandBump = calculateBumpValue(row.brand.bump);
  
  // Apply combined bump value
  const totalBump = productBump + brandBump;

  return normalizedScore + totalBump;
};