import type {ScoreFn} from "./utils";

export const columnWeights = {
  pickedBy: 15, // only one to break 10
  rating: 10,
  horsePower: 8,
  incline: 5,
  age: 5,
  shock: 5,
  price: 4,
  maxWeight: 4,
  decibels: 4,
  maxSpeed: 3,
  easyLube: 2,
  dimensions: 1,
  weight: 1,
  amazon: 1,
  links: 0,
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
  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
};