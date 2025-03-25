
import React from "react";
import type { Product } from "./data/types";
import dayjs from "dayjs";
import { FaExternalLinkAlt, FaUser, FaWrench, FaStar, FaGlobe } from "react-icons/fa";
import {getCurrentLink, getPrice, getCountryLink, getCountryCodes} from "./data/utils";
import { Popover } from 'react-bootstrap';
import {clickAffiliate} from "~/components/analytics";
import _ from 'lodash';
import * as calcs from './rating-calcs'

// Default function to get rating from an attribute or return a default value
export const getAttributeRating = (attr: any, defaultRating: number = 5): number => {
  return attr?.rating ?? defaultRating;
};

function toFixed0(val: number | undefined) {
  let val_ = val ?? 0;
  if (val_ < 1) { val_ = val_ * 100 }
  return val_.toFixed(0);
}

const faMe = <FaUser style={{ color: '#4a86e8' }} />
const faTrusted = <FaWrench style={{ color: '#4a86e8' }} />
const faPublic = <FaStar style={{ color: '#999999' }} />
const faWebsites = <FaGlobe style={{ color: '#999999' }} />

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
  renderPopover?: (row: Product) => React.ReactElement; // Function to render the popover body
  filterOptions?: {
    min?: boolean; // Whether to show min filter for numeric columns
    max?: boolean; // Whether to show max filter for numeric columns
  };
}

// Define the column info array
const columnsArray: ColumnDefinition[] = [
  {
    key: "rank",
    label: "Score",
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
      return 0; // Placeholder, will be updated later
    },
    render: (row: Product): string => {
      const score = columnsArray.find(col => col.key === "rank")?.calculate?.(row) ?? 0;
      return score.toFixed(1);
    },
    getStyle: (): React.CSSProperties => {
      return { fontWeight: 'bold' };
    },
    getRating: (): number => 10 // Always return the maximum rating for rank
  },
  {
    key: "model",
    label: "Model",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.model,
    render: (row: Product): React.ReactElement => {
      const link = getCurrentLink(row);
      const price = getPrice(row);
      const onClick = clickAffiliate({
        label: row.key,
        value: price ?? 0
      });

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {row.model} <FaExternalLinkAlt style={{ fontSize: '0.8em', marginLeft: '3px' }} />
        </a>
      );
    },
    getRating: (): number => 0 // Model doesn't have a rating
  },
  {
    key: "brand",
    label: "Brand",
    dtype: "string",
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string => row.brand.key,
    render: (row: Product): string => row.brand.name,
    getRating: (row: Product): number => row.brand?.rating ?? 5
  },
  {
    key: "rating",
    label: "Stars",
    // This is stored as [[number,number],[number,number,number,number,number]].
    // These values are: `[
    // [ average rating, number of reviews ]
    // [ 5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // ]`. In the cell, only the average rating should appear. But the popover
    // should show the breakdown. Make it simple for now, we'll make it fancy later.
    dtype: "custom",
    description: "Calculation (?)",
    filterOptions: {min: true, max: false},
    rating: 10,
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
      return row.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;
    },
    render: (row: Product): string => {
      const ratingValue = row.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;
      if (!ratingValue) return '';
      const [[avg]] = ratingValue;
      return avg.toFixed(1);
    },
    renderPopover: (row: Product) => {
      const notes = row.rating?.notes;

      function renderDistribution() {
        const ratingValue = row.rating?.value as [[number, number], [number, number, number, number, number]] | undefined;
        if (!ratingValue) return null;

        const [[starRating, reviewCount], distribution] = ratingValue;
        const fakespotValue = row.fakespot?.value as [string, string] | undefined;

        return (
          <div>
            {/* Star Rating */}
            <div>
              <strong>Star Rating:</strong> {starRating?.toFixed(1) ?? '0'}/5
              ({reviewCount ?? 0} reviews)
            </div>

            {/* Rating Distribution */}
            <div className="mt-2">
              <strong>Rating Distribution:</strong>
              <div>
                5★{toFixed0(distribution?.[0])}%&nbsp;
                4★{toFixed0(distribution?.[1])}%&nbsp;
                3★{toFixed0(distribution?.[2])}%&nbsp;
                2★{toFixed0(distribution?.[3])}%&nbsp;
                1★{toFixed0(distribution?.[4])}%
              </div>
            </div>

            {/* Fakespot Grades */}
            {fakespotValue && (
              <div className="mt-2">
                <strong>Fakespot Grades:</strong> Product: {fakespotValue[0] ?? 'B'},
                Company: {fakespotValue[1] ?? 'B'}
              </div>
            )}
          </div>
        );
      }

      return (
        <>
          {notes && <div className="mb-2">{notes()}</div>}
          {renderDistribution()}
        </>
      );
    },
    getSortValue: calcs.calculateCombinedRating,
    getRating: calcs.calculateCombinedRating
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
      return getPrice(row);
    },
    render: (row: Product): string => {
      const price = getPrice(row);
      return price !== undefined ? `$${price}` : '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate based on price
      if (row.price?.rating !== undefined) {
        return row.price.rating;
      }

      const price = getPrice(row)
      return price !== undefined ? calcs.calculatePriceRating(price) : 5;
    }
  },
  {
    key: "maxWeight",
    label: "Capacity",
    dtype: "number",
    rating: 5,
    showInTable: true,
    filterOptions: { min: true, max: false },
    // description: "Pounds",
    // notes: () => <div>Most mills these days start at 265lbs. This wasn't the case a couple years ago, which was a problem for many. Use the filters if you're heavier than 265.</div>,
    calculate: (row: Product): number | undefined => {
      return row.maxWeight?.value as number | undefined;
    },
    render: (row: Product): string => {
      const maxWeight = row.maxWeight?.value as number | undefined;
      return maxWeight !== undefined ? `${maxWeight} lbs` : '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists, otherwise calculate
      return row.maxWeight?.rating ?? calcs.calculateMaxWeightRating(row.maxWeight?.value as number ?? 0);
    }
  },
  {
    key: "maxSpeed",
    label: "Max Speed",
    dtype: "number",
    description: "Info (?)",
    rating: 3,
    showInTable: true,
    filterOptions: { min: true, max: false },
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>,
    calculate: (row: Product): number | undefined => {
      return row.maxSpeed?.value as number | undefined;
    },
    render: (row: Product): string => {
      const maxSpeed = row.maxSpeed?.value as number | undefined;
      return maxSpeed !== undefined ? `${maxSpeed} mph` : '';
    },
    getRating: (row: Product): number => {
      return row.maxSpeed?.rating ?? calcs.calculateMaxSpeedRating(row.maxSpeed?.value as number ?? 0);
    }
  },
  {
    key: "incline",
    label: "Incline",
    dtype: "number",
    description: "Favor 3% (?)",
    rating: 6,
    showInTable: true,
    filterOptions: { min: true, max: false },
    notes: () => <div>Sports medicine <a href="https://ocdevel.com/blog/20240228-walking-desks-incline">recommends a 3% incline</a>. Ultra-budget models lack incline. For Urevo models, the number on the remote / console means % (it's not obvious); so setting it to 3 means 3%. Some models support more than 3, which burns significantly more calories (CyberPad goes to 14, which is 50% more calories). If you're in a rush to lose weight, go for it; but don't make it a life-style, slow-and-steady at 3% wins the race. I've tested this over the years. Both flat, and greater than 5%, hurt me knees with time - remedied slowly after returning to 3%.</div>,
    calculate: (row: Product): number | undefined => {
      return row.incline?.value;
    },
    render: (row: Product): React.ReactElement => {
      const incline = row.incline?.value
      const method = row.incline?.method;

      if (!incline) return <></>;

      return (
        <div>
          {`${incline}%`}
          {method && <small className="text-muted ms-1">{method}</small>}
        </div>
      );
    },
    getRating: (row: Product): number => {
      return row.incline?.rating ?? calcs.calculateInclineRating(row.incline?.value as number ?? 0);
    }
  },
  {
    key: "sturdy",
    label: "Sturdy",
    dtype: "boolean",
    rating: 10,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return row.sturdy?.rating as boolean | undefined;
    },
    getRating: (row: Product): number => {
      return getAttributeRating(row.sturdy, 5);
    },
    render: (row: Product): string => {
      return (row.sturdy?.value as boolean | undefined) ? '✓' : '';
    },
  },
  {
    key: "horsePower",
    label: "Horsepower",
    dtype: "number",
    rating: 9,
    showInTable: true,
    filterOptions: { min: true, max: false },
    notes: () => <div>While not "proof" of a motor's quality, HP less than 2.5 is typically a brow-raiser on the motor's longevity. HP doesn't just indicate speed, but strength. Target 2.5+.</div>,
    calculate: (row: Product): number | undefined => {
      return row.horsePower?.value as number | undefined;
    },
    render: (row: Product): string => {
      const horsePower = row.horsePower?.value as number | undefined;
      return horsePower !== undefined ? `${horsePower}` : '';
    },
    getRating: (row: Product): number => {
      return row.horsePower?.rating ?? calcs.calculateHorsePowerRating(row.horsePower?.value as number ?? 0);
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
      return row.age?.value as string | undefined;
    },
    render: (row: Product): string => {
      return (row.age?.value as string | undefined) ?? '';
    },
    getRating: (row: Product): number => {
      // Return the rating property if it exists
      if (typeof row?.age?.rating !== "undefined") { row.age.rating }
      return calcs.calculateAgeRating(row.age?.value)
    }
  },
  {
    key: "pickedBy",
    label: "Favored By",
    dtype: "string",
    rating: 8,
    showInTable: true,
    notes: () => <div>
      <div>{faMe} Me. I've tested it, I love it. I often disagree with popular picks from review sites (eg I eschew WalkingPad & GoPlus), so if you trust my judgement on this page, look for this icon.</div>
      <div>{faTrusted} Trusted Sources. Top picks by gear-heads I follow in hte underground (Discord, Reddit, etc) and I trust their opinions.</div>
      <div>{faPublic} Public Opinion. Generally just reviews and what's popular.</div>
      <div>{faWebsites} Websites. What's being recommended on popular review websites. I down-weight these significantly, since most of them just use web-scrapers on Amazon for most-popular treadmills. If I think they actually test the products, I'll flag "Trusted Sources".</div>
    </div>,
    calculate: (row: Product): string[] | undefined => {
      return row.pickedBy?.value as string[] | undefined;
    },
    render: (row: Product): React.ReactElement => {
      const pickedBy = row.pickedBy?.value as string[] | undefined;
      if (_.isEmpty(pickedBy)) return <></>;

      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          {pickedBy?.includes("me") && <span title="Me (Tyler)">{faMe}</span>}
          {pickedBy?.includes("trusted") && <span title="Trusted Sources">{faTrusted}</span>}
          {pickedBy?.includes("public") && <span title="Popular based on ratings">{faPublic}</span>}
          {pickedBy?.includes("websites") && <span title="Recommended on review websites">{faWebsites}</span>}
        </div>
      );
    },
    getRating: (row: Product): number => {
      return row.pickedBy?.rating ?? calcs.calculatePickedByRating(row.pickedBy?.value as string[] ?? []);
    }
  },
  {
    key: "shock",
    label: "Shock absorption",
    dtype: "boolean",
    rating: 5,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return row.shock?.value as boolean | undefined;
    },
    render: (row: Product): string => {
      return (row.shock?.value as boolean | undefined) ? '✓' : '';
    },
    getRating: (row: Product): number => {
      return getAttributeRating(row.shock, 0);
    }
  },
  {
    key: "decibels",
    label: "Decibels",
    dtype: "number",
    rating: 4,
    showInTable: true,
    filterOptions: { min: false, max: true },
    notes: () => <div>How conducive to meetings and calls is this treadmill. Whispering is 30dB, conversation is 60dB. So it's only conducive if less than 60. I measure these at 2mph, with the decibel meter near the treadmill and near my microphone. I try to record dB here when I can.</div>,
    calculate: (row: Product): number | undefined => {
      return row.decibels?.value as number | undefined;
    },
    render: (row: Product): string => {
      const decibels = row.decibels?.value as number | undefined;
      return decibels !== undefined ? `${decibels} dB` : '';
    },
    getRating: (row: Product): number => {
      if (row.decibels?.rating !== undefined) {
        return row.decibels.rating;
      }
      return calcs.calculateDecibelsRating(row.decibels?.value)
    }
  },
  {
    key: "dimensions",
    label: "Dimensions",
    dtype: "custom",
    // the data is stores as [number,number,number], so should be converted to
    // a string like `1"D x 1"W x 1"H` the cells.
    description: 'D" x W" x H"',
    rating: 2,
    showInTable: true,
    notes: () => <div>(Depth x Width x Height, Inches). Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>,
    calculate: (row: Product): [number, number, number] | undefined => {
      return row.dimensions?.value as [number, number, number] | undefined;
    },
    render: (row: Product): string => {
      const dimensions = row.dimensions?.value as [number, number, number] | undefined;
      if (!dimensions) return '';
      const [d, w, h] = dimensions;
      return `${d} x ${w} x ${h}`;
    },

    getRating: (row: Product): number => {
      // Return the rating property if it exists
      if (typeof row.dimensions?.rating !== "undefined") {
        return row.dimensions.rating;
      }
      return calcs.calculateDimensionsRating(row.dimensions?.value)
    }
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
      return row.weight?.value as number | undefined;
    },
    render: (row: Product): string => {
      const weight = row.weight?.value as number | undefined;
      return weight !== undefined ? `${weight} lbs` : '';
    },
    getRating: (row: Product): number => {
      return row.weight?.rating ?? calcs.calculateWeightRating(row.weight?.value as number ?? 0);
    }
  },
  {
    key: "easyLube",
    label: "Easy Lube",
    dtype: "boolean",
    rating: 2,
    showInTable: true,
    notes: () => <div>You'll need to lubricate the belt every 50 hours or 3 months of use. This is a royal pain for treadmills with large side plates; easier with low-profile plates.</div>,
    calculate: (row: Product): number | undefined => {
      return row.easyLube?.value as number | undefined;
    },
    render: (row: Product): string => {
      const easyLube = row.easyLube?.value as number ?? 5;
      return easyLube > 7 ? '✓' : '';
    },
    getRating: (row: Product): number => row.easyLube?.value ?? 5
  },
  {
    key: "amazon",
    label: "Amazon",
    dtype: "boolean",
    rating: 1,
    showInTable: true,
    notes: () => <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>,
    calculate: (row: Product): boolean | undefined => {
      return row.amazon?.value as boolean | undefined;
    },
    render: (row: Product): string => {
      return (row.amazon?.value as boolean | undefined) ? '✓' : '';
    },
    getRating: (row: Product): number => row.amazon?.rating ?? 0
  },
  {
    key: "countries",
    label: "Countries",
    dtype: "custom", // list of country codes
    rating: 0,
    showInTable: true,
    calculate: (row: Product): string[] => getCountryCodes(row),
    render: (row: Product): React.ReactElement => {
      const countryCodes = getCountryCodes(row);
      if (_.isEmpty(countryCodes)) return <></>;

      return (
        <div className="d-flex flex-wrap gap-1">
          {countryCodes.map(code => {
            const link = getCountryLink(row, code);
            if (!link) return <span key={code}>{code}</span>;

            return (
              <a
                key={code}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={clickAffiliate({
                  label: `${row.key}-${code}`,
                  value: getPrice(row) ?? 0
                })}
                className="me-1"
              >
                {code}
              </a>
            );
          })}
        </div>
      );
    },
    getSortValue: (row: Product): number => getCountryCodes(row).length,
    getRating: (row: Product): number => getCountryCodes(row).length
  },
  {
    key: "app",
    label: "App",
    dtype: "boolean",
    notes: () => <div>A nice-to-have, but not a deal maker.Some mills work with an app, so your controller isn't a point of failure. In the early days, a dead controller meant a dead mill - as companies didn't provide replacements. But that's less common these days. Apps also tally walking metrics.</div>,
    rating: 0,
    showInTable: true,
    calculate: (row: Product): boolean | undefined => {
      return row.app?.value as boolean | undefined;
    },
    render: (row: Product): string => {
      return (row.app?.value as boolean | undefined) ? '✓' : '';
    },
    getRating: (row: Product): number => {
      return row.app?.rating ?? ((row.app?.value as boolean | undefined) ? 10 : 0);
    }
  },
];

// Now define the rank calculation function that uses all other columns
const rankColumn = columnsArray.find(col => col.key === "rank");
if (rankColumn) {
  rankColumn.calculate = (row: Product): number => {
    let totalScore = 0;
    let totalWeight = 0;

    // Process each column that has a rating
    columnsArray.forEach(column => {
      // Skip the rank column itself, columns with 0 rating, and fakespot
      if (column.key === "rank" || column.rating === 0 || column.key === "fakespot") {
        return;
      }

      // Get the rating using the column's getRating function
      const rating = column.getRating?.(row) ?? 0;

      // Skip if no rating
      if (rating === 0) {
        return;
      }

      // Add to total score
      totalScore += rating * column.rating;
      totalWeight += column.rating;
    });

    // Normalize the score to a 0-10 scale
    const normalizedScore = totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;

    // Apply any bump from product or brand
    const bump = row.bump ?? row.brand.bump ?? 0;

    return normalizedScore + bump;
  };
}

// Helper functions for external use
export const isNumericColumn = (columnId: string): boolean => {
  return columnsArray.find(col => col.key === columnId)?.dtype === 'number';
};

export const isBooleanColumn = (columnId: string): boolean => {
  return columnsArray.find(col => col.key === columnId)?.dtype === 'boolean';
};

// Convert the array to an object for backward compatibility
const info = columnsArray.reduce((obj, item) => {
  obj[item.key] = { ...item };
  delete obj[item.key].key; // Remove the key property from the object
  return obj;
}, {} as Record<string, any>);

export { columnsArray };
export default info;
