import {nonBudgetNote} from "../utils";
import type {Brand} from '../types'

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
    me: 10,
    websites: [{value: 5}],
    trusted: [
      {value: 10},
      {value: -1, label: "Reddit: discontinued sales rep", url: "https://www.reddit.com/r/WalkingPads/comments/1j8z0ww/are_there_any_brands_that_sell_20_wide_belts"},
      {value: -1, label: "Reddit: order delays", url: "https://www.reddit.com/r/treadmills/comments/1c0vp8q/warning_do_not_purchase_a_lifespan_fitness/"},
    ]
  },
  warranty: {
    amazon: 2*12,
    brand: 2*12,
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
    <h5>TX6</h5>
    <p>This is your guy, ignore the below.</p>
    <h5>TR1000, TR1200, TR5000</h5>
    <p>Each iteration is just an upgrade of the one before it. So just pick whichever price point you're most comfortable with. They're also increasingly heavy / large, and accommodate increasing weight. So factor that into your decision. Note: I'm not sure what the difference between the models GlowUp, Classic, Power, and Omni. I think the GlowUp means "just the treadmill" where the other ones are different spins on the "and also the desk" - but you'll want to research some.</p>
  </div>
}
export default info