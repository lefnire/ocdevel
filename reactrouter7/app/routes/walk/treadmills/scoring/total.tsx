import type {ScoreFn} from "./utils";

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
  countries: 0,
  app: 0,
}
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

  // Apply any bump from product or brand
  const bump = row.bump ?? row.brand.bump ?? 0;

  return normalizedScore + bump;
};