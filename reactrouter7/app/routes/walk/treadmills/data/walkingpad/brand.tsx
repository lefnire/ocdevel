import type {Brand} from '../types'
import {Alert} from "react-bootstrap";
const info: Brand = {
  key: 'walkingpad',
  name: "WalkingPad / KingSmith / Xiaomi",
  warranty: {},
  links: {
    brand: {
      US: "https://www.walkingpad.com/?srsltid=AfmBOop2F5kQxypsznv0TKuHuzfcXXuhz8l-p-3frq6DKwdiw8G3yk5p",
    },
    amazon: {
      US: "https://amzn.to/41WXQ9z",
      CA: "https://amzn.to/4kQBlvt",
      UK: "https://amzn.to/4kSgbgy",
    }
  },
  fakespot: "B",
  pickedBy: {
    me: -8,
    websites: [{value: 10}]
  },
  notes: () => <div>
    <p><Alert variant='warning'>Caution!</Alert> I've been researching walking desks since 2016, and there are two recurring offenders: WalkingPad (aka KingSmith, aka Xiaomi) and GoPlus (aka Superfit). They're extremely popular and have high sales. GoPlus because they were early in the game; WalkingPad because they own the SEO. WalkingPad is notorious for motor failure. If you look at any of their mills' ratings, you'll see that C-shape graph you don't want to see (called 1-star skew); which indicates people love it at first, until they don't. I call it the "ticking time bomb" graph. This is validated through tons of Reddit and Discord sleuthing. They nail FakeSpot scores - they don't need fake reviews because they own SEO - but I've seen too many issues over the years. Maybe their latest models are better. But yet, Z1 & Z3 has a 1 Horsepower motor. One. HP is tightly correlated with motor longevity. 2.5 is the average. The quality mills like LifeSpan have 4.5. When people say they're satisfied, I just think "for now."</p>
    <p>Here's another point. See how I have affiliate links everywhere? The average commission is 3%. WalkingPad offers up to 15%! So it would be in my best interest to push them, right? Well now you might second-guess why cheap-review sites are pushing them.</p>
  </div>
}
export default info