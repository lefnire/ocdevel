import type {CardIn, Product} from "../../types";
import brand from './brand'
import {NA} from '../utils'
import image from '~/assets/products/walkolution_walkolution2.png?w=100&h=100&format=avif&effort=max'

const thera = "TheraFloor ®"
const slats = {
  standard: "Standard Slats",
  thera: `${thera} Standard Slats`,
  terrain: `${thera} TrueTerrain`
}
const links = {
  amazon: {},
  brand: {
    "ALL": "https://walkolution.com/products/walkolution2?sca_ref=8416295.Hx5JVtdlxLpM&sca_source=blog"
  }
}
const info: Product = {
  video: "https://walkolution.com/pages/videos",
  model: {
    value: "Walkolution 2",
    notes: () => <div>
      <p>This is the true winner of winners, the last boss, buy it for life. The downside of course is cost - untenable for most people, including myself. But assuming you can afford it...</p>
      <h5>Manually powered</h5>
      <p>There's no motor. You walk up a slope and gravity does the job. This saves on electricity, and makes setting your speed second nature rather than set.</p>
      <h5>Last a Lifetime</h5>
      <p>Because there's no motor, there's little that can go wrong. It's the motor that dies first in treadmills - rarely something else (like deck cracks, etc). Additionally, this is built in Germany by real geeks who care. This isn't an alphabet-soup-named cash-grab on Amazon. They got the tech right.</p>
      <h5>Ergonomics</h5>
      <p>The slight slope offers that needed angle. The {slats.thera} or {slats.terrain} offer significant cushioning - like you're walking on foam or forrest moss. Most walk barefoot or with socks (ergonomically bad with other mills). The {slats.terrain} is good for your feet (applying uneven pressure as you go); though it does add a slight instability, so if you're worried get the {slats.thera}. Also, research that {thera} tech. It won't get gross nor flattened with time, which foam would. It's really cool tech</p>
      <h5>Whisper quiet</h5>
      <p>35dB. Most sound comes for motors, so there you go.</p>
      <h5>Global shipping</h5>
      <p>The only treadmill I've found that ships everywhere, rather than the usual suspects. Do note though, it's pricey shipping, and takes 6-8 weeks.</p>
      <h5>Cons</h5>
      <ul>
        <li>Price, obviously.</li>
        <li>Height. It's so tall you'll need a specialized desk; or at least peripherals, like monitor arms and a keyboard raiser.</li>
        <li>Heavy. It's too difficult to swap in-and-out for a chair, so it's a permanent fixture.</li>
      </ul>
      <p>And then there's one thing I can't know until I test it. Having used a Xiser Pro Trainer stepper, I found that steppers distracted me due to the manual engagement. The fixed speed of a treadmill forces one into cadence, where the Xiser took brain-power. I'm told it's not the same with manual mills. I'll update here when I find out more.</p>
      <hr />
      <p>If you're hoping for something cheaper, keep an eye on <a href="https://office-walker.com/" target="_blank">Johannes</a> - he's trying to make manual mills more accessible. Manuals are currently such a limited space.</p>
    </div>
  },
  key: `${brand.key}_walkolution2`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [43.3, 25.2, 7.9], // "D x "W x "H
  },
  weight: {
    value: 90.4,
    notes: () => <div>Downside of Walkolution. It's too difficult to swap in-and-out for a chair, so it's a permanent fixture.</div>
  },
  maxWeight: {
    value: 352.7,
  },
  maxSpeed: {
    value: NA,
    rating: 10,
    notes: () => <div>This is a manual device, powered by your walking alone (not a motor). The speed limit is a bit unknown, I've seen people running on it. A <a href="https://www.reddit.com/r/Walkolution/comments/1h2uhxa/comment/m200cw8/" target="_blank">note on running.</a></div>
  },
  horsePower: {
    value: NA,
    rating: 10,
    notes: () => <div>No horsepower, because no motor! Since HP is one of the strongest indicator of motor longevity, that's not a concern here.</div>
  },
  age: {
    value: "2025-01-08",
  },
  rating: {
    rating: 10,
    value: [[0, 0], [0, 0, 0, 0, 0]],
    notes: () => <div>There's no ratings anywhere. It's not on Amazon, and their company page lacks reviews. But I've seen enough via Reddit to know this is a lifetime buy with few flaws. The Walkolution 2 is new. But users of the prior versions tend to be all-day walkers, and I haven't seen a single mentioned hiccup.</div>
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 2915,
    notes: () => <div>
      <p>They have 3 price options for the walking pad, and an optional lean stool attachment (€379 EUR). Also consider shipping costs. Walking pad options:</p>
      <ol>
        <li>{slats.standard}: €2.690 EUR</li>
        <li>{slats.thera}: €5.080 EUR</li>
        <li>{slats.terrain}: €5.380 EUR</li>
      </ol>
      <p>I recommend option 2 personally, but do your research. Lots of discussions on Reddit</p>
    </div>,
  },
  pickedBy: {
    // me: 10,
    trusted: [{value: 50}],
    websites: [{value: 1}],
  },
  incline: {
    value: NA,
    // method: "auto"
    notes: () => <div>It's unknown the angle of the incline (rather a slope), but there is one - required for the gravity-based manual walking. In terms of knee-health, even if it's not 3%, there's enough shock absorption in the {thera} to more than compensate.</div>
  },
  shock: {
    value: true,
    rating: 10,
    notes: () => <div>It has 3 options: {slats.standard}, {slats.thera}, {slats.terrain}. The latter two provide so much cushion, most peopl use this device barefoot or with socks. Maybe the best shock-absorption technology out there.</div>
  },
  decibels: {
    value: 35,
    notes: () => <div>Due to no motor, it's whisper quiet. In fact, some have challenged the dB ratings on other mills (like CyberPad), contesting they couldn't be that quiet with a motor.</div>
  },
  app: {
    value: false,
  },
  easyLube: {
    value: NA,
    rating: 10,
    notes: () => <div>No need to lube! There's no motor to protect. And the rotating slats work different than a belt on deck besides.</div>
  },
  material: {},
}
export default info
export const card: CardIn = {
  image,
  notes: "Invincible, ergonomic, 0 maintenance, 0 electricity.",
  cardTitle: "Walkolution 2",
}
