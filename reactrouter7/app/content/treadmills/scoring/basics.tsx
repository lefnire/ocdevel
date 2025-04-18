import dayjs from 'dayjs'
import {getCountryCodes, getPrice} from "../utils";
import * as r from './value-ranges'
import type {ScoreFn} from './utils'
import type {PickedBy} from "~/content/treadmills/types";
import { NA } from '../data/utils'; // <-- Import NA

const scorePickedBy = (pickedBy: undefined | PickedBy) => {
  pickedBy = pickedBy || {}
  const me = (pickedBy?.me ?? 0) * 0.40
  const trusted = (pickedBy?.trusted ?? []).reduce((sum, item) => sum + (item?.value || 0), 0) * .40
  const affiliate = (pickedBy?.affiliate ?? []).reduce((sum, item) => sum + (item?.value || 0), 0) * .1
  const websites = (pickedBy?.websites ?? []).reduce((sum, item) => sum + (item?.value || 0), 0) * .1
  return me + trusted + websites + affiliate
}
export const brand: ScoreFn = (p) => {
 const score = scorePickedBy(p.brand.pickedBy)
  return score > 10 ? 10 : score
}

export const price: ScoreFn = (p) => {
  if (p.price?.rating) { return p.price.rating }
  const val = getPrice(p);
  if (val === undefined) {
    // no easy guess
    return 5;
  }
  // Using log scale since price typically has exponential perceived value
  // (difference between $100-$200 feels bigger than $2000-$2100)
  if (val <= r.price.min) return 10;
  if (val >= r.price.max) return 0;
  
  // Log scale transformation
  const logMin = Math.log(r.price.min);
  const logMax = Math.log(r.price.max);
  const logPrice = Math.log(val);
  
  // Invert the scale since lower price is better
  return 10 * (1 - ((logPrice - logMin) / (logMax - logMin)));
};

export const links: ScoreFn = (p) => {
  return getCountryCodes(p).length
}

export const weight: ScoreFn = (p) => {
  if (p.weight?.rating) { return p.weight.rating }
  const val = p.weight.value;
  if (val === NA) return 10; // N/A weight implies it's not a factor, treat as perfect? Or maybe 0? Let's assume 10 for now.
  if (val === undefined) {
    // no easy guess
    return 5;
  }
  // Using linear scale since weight perception is fairly linear
  if (val <= r.weight.min) return 10;
  if (val >= r.weight.max) return 0;

  // Linear scale between min and max weight
  return 10 - (10 * (val - r.weight.min) / (r.weight.max - r.weight.min));
};

export const maxWeight: ScoreFn = (p) => {
  if (p.maxWeight?.rating) { return p.maxWeight.rating }

  const val = p.maxWeight.value;
  if (val === NA) return 10; // N/A maxWeight implies it's not a factor
  if (val === undefined) {
    // typically 265
    return 5;
  }
  // Using linear scale since weight capacity perception is fairly linear
  if (val <= r.maxWeight.min) return 0;
  if (val >= r.maxWeight.max) return 10;

  // Linear scale between min and max weight capacity
  return 10 * (val - r.maxWeight.min) / (r.maxWeight.max - r.maxWeight.min);
};

export const maxSpeed: ScoreFn = (p) => {
  if (p.maxSpeed?.rating) { return p.maxSpeed.rating }

  // Commonly 4.0, but often the unlisted / hidden ones turn out to be 3.8
  const val = p.maxSpeed.value;
  if (val === NA) return 10; // Explicitly handle NA as per walkolution2.tsx intent
  if (val === undefined) {
    // if not advertised, typically lower than median (eg 3.8)
    return 4; // Keep existing fallback for undefined
  }
  // Using linear scale since speed perception is fairly linear
  if (val <= r.maxSpeed.min) return 0;
  if (val >= r.maxSpeed.max) return 10;

  // Linear scale between min and max speed
  return 10 * (val - r.maxSpeed.min) / (r.maxSpeed.max - r.maxSpeed.min);
};

export const horsePower: ScoreFn = (p) => {
  if (p.horsePower?.rating) { return p.horsePower.rating }

  const val = p.horsePower.value;
  if (val === NA) return 10; // Explicitly handle NA as per walkolution2.tsx intent
  if (val === undefined) {
    // if not advertised, usually lower than median (eg 2.25).
    return 4; // Keep existing fallback for undefined
  }
  // Using a logarithmic scale since perceived power often follows a logarithmic curve
  // (difference between 1HP and 2HP feels bigger than 4HP and 5HP)
  if (val <= r.horsePower.min) return 0;
  if (val >= r.horsePower.max) return 10;
  
  // Log scale transformation
  const logMin = Math.log(r.horsePower.min);
  const logMax = Math.log(r.horsePower.max);
  const logPower = Math.log(val);
  
  return 10 * (logPower - logMin) / (logMax - logMin);
};

export const age: ScoreFn = (p) => {
  if (p.age?.rating) { return p.age.rating }

  const val = p.age.value;
  if (val === undefined) {
    // no easy guess
    return 5;
  }

  // Try to parse the age as a date using dayjs
  let releaseDate = dayjs(val);

  // Check if it's a year only (e.g., "2020")
  if (!releaseDate.isValid() && /^\d{4}$/.test(val)) {
    releaseDate = dayjs(`${val}-01-01`); // January 1st of that year
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

export const decibels: ScoreFn = (p) => {
  if (p.decibels?.rating) { return p.decibels.rating }
  const val = p.decibels.value;
  if (val === NA) return 10; // N/A decibels implies silent (manual)
  if (val === undefined) {
    // Typically 45-50
    return 5;
  }

  // Using linear scale on the decibel values since decibels are already logarithmic
  // (the decibel scale itself accounts for how humans perceive sound intensity)
  if (val <= r.decibels.min) return 10;
  if (val >= r.decibels.max) return 0;

  // Invert the scale since lower decibels is better
  return 10 * (1 - ((val - r.decibels.min) / (r.decibels.max - r.decibels.min)));
}

export const dimensions: ScoreFn = (p) => {
  if (p.dimensions?.rating) { return p.dimensions.rating }
  const val = p.dimensions.value;
  // Removed NA check here, as dimensions value should be an array or undefined
  if (val?.length !== 3) { return 5; }

  const [depth, width, height] = val;

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

export const pickedBy: ScoreFn = (p) => {
  const baseline = 3; // so we're enot showing a bunch of 0s
  const me = (p.pickedBy?.me ?? p.brand.pickedBy?.me ?? 0)
  const trusted = (p.pickedBy?.trusted ?? p.brand.pickedBy?.trusted ?? [])
  const websites = (p.pickedBy?.websites ?? p.brand.pickedBy?.websites ?? [])
  const affiliate = (p.pickedBy?.affiliate ?? p.brand.pickedBy?.affiliate ?? [])
  let score = baseline + scorePickedBy({me, trusted, websites, affiliate})
  return score > 10 ? 10 : score;
  // const pProduct = scorePickedBy(p.pickedBy)
  // const pBrand = scorePickedBy(p.brand.pickedBy)
  // return (pProduct * .5)+ (pBrand * .5)
};

export const incline: ScoreFn = (p) => {
  if (p.incline?.rating) { return p.incline.rating }
  const val = p.incline.value;
  if (val === NA) return 10; // Explicitly handle NA as per walkolution2.tsx intent (manual implies variable incline)
  if (!val) { return 0; }
  if (val >= 3) return 9; // 3% or more incline is very good (9)
  if (val > 3) return 10; // More than 3% is exceptional (10), but only slightly better

  // Linear scale between 0 and 3%
  return Math.round(9 * (val / 3));
};

export const shock: ScoreFn = (p) => {
  if (p.shock?.rating) { return p.shock.rating }
  const val = p.shock.value
  if (val) { return 0; }
  return 5;
}


export const app: ScoreFn = (p) => {
  if (p.app?.rating) { return p.app.rating }
  const val = p.app.value
  if (!val) { return 0; }
  return 10;
}

export const easyLube: ScoreFn = (p) => {
  if (p.easyLube?.rating) { return p.easyLube.rating }
  const val = p.easyLube?.value;
  if (val === NA) return 10; // N/A implies no lube needed, which is perfect.
  return val ?? 5; // Fallback for boolean or undefined
}
