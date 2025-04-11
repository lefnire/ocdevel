import {nonBudgetNote} from "../utils";
import type {Brand} from '../../types'

const info: Brand = {
  key: "lifespan",
  name: "LifeSpan",
  links: {
    amazon: {
      US: "https://amzn.to/4iv4NFP",
      CA: "https://amzn.to/4iUdVDO",
    },
    brand: {
      US: "https://lifespan-fitness.e9ppfh.net/Oe4LnP"
    },
  },
  fakespot: "B",
  pickedBy: {
    // me: 10,
    websites: [{value: 5}],
    trusted: [
      {value: 19},
      {value: 1, label: "Reddit deep-dive", url: "https://www.reddit.com/r/treadmills/comments/1eblx3r/comment/lj7obcq/"},
      {value: -1, label: "Reddit: discontinued sales rep", url: "https://www.reddit.com/r/WalkingPads/comments/1j8z0ww/are_there_any_brands_that_sell_20_wide_belts"},
      {value: -1, label: "Reddit: order delays", url: "https://www.reddit.com/r/treadmills/comments/1c0vp8q/warning_do_not_purchase_a_lifespan_fitness/"},
    ]
  },
  warranty: {
    amazon: 2,
    brand: 2,
    notes: () => <div>Frame: 10 Years | Parts: 2 Years | Labor: 1 Year</div>
  },
  notes: () => <div>
    <div>LifeSpan is the most famous, long-standing quality walking pad company. Previously I was very anti-LifeSpan, since:</div>
    <ol>
      <li>There's no incline</li>
      <li>They hadn't released anything new in a decade</li>
        <li>The cost was so outrageous, I'd rather buy a new budget mill every 2 years for 12 years for the same price.</li>
      </ol>
        <p>But recently, they released the TX6, a newer model with <em>very</em> impressive specifications (4.5 HP motor, 6mph max speed, 400lb capacity, etc); lowered weight and dimensions. And they brought all their prices down significantly. Now I think they're compelling. So much so that I'm re-thinking my whole budget angle, since the price gap is no longer so severe.</p>
    <h5>TR5000 &gt; (TR1200 | TX6) &gt; TR1000</h5>
    <p>Each iteration is just an upgrade of the one before it. So just pick whichever price point you're most comfortable with. They're also increasingly heavy / large, and accommodate increasing weight. So factor that into your decision. Note: I'm not sure what the difference between the models GlowUp, Classic, Power, and Omni. I think the GlowUp means "just the treadmill" where the other ones are different spins on the "and also the desk" - but you'll want to research some.</p>
    <p>TX6 is the outlier. It's a newer model, though is often compared to TR1200. The jury's still on which one's a better buy in terms of quality. But it does rock some mean specs, compared to TR1200 (horsepower, speed, etc).</p>
    <h5>Shop locally</h5>
    <p>LifeSpans are popular purchases; and many end up not sticking with the walking-desk life. So you may find one on Craigslist, Facebook Marketplace, etc. Since they last so long, it's worth the discount for used.</p>
  </div>
}
export default info