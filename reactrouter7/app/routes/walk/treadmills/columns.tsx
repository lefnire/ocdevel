import React from "react";
import type { Product } from "./rows";
import {FaExternalLinkAlt, FaUser, FaWrench, FaStar, FaGlobe, FaDollarSign} from "react-icons/fa";
import {getCurrentLink, getPrice, getCountryLink, getCountryCodes, toFixed0} from "./utils";
import {clickAffiliate} from "~/components/analytics";
import _ from 'lodash';
const faMe = <FaUser style={{ color: '#4a86e8' }} />
const faTrusted = <FaWrench style={{ color: '#4a86e8' }} />
const faPublic = <FaStar style={{ color: '#999999' }} />
const faWebsites = <FaGlobe style={{ color: '#999999' }} />
const faAffiliate = <FaDollarSign style={{ color: '#999999' }} />
import {UPDATED} from './data/index'
import {pickedBy} from "~/routes/walk/treadmills/scoring";

// Column type definition with added properties
interface ColumnDefinition {
  key: string;
  label: string;
  dtype: "boolean" | "string" | "number";
  hideScore?: boolean;
  description?: string;
  notes?: () => React.ReactElement;
  getValue: (row: Product) => string | number | boolean | undefined;
  render?: (row: Product) => string | React.ReactElement; // Function to render the value
  getStyle?: (row: Product) => React.CSSProperties; // Function to get cell style
  getSortValue?: (row: Product) => string | number | undefined; // Function to get value for sorting
  renderPopover?: (row: Product) => React.ReactElement; // Function to render the popover body
  filterOptions?: {
    min?: boolean; // Whether to show min filter for numeric columns
    max?: boolean; // Whether to show max filter for numeric columns
  };
}

// Define the column info array
export const columnsArray: ColumnDefinition[] = [
  {
    key: "total",
    label: "Score",
    dtype: "number",
    hideScore: true,
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
    getValue: (row) => row.total.score,
    render: (row) => row.total.score.toFixed(1),
    getStyle: (): React.CSSProperties => ({ fontWeight: 'bold' }),
  },
  {
    key: "model",
    label: "Model",
    dtype: "string",
    hideScore: true,
    getValue: (row): string => row.model,
    render: (row): React.ReactElement => {
      const link = getCurrentLink(row);

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`plausible-event-name=affiliate plausible-event-product=${row.key}`}
        >
          {row.model} <FaExternalLinkAlt style={{ fontSize: '0.8em', marginLeft: '3px' }} />
        </a>
      );
    },
  },
  {
    key: "brand",
    label: "Brand",
    dtype: "string",
    hideScore: true,
    getValue: (row) => row.brand.name,
    render: (row) => row.brand.name,
  },
  {
    key: "rating",
    label: "Stars",
    dtype: "number",
    description: "Calculation (?)",
    filterOptions: {min: true, max: false},
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
    getValue: (row) => row.rating.value?.[0]?.[0],
    render: (row) => {
      const ratingValue = row.rating?.value
      if (!ratingValue) return '';
      const [[avg]] = ratingValue;
      return avg.toFixed(1);
    },
    renderPopover: (row) => {
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
  },
  {
    key: "price",
    label: "Price",
    dtype: "number",
    description: "Info (?)",
    filterOptions: { min: false, max: true },
    notes: () => <div>Last price I saw this at ({UPDATED})</div>,
    getValue: (row) => getPrice(row),
    render: (row) => {
      const price = getPrice(row);
      return price !== undefined ? `$${price}` : '';
    },
  },
  {
    key: "pickedBy",
    label: "Favored By",
    dtype: "string",
    notes: () => <div>
      <div>{faMe} Me. I've tested it, I love it. I often disagree with popular picks from review sites (eg I eschew WalkingPad & GoPlus), so if you trust my judgement on this page, look for this icon.</div>
      <div>{faTrusted} Trusted Sources. Top picks by gear-heads I follow in hte underground (Discord, Reddit, etc) and I trust their opinions.</div>
      <div>{faAffiliate} Affiliate Rebels. Popular purchase after someone reads my content, does their own research, and selects something else. When there's a trend, this is a high signal.</div>
      {/*<div>{faPublic} Public Opinion. Generally just reviews and what's popular.</div>*/}
      <div>{faWebsites} Websites. What's being recommended on popular review websites. This weighs little, since most of them just use web-scrapers on Amazon for most-popular treadmills. If I think they actually test the products, I'll flag "Trusted Sources".</div>
    </div>,
    getValue: (row) => {
      return Object.keys(row.pickedBy || {})?.join('') || '';
    },
    getSortValue: (row) => row.pickedBy.score,
    render: (row) => {
      const rPick = row.pickedBy
      const bPick = row.brand.pickedBy
      const picks = {
        me: (rPick?.me ?? bPick?.me ?? 0) > 0,
        trusted: _.sumBy(rPick?.trusted || bPick?.trusted || [], "value") > 0,
        websites: _.sumBy(rPick?.websites || bPick?.websites || [], "value") > 0
      }
      if (!(picks.me || picks.trusted || picks.websites)) return <></>;

      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          {picks.me && <span title="Me (Tyler)">{faMe}</span>}
          {picks.trusted && <span title="Trusted Sources">{faTrusted}</span>}
          {/*{pickedBy?.includes("affiliate") && <span title="Affiliate Rebels">{faAffiliate}</span>}*/}
          {/*{pickedBy?.includes("public") && <span title="Popular based on ratings">{faPublic}</span>}*/}
          {picks.websites && <span title="Recommended on review websites">{faWebsites}</span>}
        </div>
      );
    },
  },
  {
    key: "maxWeight",
    label: "Capacity",
    dtype: "number",
    filterOptions: { min: true, max: false },
    // description: "Pounds",
    // notes: () => <div>Most mills these days start at 265lbs. This wasn't the case a couple years ago, which was a problem for many. Use the filters if you're heavier than 265.</div>,
    getValue: (row) => row.maxWeight?.value,
    render: (row) => {
      const maxWeight = row.maxWeight?.value;
      return maxWeight !== undefined ? `${maxWeight} lbs` : '';
    },
  },
  {
    key: "maxSpeed",
    label: "Max Speed",
    dtype: "number",
    description: "Info (?)",
    filterOptions: { min: true, max: false },
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>,
    getValue: (row) => row.maxSpeed?.value,
    render: (row) => {
      const maxSpeed = row.maxSpeed?.value;
      return maxSpeed !== undefined ? `${maxSpeed} mph` : '';
    },
  },
  {
    key: "incline",
    label: "Incline",
    dtype: "number",
    description: "Favor 3% (?)",
    filterOptions: { min: true, max: false },
    notes: () => <div>Sports medicine <a href="https://ocdevel.com/blog/20240228-walking-desks-incline">recommends a 3% incline</a>. Ultra-budget models lack incline. For Urevo models, the number on the remote / console means % (it's not obvious); so setting it to 3 means 3%. Some models support more than 3, which burns significantly more calories (CyberPad goes to 14, which is 50% more calories). If you're in a rush to lose weight, go for it; but don't make it a life-style, slow-and-steady at 3% wins the race. I've tested this over the years. Both flat, and greater than 5%, hurt me knees with time - remedied slowly after returning to 3%.</div>,
    getValue: (row) => row.incline?.value,
    render: (row) => {
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
  },
  // inferred via Favored By
  // {
  //   key: "sturdy",
  //   label: "Sturdy",
  //   dtype: "boolean",
  //   getValue: (row) => row.pickedBy?.score,
  //   render: (row) => {
  //     return (row.pickedBy?.score > 5) ? '✓' : '';
  //   },
  // },
  {
    key: "horsePower",
    label: "Horsepower",
    dtype: "number",
    filterOptions: { min: true, max: false },
    notes: () => <div>While not "proof" of a motor's quality, HP less than 2.5 is typically a brow-raiser on the motor's longevity. HP doesn't just indicate speed, but strength. Target 2.5+.</div>,
    getValue: (row) => row.horsePower?.value,
    render: (row) => {
      const horsePower = row.horsePower?.value;
      return horsePower !== undefined ? `${horsePower}` : '';
    },
  },
  {
    key: "age",
    label: "Released",
    // Generally an ISO string that can be converted into a number (so we can
    // sort / filter), but sometimes it's a textual description. So for sort / filter
    // purposes, it should use dates if possible, and handle non-date strings
    // appropriately
    dtype: "string",
    notes: () => <div>Age is a gut check on goodness. Newer mills, especially by a brand which iterates frequently (like Urevo), mean hardware lessons learned. I've validated this gut-check through testing.</div>,
    getValue: (row: Product) => row.age?.value,
    render: (row: Product): string => row.age?.value ?? "",
  },
  {
    key: "shock",
    label: "Shock absorption",
    dtype: "boolean",
    getValue: (row) => row.shock?.value,
    render: (row) => {
      return (row.shock?.value) ? '✓' : '';
    },
  },
  {
    key: "decibels",
    label: "Decibels",
    dtype: "number",
    filterOptions: { min: false, max: true },
    notes: () => <div>How conducive to meetings and calls is this treadmill. Whispering is 30dB, conversation is 60dB. So it's only conducive if less than 60. I measure these at 2mph, with the decibel meter near the treadmill and near my microphone. I try to record dB here when I can.</div>,
    getValue: (row) => row.decibels?.value,
    render: (row) => {
      const decibels = row.decibels?.value;
      return decibels ? `${decibels} dB` : '';
    },
  },
  {
    key: "dimensions",
    label: "Dimensions",
    dtype: "string",
    // the data is stores as [number,number,number], so should be converted to
    // a string like `1"D x 1"W x 1"H` the cells.
    description: 'D" x W" x H"',
    notes: () => <div>(Depth x Width x Height, Inches). Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>,
    getValue: (row) => row.dimensions?.value?.join(''),
    render: (row) => {
      const dimensions = row.dimensions?.value;
      if (!dimensions) return '';
      const [d, w, h] = dimensions;
      return `${d} x ${w} x ${h}`;
    },
    getSortValue: (row) => row.dimensions.score
  },
  {
    key: "weight",
    label: "Weight",
    dtype: "number",
    filterOptions: { min: false, max: true },
    notes: () => <div>As long as it has wheels and tilt-stoppers, weight won't be a problem.</div>,
    getValue: (row) => row.weight?.value,
    render: (row) => {
      const weight = row.weight?.value;
      return weight ? `${weight} lbs` : '';
    },
  },
  {
    key: "easyLube",
    label: "Easy Lube",
    dtype: "boolean",
    notes: () => <div>You'll need to lubricate the belt every 50 hours or 3 months of use. This is a royal pain for treadmills with large side plates; easier with low-profile plates.</div>,
    getValue: (row) => row.easyLube?.value,
    render: (row) => {
      const easyLube = row.easyLube?.score;
      return easyLube > 7 ? '✓' : '';
    },
  },
  {
    key: "amazon",
    label: "Amazon",
    dtype: "boolean",
    hideScore: true,
    notes: () => <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>,
    getValue: (row) => {
      return !!Object.keys(row.links?.amazon)?.length
    },
    render: (row) => {
      const hasAmazon = !!Object.keys(row.links?.amazon)?.length
      return hasAmazon ? '✓' : '';
    },
  },
  {
    key: "links",
    label: "Countries",
    hideScore: true,
    dtype: "string", // list of country codes
    getValue: (row) => getCountryCodes(row).join(''),
    render: (row) => {
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
                className={`me-1 plausible-event-name=affiliate plausible-event-product=${row.key}`}
              >
                {code}
              </a>
            );
          })}
        </div>
      );
    },
    getSortValue: (row: Product): number => row.links.score,
  },
  {
    key: "app",
    label: "App",
    dtype: "boolean",
    hideScore: true,
    notes: () => <div>A nice-to-have, but not a deal maker.Some mills work with an app, so your controller isn't a point
      of failure. In the early days, a dead controller meant a dead mill - as companies didn't provide replacements. But
      that's less common these days. Apps also tally walking metrics.</div>,
    getValue: (row) => row.app?.value,
    render: (row) => {
      return (row.app?.value) ? '✓' : '';
    },
  }
];

// Convert the array to an object for backward compatibility
export const columnsObj = Object.fromEntries(
  columnsArray.map(column => ([
    column.key,
    column
  ]))
)
