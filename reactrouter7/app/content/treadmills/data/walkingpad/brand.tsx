import type {Brand} from '../../types'
const info: Brand = {
  key: 'walkingpad',
  name: "WalkingPad / KingSmith / Xiaomi",
  warranty: {},
  links: {
    brand: {
      US: "https://walkingpad.pxf.io/6yVymm",
    },
    amazon: {
      US: "https://amzn.to/41WXQ9z",
      CA: "https://amzn.to/4kQBlvt",
      UK: "https://amzn.to/4kSgbgy",
    }
  },
  fakespot: "B",
  pickedBy: {
    me: -5,
    websites: [{value: 10}]
  },
  notes: () => <div>
    <h5>Pro: Very popular</h5>
    <p><em>Extremely</em> popular brand. Probably the single most popular of all walking desk brands.</p>
    <h5>Pro: Folds up for stow-away</h5>
    <div>This mill folds in half, and you can either store it under your bed or vertically like a box. Only mill which does this. Personally I don't care, because most mills can tilt against a wall and take up less depth-space that way than a folded WalkingPad anyway.</div>
    <h5>Cons</h5>
    <div>I'm concerned about the low horsepower, which is often indicative of motor longevity. Indeed, their early models experienced many reports of premature failure. Perhaps their latest models have improved.</div>
    {/*<p><Alert variant='warning'>Caution!</Alert> I've been researching walking desks since 2016, and there are two recurring offenders: WalkingPad (aka KingSmith, aka Xiaomi) and GoPlus (aka Superfit). They're extremely popular and have high sales. GoPlus because they were early in the game; WalkingPad because they own the SEO. WalkingPad is notorious for motor failure. If you look at any of their mills' ratings, you'll see that C-shape graph you don't want to see (called 1-star skew); which indicates people love it at first, until they don't. I call it the "ticking time bomb" graph. This is validated through tons of Reddit and Discord sleuthing. They nail FakeSpot scores - they don't need fake reviews because they own SEO - but I've seen too many issues over the years. Maybe their latest models are better. But yet, Z1 & Z3 has a 1 Horsepower motor. One. HP is tightly correlated with motor longevity. 2.5 is the average. The quality mills like LifeSpan have 4.5. When people say they're satisfied, I just think "for now."</p>*/}
    {/*<p>Here's another point. See how I have affiliate links everywhere? The average commission is 3%. WalkingPad offers up to 15%! So it would be in my best interest to push them, right? Well now you might second-guess why cheap-review sites are pushing them.</p>*/}
  </div>
}
export default info