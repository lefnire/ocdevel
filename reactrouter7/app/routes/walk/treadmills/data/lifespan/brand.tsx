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
      US: "https://www.lifespanfitness.com/pages/treadmill-desks#treadmillDesk"
    },
  },
  fakespot: "B",
  rating: 5,
  bump: -4,
  warranty: {},
  notes: () => <div>
    <div>{nonBudgetNote}</div>
    <div>Each iteration is just an upgrade of the one before it. So just pick whichever price point you're most comfortable with. They're also increasingly heavy / large, and accommodate increasing weight. So factor that into your decision. Note: I'm not sure what the difference between the models GlowUp, Classic, Power, and Omni. I think the GlowUp means "just the treadmill" where the other ones are different spins on the "and also the desk" - but you'll want to research some.</div>
  </div>
}
export default info