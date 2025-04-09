import type {Product} from "../types";
import data from "../data";
import {getPrice} from "../utils";
import {NA} from '../data/utils'

function getRangeFromVals(vals_: Array<number | undefined>) {
  const vals = (vals_
    .filter(Boolean)
    .filter(val => val !== NA)
  ) as number[]
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const median = [...vals].sort((a, b) => a - b)[Math.floor(vals.length / 2)];
  return { min, max, median };
}
function getRangeFromFn(getterFn: (product: Product) => number | undefined) {
  return getRangeFromVals(Object.values(data).map(getterFn))
}

export const price = getRangeFromFn(item => getPrice(item))
export const weight = getRangeFromFn(item => item.weight?.value)
export const maxWeight = getRangeFromFn(item => item.maxWeight?.value)
export const maxSpeed = getRangeFromFn(item => item.maxSpeed?.value)
export const horsePower = getRangeFromFn(item => item.horsePower?.value)
export const decibels = getRangeFromFn(item => item.decibels?.value)
export const dimensions = (() => {
  const dimensions = {
    depth: [] as number[],
    width: [] as number[],
    height: [] as number[]
  };

  Object.values(data).forEach(item => {
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
export const rating = (() => {
  const starRatings: number[] = [];
  const ratingCounts: number[] = [];
  const fakespotGrades: string[] = [];

  Object.values(data).forEach(item => {
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