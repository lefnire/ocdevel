/*
These are the columns / filters for the table. They can also be read here to und
a bit about that data type and how to use it. Filtering and sorting should be
enabled for all columns. Some info on the attributes:
 - label: the name of the column
 - description: column is a bit more info, and ideally could be shown (if it fits) as smaller font under the label?
 - rating: each row has a rating (eg, egofit_m2 has weight=5, maxSpeed=4, etc). Those ratings are how that particular column stacks up out of 10. But not all attributes are equally important, so the rating attribute in *this* file is the "weight" of that rating. That is, if the column (this file) has a rating of 1, and the row's rating is 5, that 5 should be downplayed significantly in the final score. In the end, a new column should be added to the table (and it should be the first one displayed) called "Rank", with a bit of information on this concept in the popover.
 - notes: Each column should have some icon that shows a popover with these notes, so users can better understand the column.

 For each row, not all values are always present. The table (and the Rank calculation) should take that into consideration.

 There's a `flag` attribute in the rows. If present, it should color the cell.

 Each attribute of each row may have a `notes` attribute, also a function returning jsx. If present, a popover on the cell should show that content.
*/

import React from "react";
import type { Product } from "./types";

// Helper functions moved from formatters.tsx
const getAttributeValue = <T extends any>(attr: any): T | undefined => {
  if (attr && typeof attr === 'object' && 'value' in attr) {
    return attr.value as T;
  }
  return undefined;
};

const hasAttributeNotes = (attr: any): boolean => {
  return attr && typeof attr === 'object' && 'notes' in attr && typeof attr.notes === 'function';
};

const getAttributeFlag = (attr: any): string | undefined => {
  if (attr && typeof attr === 'object' && 'flag' in attr) {
    return attr.flag as string;
  }
  return undefined;
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
}

// Define the column info array
const columnsArray: ColumnDefinition[] = [
  {
    key: "rank",
    label: "Rank",
    dtype: "number",
    description: "Overall score based on weighted attributes",
    rating: 10,
    showInTable: true,
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
    }
  },
  {
    key: "model",
    label: "Model",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.model,
    render: (row: Product): string => row.model
  },
  {
    key: "make",
    label: "Brand",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.make,
    render: (row: Product): string => row.make
    // Note: The actual rendering with brand info will be handled in route.tsx
  },
  {
    key: "combinedRating",
    label: "Star Rating",
    dtype: "number",
    description: "Combined rating from stars and Fakespot",
    rating: 9,
    showInTable: true,
    notes: () => (
      <div>
        <p>This is a combined rating that takes into account:</p>
        <ul>
          <li>Star rating (weighted by number of reviews - more reviews = more reliable)</li>
          <li>Rating distribution (penalizes skewed distributions with high 5-star and high 1-star counts)</li>
          <li>Fakespot grades for both product and company (company grade weighted more heavily)</li>
        </ul>
        <p>The calculation aims to provide a more accurate representation of product quality by accounting for potential fake reviews and quality control issues.</p>
      </div>
    ),
    calculate: (row: Product): number => {
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
    },
    render: (row: Product): string => {
      const score = columnsArray.find(col => col.key === "combinedRating")?.calculate?.(row) || 0;
      return score.toFixed(1);
    },
    getStyle: (row: Product): React.CSSProperties => {
      const score = columnsArray.find(col => col.key === "combinedRating")?.calculate?.(row) || 0;
      if (score >= 8) return { backgroundColor: '#e6ffe6' }; // Green
      if (score >= 6) return { backgroundColor: '#ffffcc' }; // Yellow
      if (score < 6) return { backgroundColor: '#ffcccc' };  // Red
      return {};
    },
    getSortValue: (row: Product): number => {
      return columnsArray.find(col => col.key === "combinedRating")?.calculate?.(row) || 0;
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
    description: "Out of 5-stars; number of ratings; distribution from 5, 4, 3, 2, 1 stars.",
    rating: 8,
    showInTable: false, // Hide this since we're using combinedRating instead
    notes: () => <div>I have a firm stance on ratings. Anything less than 4.1 is no (all products, not just treadmills). Most important though is to observe the rating <em>distribution</em>. A healthy graph looks like a stair case, most being 5 least being 1 (or maybe just a taller than 2). What scares me is a C shape: mostly 5s, and second-mostly 1s. Smoking gun of either (1) fake ratings; (2) quality control (ticking time-bomb). I'll take significantly less 5s in exchange for a healthy curve. This table's calculator factors in the distribution, not just the score.</div>,
    calculate: (row: Product): [[number, number], [number, number, number, number, number]] | undefined => {
      return getAttributeValue<[[number, number], [number, number, number, number, number]]>(row.rating);
    },
    render: (row: Product): string => {
      const rating = getAttributeValue<[[number, number], [number, number, number, number, number]]>(row.rating);
      if (!rating) return '';
      const [[avg, count], distribution] = rating;
      return `${avg.toFixed(1)} (${count} reviews)`;
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
    description: "Dollars",
    rating: 4,
    showInTable: true,
    notes: () => <div>Price is what you're willing to pay, it is what it is. So instead of ranking price, I use my perception of <em>value</em> (cost to quality).</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.price);
    },
    render: (row: Product): string => {
      const price = getAttributeValue<number>(row.price);
      if (price === undefined) return '';
      return `$${price}`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.price);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "maxWeight",
    label: "Max Capacity",
    dtype: "number",
    description: "Pounds",
    rating: 5,
    showInTable: true,
    notes: () => <div>Most mills these days start at 265lbs. This wasn't the case a couple years ago, which was a problem for many. Use the filters if you're heavier than 265.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.maxWeight);
    },
    render: (row: Product): string => {
      const maxWeight = getAttributeValue<number>(row.maxWeight);
      if (maxWeight === undefined) return '';
      return `${maxWeight} lbs`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.maxWeight);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "maxSpeed",
    label: "Max Speed",
    dtype: "number",
    description: "Miles Per Hour",
    rating: 3,
    showInTable: true,
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.maxSpeed);
    },
    render: (row: Product): string => {
      const maxSpeed = getAttributeValue<number>(row.maxSpeed);
      if (maxSpeed === undefined) return '';
      return `${maxSpeed} mph`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.maxSpeed);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "incline",
    label: "Incline",
    dtype: "boolean",
    description: "Favor 3%",
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.incline);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "sturdy",
    label: "Sturdy",
    dtype: "boolean",
    rating: 10,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.sturdy);
    },
    render: (row: Product): string => {
      const sturdy = getAttributeValue<boolean>(row.sturdy);
      return sturdy ? '✓' : '';
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.sturdy);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "horsePower",
    label: "Horse Power",
    dtype: "number",
    description: "Motor Speed",
    rating: 6,
    showInTable: true,
    notes: () => <div>While not "proof" of a motor's quality, HP less than 2.5 is typically a brow-raiser on the motor's longevity. HP doesn't just indicate speed, but strength. Target 2.5+.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.horsePower);
    },
    render: (row: Product): string => {
      const horsePower = getAttributeValue<number>(row.horsePower);
      if (horsePower === undefined) return '';
      return `${horsePower}`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.horsePower);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "age",
    label: "Age",
    // Generally an ISO string that can be converted into a number (so we can
    // sort / filter), but sometimes it's a textual description. So for sort / filter
    // purposes, it should use dates if possible, and handle non-date strings
    // appropriately
    dtype: "custom",
    description: "Date released",
    rating: 7,
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.age);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "pickedBy",
    label: "Favored By",
    dtype: "string",
    description: "Me | my trusted sources | the public | the press",
    rating: 10,
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.pickedBy);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.shock);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.quiet);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
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
    description: "Depth x Width x Height (inches)",
    rating: 3, // adjustment weight (out of 10). 3 means, this isn't that big a deal
    showInTable: true,
    notes: () => <div>Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>,
    calculate: (row: Product): [number, number, number] | undefined => {
      return getAttributeValue<[number, number, number]>(row.dimensions);
    },
    render: (row: Product): string => {
      const dimensions = getAttributeValue<[number, number, number]>(row.dimensions);
      if (!dimensions) return '';
      const [d, w, h] = dimensions;
      return `${d}"D x ${w}"W x ${h}"H`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.dimensions);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "weight",
    label: "Weight",
    dtype: "number",
    description: "Pounds",
    rating: 1,
    showInTable: true,
    notes: () => <div>As long as it has wheels and tilt-stoppers, weight won't be a problem.</div>,
    calculate: (row: Product): number | undefined => {
      return getAttributeValue<number>(row.weight);
    },
    render: (row: Product): string => {
      const weight = getAttributeValue<number>(row.weight);
      if (weight === undefined) return '';
      return `${weight} lbs`;
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.weight);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "easyLube",
    label: "Easy Lube",
    dtype: "boolean",
    description: "Low-profile rails",
    rating: 3,
    showInTable: true,
    notes: () => <div>You'll need to lubricate the belt every 50 hours or 3 months of use. This is a royal pain for treadmills with large side plates; easier with Egofit's low-profile plates.</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.easyLube);
    },
    render: (row: Product): string => {
      const easyLube = getAttributeValue<boolean>(row.easyLube);
      return easyLube ? '✓' : '';
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.easyLube);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "amazon",
    label: "Amazon",
    dtype: "boolean",
    rating: 4,
    showInTable: true,
    notes: () => <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.amazon);
    },
    render: (row: Product): string => {
      const amazon = getAttributeValue<boolean>(row.amazon);
      return amazon ? '✓' : '';
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.amazon);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "countries",
    label: "Countries",
    dtype: "custom", // list of country codes
    description: "Where can this be shipped to.",
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
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.countries);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
  },
  {
    key: "app",
    label: "App",
    dtype: "boolean",
    description: "Can control through app",
    rating: 1,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return getAttributeValue<boolean>(row.app);
    },
    render: (row: Product): string => {
      const app = getAttributeValue<boolean>(row.app);
      return app ? '✓' : '';
    },
    getStyle: (row: Product): React.CSSProperties => {
      const flag = getAttributeFlag(row.app);
      if (flag === 'green') return { backgroundColor: '#e6ffe6' };
      if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
      if (flag === 'red') return { backgroundColor: '#ffcccc' };
      return {};
    }
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
      // Skip the rank column itself and columns with 0 rating
      if (column.key === "rank" || column.rating === 0) {
        return;
      }

      // Get the attribute from the row
      const attr = row[column.key as keyof Product];
      
      // Skip if attribute doesn't exist
      if (!attr) {
        return;
      }

      // Get the attribute rating
      let attrRating = 0;
      if (typeof attr === 'object' && 'rating' in attr && typeof attr.rating === 'number') {
        attrRating = attr.rating;
      }

      // Skip if no rating
      if (attrRating === 0) {
        return;
      }

      // Special case for combinedRating - use the calculated value
      if (column.key === "combinedRating") {
        const combinedRatingColumn = columnsArray.find(col => col.key === "combinedRating");
        if (combinedRatingColumn && combinedRatingColumn.calculate) {
          const score = combinedRatingColumn.calculate(row);
          totalScore += score * column.rating;
          totalWeight += column.rating;
        }
        return;
      }

      // For other columns, use the attribute rating and column weight
      totalScore += attrRating * column.rating;
      totalWeight += column.rating;
    });

    // Normalize the score to a 0-10 scale
    return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
  };
}

// Helper functions for external use
export const isNumericColumn = (columnId: string): boolean => {
  // Check if the column is one of the known numeric columns
  const numericColumns = ['weight', 'maxWeight', 'maxSpeed', 'horsePower', 'price', 'combinedRating', 'rank'];
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