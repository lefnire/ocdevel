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
    me: 0,
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
    <div>{nonBudgetNote}</div>
    <div>Each iteration is just an upgrade of the one before it. So just pick whichever price point you're most comfortable with. They're also increasingly heavy / large, and accommodate increasing weight. So factor that into your decision. Note: I'm not sure what the difference between the models GlowUp, Classic, Power, and Omni. I think the GlowUp means "just the treadmill" where the other ones are different spins on the "and also the desk" - but you'll want to research some.</div>
  </div>
}
export default info