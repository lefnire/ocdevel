import React from "react";
import type { Product } from "./types";
import brands from './brands';

// Helper functions moved from formatters.tsx
// Helper functions moved from formatters.tsx
const getAttributeValue = <T extends any>(attr: any): T | undefined => {
  if (attr && typeof attr === 'object' && 'value' in attr) {
    return attr.value as T;
  }
  return undefined;
};

// Default function to get rating from an attribute or return a default value
const getAttributeRating = (attr: any, defaultRating: number = 5): number => {
  return (attr?.rating as number) ?? defaultRating;
};

// Helper functions for specific rating calculations
const calculatePriceRating = (price: number): number => {
  if (price <= 100) return 10; // $100 or less is good (10)
  if (price >= 3000) return 0;  // $3000 or more is terrible (0)
  if (price >= 1000) return 4;  // $1000 or more is bad (4)
  
  // Linear scale between price points
  if (price > 100 && price < 1000) {
    // Scale from 10 to 4 as price goes from 100 to 1000
    return 10 - (6 * (price - 100) / 900);
  } else {
    // Scale from 4 to 0 as price goes from 1000 to 3000
    return 4 - (4 * (price - 1000) / 2000);
  }
};

const calculateWeightRating = (weight: number): number => {
  if (weight <= 40) return 10; // 40lbs or less is good (10)
  if (weight >= 100) return 0; // 100lbs or more is bad (0)
  
  // Linear scale between 40 and 100 lbs
  return 10 - (10 * (weight - 40) / 60);
};

const calculateMaxWeightRating = (maxWeight: number): number => {
  if (maxWeight < 265) return Math.max(0, 6 - (265 - maxWeight) / 20); // Below baseline, decrease rating
  if (maxWeight >= 300) return Math.min(10, 9 + (maxWeight - 300) / 50); // Above 300 is really good (9+)
  
  // Linear scale between 265 and 300
  return 6 + (3 * (maxWeight - 265) / 35);
};

const calculateMaxSpeedRating = (maxSpeed: number): number => {
  const baseline = 4;
  if (maxSpeed < baseline) return Math.max(0, 5 - (baseline - maxSpeed) * 2); // Below baseline
  if (maxSpeed > baseline) return Math.min(10, 5 + (maxSpeed - baseline) * 1.5); // Above baseline
  
  return 5; // Baseline rating
};

const calculateHorsePowerRating = (horsePower: number): number => {
  const baseline = 2.5;
  if (horsePower < baseline) return Math.max(0, 5 - (baseline - horsePower) * 3); // Below baseline
  if (horsePower > baseline) return Math.min(10, 5 + (horsePower - baseline) * 2); // Above baseline
  
  return 5; // Baseline rating
};

const calculatePickedByRating = (pickedBy: string[]): number => {
  if (!pickedBy || !Array.isArray(pickedBy)) return 5;
  
  let rating = 5; // Start with baseline
  
  if (pickedBy.includes("me")) rating += 4;
  if (pickedBy.includes("trusted")) rating += 4;
  if (pickedBy.includes("public")) rating += 1;
  if (pickedBy.includes("websites")) rating += 1;
  
  return Math.min(10, rating); // Cap at 10
};

const calculateInclineRating = (hasIncline: boolean): number => {
  return hasIncline ? 9 : 3; // 3% incline is important (9), no incline is below average
};


// Helper functions moved from calculator.tsx
const fakespotLetterToNumber = (letter: string): number => {
  switch (letter) {
    case 'A': return 10;
    case 'B': return 8;
    case 'C': return 6;
    case 'D': return 3;
    case 'F': return 1;
    default: return 8; // Default to "B" if not present
  }
};

// Function to calculate the combined rating (moved from combinedRating column)
const calculateCombinedRating = (row: Product): number => {
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
  if (row.rating && typeof row.rating === 'object' && 'value' in row.rating) {
    const ratingValue = row.rating.value as [[number, number], [number, number, number, number, number]];
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
  if (row.fakespot && typeof row.fakespot === 'object' && 'value' in row.fakespot) {
    const fakespotValue = row.fakespot.value as [string, string];
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
  return Math.max(0, Math.min(10, finalScore));
};

const calculateDistributionFactor = (distribution: number[]): number => {
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

const calculateRatingCountFactor = (count: number): number => {
  if (count <= 0) return 0.6;
  if (count >= 1000) return 1.0;
  
  // Logarithmic scale to give diminishing returns for higher counts
  // 1 review = 0.6, 10 reviews = 0.7, 100 reviews = 0.85, 1000+ reviews = 1.0
  return 0.6 + (0.4 * (Math.log10(count) / Math.log10(1000)));
};

// Column type definition with added properties
interface ColumnDefinition {
  key: string;
  label: string;
  dtype: string;
  description?: string;
  rating: number;
  notes?: () => React.ReactElement;
  showInTable?: boolean; // Flag to determine if column should be shown in table
  calculate?: (row: Product) => any; // Function to calculate the value
  render?: (row: Product) => string | React.ReactElement; // Function to render the value
  getStyle?: (row: Product) => React.CSSProperties; // Function to get cell style
  getSortValue?: (row: Product) => any; // Function to get value for sorting
  getFilterValue?: (row: Product) => any; // Function to get value for filtering
  getRating?: (row: Product) => number; // Function to get the rating for this attribute
  filterOptions?: {
    min?: boolean; // Whether to show min filter for numeric columns
    max?: boolean; // Whether to show max filter for numeric columns
  };
}

// Define the column info array
const columnsArray: ColumnDefinition[] = [
  {
    key: "rank",
    label: "Rank",
    dtype: "number",
    rating: 10,
    showInTable: true,
    description: "Calculation (?)",
    filterOptions: { min: true, max: false },
    notes: () => (
      <div>
        This score is calculated based on each product's attribute ratings and the importance of each attribute.
        Higher scores indicate better overall performance. The calculation takes into account:
        <ul>
          <li>Each attribute's rating (out of 10)</li>
          <li>The importance weight of each attribute (defined in columns.tsx)</li>
          <li>Special handling for complex attributes like star ratings and Fakespot grades</li>
        </ul>
      </div>
    ),
    calculate: (row: Product): number => {
      // This will be defined after all columns are created
      // It needs to reference the other columns' calculate functions
      return 0; // Placeholder, will be updated later
    },
    render: (row: Product): string => {
      const score = columnsArray.find(col => col.key === "rank")?.calculate?.(row) || 0;
      return score.toFixed(1);
    },
    getStyle: (row: Product): React.CSSProperties => {
      return { fontWeight: 'bold' };
    },
    getRating: (row: Product): number => {
      // Rank is a calculated value, so it doesn't have a direct rating
      return 10; // Always return the maximum rating for rank
    }
  },
  {
    key: "model",
    label: "Model",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.model,
    render: (row: Product): string => row.model,
    getRating: (row: Product): number => {
      // Model doesn't have a rating
      return 0;
    }
  },
  {
    key: "make",
    label: "Brand",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.make,
    render: (row: Product): string => row.make,
    // Note: The actual rendering with brand info will be handled in route.tsx
    getRating: (row: Product): number => {
      return brands[row.make]?.rating ?? 5;
    }
  },
  {
    key: "rating",
    label: "Star Rating",
    // This is stored as [[number,number],[number,number,number,number,number]].
    // These values are: `[
    // [ average rating, number of reviews ]
    // [ 5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // ]`. In the cell, only the average rating should appear. But the popover
    // should show the breakdown. Make it simple for now, we'll make it fancy later.
    dtype: "custom",
    description: "Calculation (?)",
    filterOptions: {min: true, max: false},
    rating: 9,
    showInTable: true,
    notes: () => (
      <div>
        <p>I have a firm stance on ratings. Anything less than 4.1 is no (all products, not just treadmills). Most important though is to observe the rating <em>distribution</em>. A healthy graph looks like a stair case, most being 5 least being 1 (or maybe just a taller than 2). What scares me is a C shape: mostly 5s, and second-mostly 1s. Smoking gun of either (1) fake ratings; (2) quality control (ticking time-bomb). I'll take significantly less 5s in exchange for a healthy curve.</p>
        <p>This rating takes into account:</p>
        <ul>
          <li>Star rating (weighted by number of reviews - more reviews = more reliable)</li>
          <li>Rating distribution (penalizes skewed distributions with high 5-star and high 1-star counts)</li>
          <li>Fakespot grades for both product and company (company grade weighted more heavily)</li>
        </ul>
        <p>The calculation aims to provide a more accurate representation of product quality by accounting for potential fake reviews and quality control issues.</p>
      </div>
    ),
    calculate: (row: Product): [[number, number], [number, number, number, number, number]] | undefined => {
      return getAttributeValue<[[number, number], [number, number, number, number, number]]>(row.rating);
    },
    render: (row: Product): string => {
      const rating = getAttributeValue<[[number, number], [number, number, number, number, number]]>(row.rating);
      if (!rating) return '';
      const [[avg, count], distribution] = rating;
      return `${avg.toFixed(1)}`;
    },
    getSortValue: (row: Product): number => {
      return calculateCombinedRating(row);
    },
    getRating: (row: Product): number => {
      // Use the calculated combined rating value as the rating
      return calculateCombinedRating(row);
    }
  },
  {
    key: "fakespot",
    label: "Fakespot",
    // Stored as [string, string] which is [product rating, company rating], where
    // ratings are A-F. Show in the cell both values, with an icon indicating product
    // or company
    dtype: "custom",
    description: "Product score, company score.",
    rating: 5,
    showInTable: false, // Hide this since we're using combinedRating instead
    notes: () => <div>If the product has a low score, I'll give leeway if the company has a high score. Fakespot is great for eye-balling scam products. But.. they tend to have a lot of false positives. I use their score to adjust the ratings; but not as heavily as they do.</div>,
    calculate: (row: Product): [string, string] | undefined => {
      return getAttributeValue<[string, string]>(row.fakespot);
    },
    getRating: (row: Product): number => row.fakespot?.rating ?? 5,
    render: (row: Product): string => {
      const fakespot = getAttributeValue<[string, string]>(row.fakespot);
      if (!fakespot) return '';
      const [product, company] = fakespot;
      return `P: ${product}, C: ${company}`;
    }
  },
  {
    key: "price",
    label: "Price",
    dtype: "number",
    description: "Sorting (?)",
    rating: 4,
    showInTable: true,
    filterOptions: { min: false, max: true },
    notes: () => <div>These filters filter by price; but sorting this column sorts by my gut-check on <em>value</em> (cost to quality).</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.price);
    },
    render: (row: Product): string => {
      const price = getAttributeValue<number>(row.price);
      if (price === undefined) return '';
      return `$${price}`;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on price
      if (row.price?.rating !== undefined) {
        return row.price.rating;
      }
      
      const price = getAttributeValue<number>(row.price);
      return price !== undefined ? calculatePriceRating(price) : 5;
    }
  },
  {
    key: "maxWeight",
    label: "Max Capacity",
    dtype: "number",
    rating: 5,
    showInTable: true,
    filterOptions: { min: true, max: false },
    // description: "Pounds",
    // notes: () => <div>Most mills these days start at 265lbs. This wasn't the case a couple years ago, which was a problem for many. Use the filters if you're heavier than 265.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.maxWeight);
    },
    render: (row: Product): string => {
      const maxWeight = getAttributeValue<number>(row.maxWeight);
      if (maxWeight === undefined) return '';
      return `${maxWeight} lbs`;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on maxWeight
      if (row.maxWeight?.rating !== undefined) {
        return row.maxWeight.rating;
      }
      
      const maxWeight = getAttributeValue<number>(row.maxWeight);
      return maxWeight !== undefined ? calculateMaxWeightRating(maxWeight) : 5;
    }
  },
  {
    key: "maxSpeed",
    label: "Max Speed",
    dtype: "number",
    description: "Rails (?)",
    rating: 3,
    showInTable: true,
    filterOptions: { min: true, max: false },
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.maxSpeed);
    },
    render: (row: Product): string => {
      const maxSpeed = getAttributeValue<number>(row.maxSpeed);
      if (maxSpeed === undefined) return '';
      return `${maxSpeed} mph`;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on maxSpeed
      if (row.maxSpeed?.rating !== undefined) {
        return row.maxSpeed.rating;
      }
      
      const maxSpeed = getAttributeValue<number>(row.maxSpeed);
      return maxSpeed !== undefined ? calculateMaxSpeedRating(maxSpeed) : 5;
    }
  },
  {
    key: "incline",
    label: "Incline",
    dtype: "boolean",
    description: "Favor 3% (?)",
    rating: 6,
    showInTable: true,
    notes: () => <div>Sports medicine <a href="https://ocdevel.com/blog/20240228-walking-desks-incline">recommends a 3% incline</a>. Ultra-budget models lack incline. For Urevo models, the number on the remote / console means % (it's not obvious); so setting it to 3 means 3%. Some models support more than 3, which burns significantly more calories (CyberPad goes to 14, which is 50% more calories). If you're in a rush to lose weight, go for it; but don't make it a life-style, slow-and-steady at 3% wins the race. I've tested this over the years. Both flat, and greater than 5%, hurt me knees with time - remedied slowly after returning to 3%.</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.incline);
    },
    render: (row: Product): string => {
      const incline = getAttributeValue<boolean>(row.incline);
      return incline ? '✓' : '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on incline
      if (row.incline?.rating !== undefined) {
        return row.incline.rating;
      }
      
      const hasIncline = getAttributeValue<boolean>(row.incline);
      return hasIncline !== undefined ? calculateInclineRating(hasIncline) : 5;
    }
  },
  {
    key: "sturdy",
    label: "Sturdy",
    dtype: "boolean",
    rating: 9,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.sturdy);
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise return 5
      return getAttributeRating(row.sturdy, 5);
    },
    render: (row: Product): string => {
      const sturdy = getAttributeValue<boolean>(row.sturdy);
      return sturdy ? '✓' : '';
    },
  },
  {
    key: "horsePower",
    label: "Horse Power",
    dtype: "number",
    rating: 6,
    showInTable: true,
    filterOptions: { min: true, max: false },
    notes: () => <div>While not "proof" of a motor's quality, HP less than 2.5 is typically a brow-raiser on the motor's longevity. HP doesn't just indicate speed, but strength. Target 2.5+.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.horsePower);
    },
    render: (row: Product): string => {
      const horsePower = getAttributeValue<number>(row.horsePower);
      if (horsePower === undefined) return '';
      return `${horsePower}`;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on horsePower
      if (row.horsePower?.rating !== undefined) {
        return row.horsePower.rating;
      }
      
      const horsePower = getAttributeValue<number>(row.horsePower);
      return horsePower !== undefined ? calculateHorsePowerRating(horsePower) : 5;
    }
  },
  {
    key: "age",
    label: "Released",
    // Generally an ISO string that can be converted into a number (so we can
    // sort / filter), but sometimes it's a textual description. So for sort / filter
    // purposes, it should use dates if possible, and handle non-date strings
    // appropriately
    dtype: "custom",
    rating: 6,
    showInTable: true,
    notes: () => <div>Age is a gut check on goodness. Newer mills, especially by a brand which iterates frequently (like Urevo), mean hardware lessons learned. I've validated this gut-check through testing.</div>,
    calculate: (row: Product): string | undefined => {
      return getAttributeValue<string>(row.age);
    },
    render: (row: Product): string => {
      const age = getAttributeValue<string>(row.age);
      if (!age) return '';
      return age;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise return 5
      return getAttributeRating(row.age, 5);
    }
  },
  {
    key: "pickedBy",
    label: "Favored By",
    dtype: "string",
    rating: 8,
    showInTable: true,
    notes: () => <div>Call me cocky, but this is my most important flag. I study the <em>hell</em> out of budget mills. I'm glued to reviews, I test them, I see what DIY fixer-type are saying in Discord. So between my picks and the picks of those I trust on the internet, I won't lead you astray. Next would be public picks; popular either by reviews or in forums (Reddit). Worst, IMO, are popular review site picks. CNET, Engadget, Wired - they're not always wrong, but boy do they get treadmills wrong. I think they just sort by popular on Amazon. Most of their top picks are my bottom picks.</div>,
    calculate: (row: Product): string[] | undefined => {
      return getAttributeValue<string[]>(row.pickedBy);
    },
    render: (row: Product): string => {
      const pickedBy = getAttributeValue<string[]>(row.pickedBy);
      if (!pickedBy) return '';
      return pickedBy.join(', ');
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on pickedBy
      if (row.pickedBy?.rating !== undefined) {
        return row.pickedBy.rating;
      }
      
      const pickedBy = getAttributeValue<string[]>(row.pickedBy);
      return pickedBy ? calculatePickedByRating(pickedBy) : 5;
    }
  },
  {
    key: "shock",
    label: "Shock absorption",
    dtype: "boolean",
    rating: 8,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.shock);
    },
    render: (row: Product): string => {
      const shock = getAttributeValue<boolean>(row.shock);
      return shock ? '✓' : '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise return 5
      return getAttributeRating(row.shock, 5);
    }
  },
  {
    key: "quiet",
    label: "Quiet",
    dtype: "boolean",
    rating: 4,
    showInTable: true,
    notes: () => <div>How conducive to meetings and calls is this treadmill. Whispering is 30dB, conversation is 60dB. So it's only conducive if less than 60. I measure these at 2mph, with the decibel meter near the treadmill and near my microphone. I try to record dB here when I can.</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.quiet);
    },
    render: (row: Product): string => {
      const quiet = getAttributeValue<boolean>(row.quiet);
      return quiet ? '✓' : '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise return 5
      return getAttributeRating(row.quiet, 5);
    }
  },
  {
    key: "dimensions",
    label: "Dimensions",
    // the options are number|string|boolean|custom. See the comment below
    // on how this is custom, for the correct conversion of the original data
    // into the table.
    dtype: "custom",
    // the data is stores as [number,number,number], so should be converted to
    // a string like `1"D x 1"W x 1"H` the cells.
    description: 'D" x W" x H"',
    rating: 2, // adjustment weight (out of 10). 3 means, this isn't that big a deal
    showInTable: true,
    notes: () => <div>(Depth x Width x Height, Inches). Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>,
    calculate: (row: Product): [number, number, number] | undefined => {
      return getAttributeValue<[number, number, number]>(row.dimensions);
    },
    render: (row: Product): string => {
      const dimensions = getAttributeValue<[number, number, number]>(row.dimensions);
      if (!dimensions) return '';
      const [d, w, h] = dimensions;
      return `${d} x ${w} x ${h}`;
    },
    getRating: (row: Product): number => (row.dimensions as any)?.rating ?? 5
  },
  {
    key: "weight",
    label: "Weight",
    dtype: "number",
    rating: 1,
    showInTable: true,
    filterOptions: { min: false, max: true },
    notes: () => <div>As long as it has wheels and tilt-stoppers, weight won't be a problem.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.weight);
    },
    render: (row: Product): string => {
      const weight = getAttributeValue<number>(row.weight);
      if (weight === undefined) return '';
      return `${weight} lbs`;
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on weight
      if (row.weight?.rating !== undefined) {
        return row.weight.rating;
      }
      
      const weight = getAttributeValue<number>(row.weight);
      return weight !== undefined ? calculateWeightRating(weight) : 5;
    }
  },
  {
    key: "easyLube",
    label: "Easy Lube",
    dtype: "boolean",
    rating: 2,
    showInTable: true,
    notes: () => <div>You'll need to lubricate the belt every 50 hours or 3 months of use. This is a royal pain for treadmills with large side plates; easier with low-profile plates.</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.easyLube);
    },
    render: (row: Product): string => {
      const easyLube = getAttributeValue<boolean>(row.easyLube);
      return easyLube ? '✓' : '';
    },
    getRating: (row: Product): number => (row.easyLube as any)?.rating ?? 5
  },
  {
    key: "amazon",
    label: "Amazon",
    dtype: "boolean",
    rating: 2,
    showInTable: true,
    notes: () => <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.amazon);
    },
    render: (row: Product): string => {
      const amazon = getAttributeValue<boolean>(row.amazon);
      return amazon ? '✓' : '';
    },
    getRating: (row: Product): number => (row.amazon as any)?.rating ?? 5
  },
  {
    key: "countries",
    label: "Countries",
    dtype: "custom", // list of country codes
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string[] | undefined => {
      return getAttributeValue<string[]>(row.countries);
    },
    render: (row: Product): string => {
      const countries = getAttributeValue<string[]>(row.countries);
      if (!countries) return '';
      return countries.join(', ');
    },
    getRating: (row: Product): number => (row.countries as any)?.rating ?? 5
  },
  {
    key: "app",
    label: "App",
    dtype: "boolean",
    notes: () => <div>A nice-to-have, but not a deal maker.Some mills work with an app, so your controller isn't a point of failure. In the early days, a dead controller meant a dead mill - as companies didn't provide replacements. But that's less common these days. Apps also tally walking metrics.</div>,
    rating: 1,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.app);
    },
    render: (row: Product): string => {
      const app = getAttributeValue<boolean>(row.app);
      return app ? '✓' : '';
    },
    getRating: (row: Product): number => (row.app as any)?.rating ?? 5
  },
  // warranty: () => <div>Buyer peace-of-mind. Can return easily, and buy an extended warranty through Asurion (which I recommend).</div>
];

// Now define the rank calculation function that uses all other columns
const rankColumn = columnsArray.find(col => col.key === "rank");
if (rankColumn) {
  rankColumn.calculate = (row: Product): number => {
    let totalScore = 0;
    let totalWeight = 0;

    // Process each column that has a rating
    columnsArray.forEach(column => {
      // Skip the rank column itself, columns with 0 rating, and fakespot (since it's already incorporated into rating)
      if (column.key === "rank" || column.rating === 0 || column.key === "fakespot") {
        return;
      }
      // Get the rating using the column's getRating function or fallback to 0
      const rating = column.getRating ? column.getRating(row) : 0;
      
      // Skip if no rating
      if (rating === 0) {
        return;
      }
      
      // Add to total score
      totalScore += rating * column.rating;
      totalWeight += column.rating;
    });

    // Normalize the score to a 0-10 scale
    return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
  };
}

// Helper functions for external use
export const isNumericColumn = (columnId: string): boolean => {
  // Check if the column is one of the known numeric columns
  const numericColumns = ['weight', 'maxWeight', 'maxSpeed', 'horsePower', 'price', 'rating', 'rank'];
  if (numericColumns.includes(columnId)) return true;
  
  // Check if the column info indicates it's a number
  const column = columnsArray.find(col => col.key === columnId);
  return column?.dtype === 'number';
};

export const isBooleanColumn = (columnId: string): boolean => {
  // Check if the column info indicates it's a boolean
  const column = columnsArray.find(col => col.key === columnId);
  return column?.dtype === 'boolean';
};

// Convert the array to an object for backward compatibility
const info = columnsArray.reduce((obj, item) => {
  obj[item.key] = { ...item };
  delete obj[item.key].key; // Remove the key property from the object
  return obj;
}, {} as Record<string, any>);

export { columnsArray };
export default info;
