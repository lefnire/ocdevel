import React from "react";
import type { Product } from "./rows";
import {FaExternalLinkAlt} from "@react-icons/all-files/fa/FaExternalLinkAlt";
import {FaUser} from "@react-icons/all-files/fa/FaUser";
import {FaWrench} from "@react-icons/all-files/fa/FaWrench";
// import {FaStar} from "@react-icons/all-files/fa/FaStar";
import {FaGlobe} from "@react-icons/all-files/fa/FaGlobe";
import {FaDollarSign} from "@react-icons/all-files/fa/FaDollarSign";
import {
  getCurrentLink,
  getPrice,
  getCountryLink,
  getCountryCodes,
  toFixed0,
  ScoreInfo,
  countries,
  renderCountryLinks
} from "./utils";
import _sumBy from 'lodash/sumBy';
import {clickableStyle, useModal} from '../../routes/walk/modal';
const faMe = <FaUser style={{ color: '#4a86e8' }} />
const faTrusted = <FaWrench style={{ color: '#4a86e8' }} />
const faWebsites = <FaGlobe style={{ color: '#999999' }} />
const faAffiliate = <FaDollarSign style={{ color: '#999999' }} />
import {UPDATED} from './data'
import {NA} from "./data/utils"
import {Affiliate} from "~/content/product-links";
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";

// Column type definition with added properties
interface ColumnDefinition {
  key: string;
  label: string;
  dtype: "boolean" | "string" | "number";
  hideScore?: boolean;
  description?: string;
  notes?: () => React.ReactElement;
  getValue: (row: Product) => string | number | boolean | undefined;
  format?: (row: Product) => string | React.ReactNode; // Function to format the value as a string (for simple cases)
  render?: (row: Product, clickHandler?: () => void) => React.ReactNode; // Function to render the value with optional click handler
  columnStyle?: React.CSSProperties;
  getStyle?: (row: Product) => React.CSSProperties; // Function to get cell style
  getSortValue?: (row: Product) => string | number | undefined; // Function to get value for sorting
  renderModalTitle?: (row: Product) => string;
  renderModal?: (row: Product) => React.ReactNode; // Function to render the popover body
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
    columnStyle: {maxWidth: 90},
    hideScore: true,
    filterOptions: { min: true, max: false },
    notes: () => <ScoreInfo />,
    getValue: (row) => row.total.score,
    format: (row) => row.total.score.toFixed(1),
    getStyle: (): React.CSSProperties => ({ fontWeight: 'bold' }),
  },
  {
    key: "brand",
    label: "Brand",
    dtype: "string",
    hideScore: true,
    getValue: (row) => row.brand.name,
    format: (row) => row.brand.name,
    renderModalTitle: (row) => row.brand.name,
    renderModal: (row) => {
      const warranty = row.brand.warranty
      const hasAmazon = !!Object.keys(row.links?.amazon)?.length
      return <div>
        {renderCountryLinks(row, 'brand')}
        {row.brand.notes?.()}
        {(hasAmazon || warranty.brand) && <div>
          <h5>Warranty</h5>
          {hasAmazon && <div>Amazon: 2 years (Asurion). Get it.</div>}
          {warranty.brand && <div>Company: {warranty.brand} years</div>}
          {warranty.notes?.()}
        </div>}
      </div>
    },
  },
  {
    key: "model",
    label: "Model",
    dtype: "string",
    hideScore: true,
    getValue: (row) => row.model.value,
    format: (row) => row.model.value,
    renderModalTitle: (row) => row.model.value,
    renderModal: (row) => {
      return <div>
        {renderCountryLinks(row, 'product')}
        {row.model.notes?.()}
      </div>
    },
    notes: () => <div>
      <h5>Choosing the Right Model</h5>
      <p>Newer is almost always better, due to technology iteration. So before you buy anything - even if you found something you like in this table - do the following:</p>
      <ol>
        <li>Go to the company's website (find this by clicking on the brand in this table)</li>
        <li>Find their Walking Pads section, and sort by "Date, new to old".</li>
        <li>Pick a model you like, favoring newer, based on budget & preference.</li>
      </ol>
      <h5>Finding it on Amazon</h5>
      <p>On a company's Amazon store, you can't sort by newest. So follow the steps above, then:</p>
      <ol>
        <li>Copy the model name from the company site.</li>
        <li>Paste it into Amazon. Amazon listings rarely include the model name in the title (no clue why), but it's often buried in the specifications somewhere, so the search will usually work. Otherwise you'll have to eye-ball it from the photos.</li>
      </ol>
    </div>
  },
  {
    key: "price",
    label: "Price",
    dtype: "number",
    filterOptions: { min: false, max: true },
    notes: () => <div>Last price I saw this at ({UPDATED})</div>,
    getValue: (row) => getPrice(row),
    format: (row) => {
      const price = getPrice(row);
      return price !== undefined ? `$${price}` : '';
    },
    render: (row, clickHandler): React.ReactElement => {
      const link = getCurrentLink(row);
      const price = getPrice(row);
      const affiliate = {key: row.key, link}

      // Create a wrapper div that can handle the modal click
      // but let the link handle its own click without propagation
      return (
        <Affiliate
          product={affiliate}
          onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking the link
        >
          ${price} <FaExternalLinkAlt style={{ fontSize: '0.8em', marginLeft: '3px' }} />
        </Affiliate>
      );
    },
  },
  {
    key: "rating",
    label: "Stars",
    // columnStyle: {maxWidth: 100},
    dtype: "number",
    filterOptions: {min: true, max: false},
    notes: () => (
      <div>
        <p>I have a firm stance on ratings. Anything less than 4.1 is no (all products, not just treadmills). Most important though is to observe the rating <em>distribution</em>. A healthy graph looks like a stair-case, most being 5 least being 1 or 2. What scares me is a C shape: mostly 5s, and second-mostly 1s. Smoking gun of either (1) fake ratings; (2) quality control (ticking time-bomb). I'll take significantly less 5s in exchange for a healthy curve.</p>
        <p>The rating score (bottom right number) takes into account:</p>
        <ul>
          <li>Star rating, usually from Amazon. Pulled towards 4.1 if too few reviews.</li>
          <li>Rating distribution. Penalize skewed distributions with high 5-star and high 1-star counts)</li>
          <li>FakeSpot grades for both product and company. Company grade weighted more heavily.</li>
        </ul>
      </div>
    ),
    getValue: (row) => row.rating.value?.[0]?.[0],
    format: (row) => {
      const rating = row.rating.value?.[0]?.[0]
      if (!rating) return '';
      return rating.toFixed(1);
    },
    renderModal: (row) => {
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
    key: "pickedBy",
    label: "Favored By",
    dtype: "string",
    notes: () => <div>
      <div>{faMe} Me. I've tested it, I love it. I often disagree with popular picks from review sites (eg I eschew WalkingPad & GoPlus), so if you trust my judgement on this page, look for this icon.</div>
      <div>{faTrusted} Trusted Sources. Top picks by gear-heads I follow in hte underground (Discord, Reddit, etc) and I trust their opinions.</div>
      <div>{faAffiliate} Affiliate Rebels. Popular purchase after someone reads my content, does their own research, and selects something else. When there's a trend, this is a high signal.</div>
      <div>{faWebsites} Websites. What's being recommended on popular review websites. This weighs little, since most of them just use web-scrapers on Amazon for most-popular treadmills. If I think they actually test the products, I'll flag "Trusted Sources".</div>
    </div>,
    getValue: (row) => {
      return Object.keys(row.pickedBy || {})?.join('') || '';
    },
    getSortValue: (row) => row.pickedBy.score,
    render: (row, clickHandler) => {
      const rPick = row.pickedBy
      const bPick = row.brand.pickedBy
      const picks = {
        me: (rPick?.me ?? bPick?.me ?? 0) > 0,
        trusted: _sumBy(rPick?.trusted || bPick?.trusted || [], "value") > 0,
        websites: _sumBy(rPick?.websites || bPick?.websites || [], "value") > 0,
        affiliate: _sumBy(rPick?.affiliate || bPick?.affiliate || [], "value") > 0,
      }
      if (!(picks.me || picks.trusted || picks.websites || picks.affiliate)) return <></>;

      return (
        <div
          style={{ display: 'flex', gap: '8px' }}
          onClick={clickHandler}
          {...(clickHandler && { style: { ...clickableStyle, display: 'flex', gap: '8px' } })}
        >
          {picks.me && <span title="Me (Tyler)">{faMe}</span>}
          {picks.trusted && <span title="Trusted Sources">{faTrusted}</span>}
          {picks.affiliate && <span title="Affiliate Rebel">{faAffiliate}</span>}
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
    format: (row) => {
      const maxWeight = row.maxWeight?.value;
      return maxWeight !== undefined ? `${maxWeight} lbs` : '';
    },
  },
  {
    key: "maxSpeed",
    label: "Max Speed",
    dtype: "number",
    filterOptions: { min: true, max: false },
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>,
    getValue: (row) => row.maxSpeed?.value,
    format: (row) => {
      const maxSpeed = row.maxSpeed?.value;
      return maxSpeed !== undefined ? `${maxSpeed} mph` : '';
    },
  },
  {
    key: "incline",
    label: "Incline",
    dtype: "number",
    description: "Favor 3%",
    filterOptions: { min: true, max: false },
    notes: () => <div>Sports medicine <a href="https://ocdevel.com/blog/20240228-walking-desks-incline">recommends a 3% incline</a>. Ultra-budget models lack incline. For Urevo models, the number on the remote / console means % (it's not obvious); so setting it to 3 means 3%. Some models support more than 3, which burns significantly more calories (CyberPad goes to 14, which is 50% more calories). If you're in a rush to lose weight, go for it; but don't make it a life-style, slow-and-steady at 3% wins the race. I've tested this over the years. Both flat, and greater than 5%, hurt me knees with time - remedied slowly after returning to 3%.</div>,
    getValue: (row) => row.incline?.value,
    // Removed format function here as render handles display
    format: (row) => {
      const incline = row.incline?.value
      // if (incline === NA) { return "N/A"; } // handled in table.tsx
      if (!incline) { return ""; }
      const method = row.incline?.method;
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
    format: (row) => {
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
    format: (row: Product): string => row.age?.value ?? "",
  },
  {
    key: "shock",
    label: "Shock",
    dtype: "boolean",
    notes: () => {
      return <>
        <div>Most will have 8-point or 6-point silicone absorbers. These are rubbers between two layers of deck, which compress when you land. A few cheap mills won't have shock absorption at all. Mills with incline whose focal point is near the center (eg CyberPad) have natural extra absorption, as the incline mechanism bobs on pistons.</div>
      </>
    },
    getValue: (row) => row.shock?.value,
    format: (row) => {
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
    format: (row) => {
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
    description: 'D"xW"xH"',
    notes: () => <div>Depth x Width x Height, Inches). Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>,
    getValue: (row) => row.dimensions?.value?.join(''),
    format: (row) => {
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
    format: (row) => {
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
    format: (row) => {
      const easyLube = row.easyLube?.score;
      return easyLube > 7 ? '✓' : '';
    },
  },
  {
    key: "amazon",
    label: "Amazon",
    dtype: "boolean",
    hideScore: true,
    notes: () => <div>Buyer peace-of-mind regarding a warranty (Asurion). I recommend you <em>always</em> get a warranty, because your motor <em>will</em> die - when, not if. So if it's not on Amazon, make sure the company offers a long warranty.</div>,
    getValue: (row) => {
      return !!Object.keys(row.links?.amazon)?.length
    },
    format: (row) => {
      const hasAmazon = !!Object.keys(row.links?.amazon)?.length
      return hasAmazon ? '✓' : '';
    },
  },
  {
    key: "links",
    label: "Countries",
    hideScore: true,
    dtype: "string", // list of country codes
    getValue: (row) => getCountryCodes(row, true).join(''),
    render: (row, clickHandler) => {
      const {openModal} = useModal()
      const siteNames = {amazon: "Amazon", brand: row.brand.name}
      return (
        <div
          className="d-flex flex-wrap"
          // onClick={clickHandler}
          // style={clickHandler ? clickableStyle : undefined}
        >
          {countries.order.map(code => {
            if (!row.linksFull[code]?.product) {
              if (!row.linksFull[code]?.brand) { return null; }
              return <div
                key={`just-brand-${code}-${row.key}`}
                className='btn btn-sm btn-link'
                onClick={() => openModal(
                  `countries-${code}-${row.key}`,
                  `${row.brand.name} ${row.model.value}`,
                  <div>
                    {renderCountryLinks(row, 'brand', code)}
                    <p>I couldn't find this product in {code}, but the brand does sell there. So see if you can find it or similar.</p>
                  </div>
                )}
              >
                {code}
              </div>

            }
            return <DropdownButton
              as={ButtonGroup}
              title={code}
              size="sm"
              variant="link"
              id={`link-picker-${row.key}-${code}`}
              key={`link-picker-${row.key}-${code}`}
            >
              {countries.buyOrder.map((site, i) => {
                // @ts-ignore
                const productLink = row.linksFull[code]?.product?.[site] as string
                if (!productLink) { return null; }
                return <Dropdown.Item
                  eventKey={i}
                  key={`link-picker-${row.key}-${code}-${site}`}
                  href={productLink}
                  target="_blank"
                  className={[
                    'plausible-event-name=affiliate',
                    `plausible-event-product=${row.key}`,
                  ].join(' ')}
                  rel="noopener noreferrer"
                >
                  {siteNames[site]}
                </Dropdown.Item>
              })}
            </DropdownButton>

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
    format: (row) => {
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
