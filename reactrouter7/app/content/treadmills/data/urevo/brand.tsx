import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://shareasale.com/r.cfm?b=2635321&u=4069700&m=159466&urllink=www%2Eurevo%2Ecom%2Fcollections%2Funder%2Ddesk%2Dtreadmill%3Fsort%5Fby%3Dcreated%2Ddescending&afftrack=blog",
    EU: "https://shareasale.com/r.cfm?b=2635321&u=4069700&m=159466&urllink=www%2Eurevo%2Ecom%2Fcollections%2Funder%2Ddesk%2Dtreadmill%3Fsort%5Fby%3Dcreated%2Ddescending&afftrack=blog",
  },
  amazon: {
    US: "https://amzn.to/4iNELhj",
    CA: "https://amzn.to/4hBmCBM",
    UK: "https://amzn.to/4hBmWR0",
  },
}
const info: Brand = {
  key: 'urevo',
  name: "Urevo",
  links,
  // overriden in each item
  warranty: {
    amazon: 12*2,
    brand: 12*2,
    notes: () => <div>Amazon for peace of mind, but Urevo's is free and 2 years. Tough call.</div>
  },
  fakespot: "B",
  pickedBy: {
    me: 1,
    affiliate: [
      {value: 2}
    ],
    websites: [
      {value: 2},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ]
  },
  notes: () => <div>
    Urevo has the best value (price-to-quality ratio) of my research & testing. Eg, compared to Egofit M2 - they're available on Amazon, with extended warranty, cheaper, less sensitive to pet-hair, for otherwise same quality. They're the default choice by some package deals (like FlexiSpot walking desks). I recommend the Urevo 3S for mid-tier, CyberPad for quality. Their other models have some combination of good price, shock absorption, incline, good motor; but rarely all together. Note: their prices fluctuate, and there's often an Amazon Coupon (right under the price), check before buying.

    <div><b>Choosing the right model</b></div>
    <div>
      There are multiple options, each with trade-offs. Budget = SpaceWalk E; Mid = SpaceWalk S; Quality = Strol & CyberPad
    </div>
    <ol>
      <li>
        <b>
          <a href={links.brand.US} target="_blank">Go to their website</a>, sort by Date: new-&gt;old.
        </b>
        <div><small>Their website is easier to compare models than Amazon. Newer models are better, since Urevo iterates fast based on user complains. Eg, the SpaceWalk E3 had motor heat complaints; so they improved that with E4; then again with E5 (adding vents).</small></div>
      </li>
      <li>
        <b>Find one based on needs</b>
        <div><small>Spacewalks are the budget options; "S" models are the mid-range; and Strols allow running (max speeds around 7.5mph).</small></div>
      </li>
      <li>
        <b>Then copy/paste the model name into Amazon</b>
        <div><small>Some of the newest models aren't there yet; but most the others are. Then you can get the Asurion extended warranty and all that. They don't name them on Amazon, so cross-reference the image from what you chose on urevo.com.</small></div>
      </li>
    </ol>
  </div>
}
export default info