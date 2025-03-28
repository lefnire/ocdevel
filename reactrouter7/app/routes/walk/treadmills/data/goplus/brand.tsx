import type {Brand} from '../types'
const info: Brand = {
  key: 'goplus',
  name: "GoPlus / Superfit",
  links: {
    brand: {
      US: "https://www.goplusus.com/collections/treadmill",
      CA: "https://www.goplusus.com/collections/treadmill",
    },
    amazon: {
      US: "https://amzn.to/4ixPPil",
      CA: "https://amzn.to/4iEn17N"
    }
  },
  rating: 1,
  fakespot: "C",
  warranty: {},
  bump: {extra: -5},
  notes: () => <div>
    <div>GoPlus, somtimes Superfit (and other names too, I'll edit here as I collect).</div>
    <div>I hate this brand. Very bad quality control / motor blowouts, but very popular online. This peeves me because it poisons the well in budget treadmill space. It's GoPlus & WalkingPad that have people saying "you get what you pay for", but only because they're such known names.</div>
  </div>
}
export default info