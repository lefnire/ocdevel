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

const info = {
  dimensions: {
    label: "Dimensions",
    // the options are number|string|boolean|custom. See the comment below
    // on how this is custom, for the correct conversion of the original data
    // into the table.
    dtype: "custom",
    // the data is stores as [number,number,number], so should be converted to
    // a string like `1"D x 1"W x 1"H` the cells.
    description: "Depth x Width x Height (inches)",
    rating: 3, // adjustment weight (out of 10). 3 means, this isn't that big a deal
    notes: () => <div>Most walking pads are roughly the same size. But some stand out as too bulky, which may pose problems for your desk dimensions (measure!); or pleasant-surprisngly compact.</div>
  },
  weight: {
    label: "Weight",
    dtype: "number",
    description: "Pounds",
    rating: 1,
    notes: () => <div>As long as it has wheels and tilt-stoppers, weight won't be a problem.</div>
  },
  maxWeight: {
    label: "Max Capacity",
    dtype: "number",
    description: "Pounds",
    rating: 5,
    notes: () => <div>Most mills these days start at 265lbs. This wasn't the case a couple years ago, which was a problem for many. Use the filters if you're heavier than 265.</div>
  },
  maxSpeed: {
    label: "Max Speed",
    dtype: "number",
    description: "Miles Per Hour",
    rating: 3,
    notes: () => <div><em>Very</em> few walking pads go over 4mph. The ones that do are typically more expensive, and require a fold-up rail (I think for legal / safety reasons). Most of us will use these to walk while working, so this isn't a problem. But if you plan to run sometimes, use the filters.</div>
  },
  horsePower: {
    label: "Horse Power",
    dtype: "number",
    description: "Motor Speed",
    rating: 6,
    notes: () => <div>While not "proof" of a motor's quality, HP less than 2.5 is typically a brow-raiser on the motor's longevity. HP doesn't just indicate speed, but strength. Target 2.5+.</div>
  },
  age: {
    label: "Age",
    // Generally an ISO string that can be converted into a number (so we can
    // sort / filter), but sometimes it's a textual description. So for sort / filter
    // purposes, it should use dates if possible, and handle non-date strings
    // appropriately
    dtype: "custom",
    description: "Date released",
    rating: 7,
    notes: () => <div>Age is a gut check on goodness. Newer mills, especially by a brand which iterates frequently (like Urevo), mean hardware lessons learned. I've validated this gut-check through testing.</div>
  },
  rating: {
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
    notes: () => <div>I have a firm stance on ratings. Anything less than 4.1 is no (all products, not just treadmills). Most important though is to observe the rating <em>distribution</em>. A healthy graph looks like a stair case, most being 5 least being 1 (or maybe just a taller than 2). What scares me is a C shape: mostly 5s, and second-mostly 1s. Smoking gun of either (1) fake ratings; (2) quality control (ticking time-bomb). I'll take significantly less 5s in exchange for a healthy curve. This table's calculator factors in the distribution, not just the score.</div>
  },
  fakespot: {
    label: "Fakespot",
    // Stored as [string, string] which is [product rating, company rating], where
    // ratings are A-F. Show in the cell both values, with an icon indicating product
    // or company
    dtype: "custom",
    description: "Product score, company score.",
    rating: 5,
    notes: () => <div>If the product has a low score, I'll give leeway if the company has a high score. Fakespot is great for eye-balling scam products. But.. they tend to have a lot of false positives. I use their score to adjust the ratings; but not as heavily as they do.</div>
  },
  price: {
    label: "Price",
    dtype: "number",
    description: "Dollars",
    rating: 4,
    notes: () => <div>Price is what you're willing to pay, it is what it is. So instead of ranking price, I use my perception of <em>value</em> (cost to quality).</div>
  },
  incline: {
    label: "Incline",
    "dtype": "boolean",
    description: "Favor 3%",
    rating: 6,
    notes: () => <div>Sports medicine <a href="https://ocdevel.com/blog/20240228-walking-desks-incline">recommends a 3% incline</a>. Ultra-budget models lack incline. For Urevo models, the number on the remote / console means % (it's not obvious); so setting it to 3 means 3%. Some models support more than 3, which burns significantly more calories (CyberPad goes to 14, which is 50% more calories). If you're in a rush to lose weight, go for it; but don't make it a life-style, slow-and-steady at 3% wins the race. I've tested this over the years. Both flat, and greater than 5%, hurt me knees with time - remedied slowly after returning to 3%.</div>
  },
  pickedBy: {
    label: "Favored By",
    dtype: "string",
    description: "Me | my trusted sources | the public | the press",
    rating: 9,
    notes: () => <div>Call me cocky, but this is my most important flag. I study the <em>hell</em> out of budget mills. I'm glued to reviews, I test them, I see what DIY fixer-type are saying in Discord. So between my picks and the picks of those I trust on the internet, I won't lead you astray. Next would be public picks; popular either by reviews or in forums (Reddit). Worst, IMO, are popular review site picks. CNET, Engadget, Wired - they're not always wrong, but boy do they get treadmills wrong. I think they just sort by popular on Amazon. Most of their top picks are my bottom picks.</div>
  },
  shock: {
    label: "Shock absorption",
    dtype: "boolean",
    rating: 8,
  },
  quiet: {
    label: "Quiet",
    dtype: "boolean",
    rating: 4,
    notes: () => <div>How conducive to meetings and calls is this treadmill. Whispering is 30dB, conversation is 60dB. So it's only conducive if less than 60. I measure these at 2mph, with the decibel meter near the treadmill and near my microphone. I try to record dB here when I can.</div>
  }, // TODO
  easyLube: {
    label: "Easy Lube",
    dtype: "boolean",
    description: "Low-profile rails",
    rating: 3,
    notes: () => <div>You'll need to lubricate the belt every 50 hours or 3 months of use. This is a royal pain for treadmills with large side plates; easier with Egofit's low-profile plates.</div>
  },
  amazon: {
    label: "Amazon",
    dtype: "boolean",
    rating: 4,
    notes: () => <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>
  },
  sturdy: {
    label: "Sturdy",
    dtype: "boolean",
    rating: 10,
  },
  countries: {
    label: "Countries",
    dtype: "custom", // list of country codes
    description: "Where can this be shipped to.",
    rating: 0,

  },
  app: {
    label: "App",
    dtype: "boolean",
    description: "Can control through app",
    rating: 1,
  },
  // warranty: () => <div>Buyer peace-of-mind. Can return easily, and buy an extended warranty through Asurion (which I recommend).</div>
}

export default info;