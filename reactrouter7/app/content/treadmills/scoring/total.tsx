import type {Computed} from '../computed'
import type {Product} from '../data/types'
export const columnWeights = {
  pickedBy: 15, // only one to break 10
  rating: 10,
  horsePower: 10,
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

export const total = (c: Computed): number => {
  let totalScore = 0;
  let totalWeight = 0;

  // Process each column that has a rating
  Object.entries(columnWeights).forEach(([key, weight]) => {
    debugger
    let score = c[key]
    if (!score) { return; }

    // Add to total score
    // toFixed() to add more stability, otherwise I get hydration errors against Score
    totalScore += score.toFixed(3) * weight;
    totalWeight += weight;
  });

  // Normalize the score to a 0-10 scale
  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
};