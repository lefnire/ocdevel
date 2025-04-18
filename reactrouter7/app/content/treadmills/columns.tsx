import {type CSSProperties, memo, type ReactElement, type ReactNode} from "react";
import type { Row as RowType } from "./types";
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
  renderCountryLinks, renderReferences
} from "./utils";
const faMe = <FaUser style={{ color: '#4a86e8' }} />
const faTrusted = <FaWrench style={{ color: '#4a86e8' }} />
const faWebsites = <FaGlobe style={{ color: '#999999' }} />
const faAffiliate = <FaDollarSign style={{ color: '#999999' }} />
import {NA} from "./data/utils"
import {Affiliate} from "~/content/product-links";
import ButtonGroup from 'react-bootstrap/cjs/ButtonGroup';
import Dropdown from 'react-bootstrap/cjs/Dropdown';
import DropdownButton from 'react-bootstrap/cjs/DropdownButton';
import {RiInformationLine} from "@react-icons/all-files/ri/RiInformationLine";
import {useModalStore} from "~/components/modal";
import {VideoButtonLg} from "~/components/video-btn";
import {clickAffiliate} from "~/components/analytics";
import {TbCalendarDollar} from "react-icons/tb";
import {PopoverTrigger} from "~/components/popover";
import {IoPricetagsOutline} from "@react-icons/all-files/io5/IoPricetagsOutline";

const UPDATED = "2025-04-18"

// Column type definition with added properties
interface ColumnDefinition {
  key: string;
  label: string;
  dtype: "boolean" | "string" | "number";
  hideScore?: boolean;
  description?: string;
  notes?: () => ReactElement;
  getValue: (row: RowType) => string | number | boolean | undefined;
  format?: (row: RowType) => string | ReactNode; // Function to format the value as a string (for simple cases)
  render?: (row: RowType, clickHandler?: () => void) => ReactNode; // Function to render the value with optional click handler
  columnStyle?: CSSProperties;
  getStyle?: (row: RowType) => CSSProperties; // Function to get cell style
  getSortValue?: (row: RowType) => string | number | undefined; // Function to get value for sorting
  renderModalTitle?: (row: RowType) => string;
  renderModal?: (row: RowType) => ReactNode; // Function to render the popover body
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
    getValue: (row) => row.c.total,
    format: (row) => row.c.total.toFixed(1),
    getStyle: (): CSSProperties => ({ fontWeight: 'bold' }),
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
        {renderReferences(row, 'brand')}
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
        {row.video && <VideoButtonLg href={row.video} />}
        {row.model.notes?.()}
        {renderReferences(row, 'product')}
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
    notes: () => <div>
      <p>Last price I saw this at ({UPDATED})</p>
      <p><strong>On Amazon, always check for a coupon!</strong> Very often the Amazon listing will hike the price, and add an "Apply $x Coupon" checkbox to reach the normal price. I assume to capture extra revenue for those who didn't notice it.</p>
      <p>Also, check both Amazon and the company website's product link, which you can find by clicking on the product name in the table. Prices frequently vary between the two. Just make sure that, if you buy from the company, they offer an 2yr+ warranty.</p>
    </div>,
    getValue: (row) => getPrice(row),
    format: (row) => {
      const price = getPrice(row);
      return price !== undefined ? `$${price}` : '';
    },
    render: (row, clickHandler): ReactElement => {
      const link = getCurrentLink(row);
      const price = getPrice(row);
      const affiliate = {key: row.key, link, title: `${row.brand.name} ${row.model.value}`}
      // Create a wrapper div that can handle the modal click
      // but let the link handle its own click without propagation
      return <div className="d-flex flex-wrap align-items-center">
        <Affiliate product={affiliate} className='icon-link'>
          ${price} <FaExternalLinkAlt fontSize={'0.8em'} />
        </Affiliate>
        {row?.price?.sale && <div>
          <PopoverTrigger
            content={{
              title: "Sale",
              body: () => `Listed price is a sale (last seen ${UPDATED})`
            }}
          >
            <TbCalendarDollar className='ms-1' />
          </PopoverTrigger>
        </div>}
        {row?.price?.coupon && <div>
          <PopoverTrigger
            content={{
              title: "Coupon",
              body: () => `Apply the Amazon coupon (last seen ${UPDATED})`
            }}
          >
            <IoPricetagsOutline className='ms-1' />
          </PopoverTrigger>
        </div>}
        {row.price?.notes && <div
          onClick={clickHandler}
          className="dotted-underline ms-1"
        >
          <RiInformationLine className='ms-1' />
        </div>}
      </div>
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
    getSortValue: (row) => row.c.pickedBy,
    render: (row, clickHandler) => {
      const rPick = row.pickedBy
      const bPick = row.brand.pickedBy
      const picks = {
        me: (rPick?.me ?? bPick?.me ?? 0) > 0,
        trusted: (rPick?.trusted || bPick?.trusted || []).reduce((sum, item) => sum + (item?.value || 0), 0) > 0,
        websites: (rPick?.websites || bPick?.websites || []).reduce((sum, item) => sum + (item?.value || 0), 0) > 0,
        affiliate: (rPick?.affiliate || bPick?.affiliate || []).reduce((sum, item) => sum + (item?.value || 0), 0) > 0,
      }
      if (!(picks.me || picks.trusted || picks.websites || picks.affiliate)) return <></>;

      const className = clickHandler ? "dotted-underline" : ""
      return (
        <div
          style={{ display: 'flex', gap: '8px' }}
          onClick={clickHandler}
          className={className}
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
    notes: () => <div>Make sure there's plenty of wiggle room with your weight. I've cracked decks where my weight is exactly the weight capacity listed.</div>,
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
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require raised handlebars for support (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use this filter.</div>,
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
    notes: () => <div>Horsepower is highly correlated with motor longevity. HP less than 2.5 often have reports of early motor failure. HP doesn't just indicate speed, but also strength. Target 2.5+.</div>,
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
    notes: () => <div>Age is a gut check on quality. Newer mills, especially by a brand which iterates frequently (like Urevo), boast hardware lessons learned. I've validated this gut-check through testing. So take note of the release date, then before you buy go to that company's store page (click the company's name in the table) and find the most recent version of the same product, in case my link is outdated.</div>,
    getValue: (row: RowType) => row.age?.value,
    format: (row: RowType): string => row.age?.value ?? "",
  },
  {
    key: "shock",
    label: "Shock",
    dtype: "boolean",
    notes: () => {
      return <>
        <div>Most will have 8-point or 6-point silicon shock absorbers between two layers of deck, which compress when you land. A few cheap mills won't have shock absorption at all. Mills with incline whose focal point is near the center (eg CyberPad) have natural extra absorption, as the incline mechanism bobs on pistons. As with an incline of 3%, the more damage control you can do for your knees the better, as you may be using this most of your working life. </div>
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
    getSortValue: (row) => row.c.dimensions
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
      const easyLube = row.c.easyLube;
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
      const openModal = useModalStore(s => s.openModal)
      const siteNames = {amazon: "Amazon", brand: row.brand.name}
      return (
        <div
          className="d-flex flex-wrap"
          // onClick={clickHandler}
          // style={clickHandler ? clickableStyle : undefined}
        >
          {countries.order.map(code => {
            if (!row.c.linksInv[code]?.product) {
              if (!row.c.linksInv[code]?.brand) { return null; }
              return <div
                key={`just-brand-${code}-${row.key}`}
                className='btn btn-sm btn-link'
                onClick={() => openModal({
                  title: `${row.brand.name} ${row.model.value}`,
                  body: () => <div>
                    {renderCountryLinks(row, 'brand', code)}
                    <p>I couldn't find this product in {code}, but the brand does sell there. So see if you can find it
                      or similar.</p>
                  </div>
                })}
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
                const productLink = row.c.linksInv[code]?.product?.[site] as string
                if (!productLink) { return null; }
                return <Dropdown.Item
                  eventKey={i}
                  key={`link-picker-${row.key}-${code}-${site}`}
                  href={productLink}
                  target="_blank"
                  onClick={clickAffiliate(row.key)}
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
    getSortValue: (row: RowType): number => row.c.links,
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
