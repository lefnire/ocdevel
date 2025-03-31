import type {Product} from "../types";
import brand from './brand'
import {NA} from '../utils'

const thera = "TheraFloor ®"
const slats = {
  standard: "Standard Slats",
  thera: `${thera} Standard Slats`,
  terrain: `${thera} TrueTerrain`
}
const links = {
  amazon: {},
  brand: {
    "ALL": "https://walkolution.com/products/walkolution2"
  }
}
const info: Product = {
  model: {
    value: "Walkolution 2",
    notes: () => <div>
      <p>This is the true winner of winners, the last boss, buy it for life. The only reason it's not in my "Premium Pick" above is the price - it's untenable for most people, including myself. But assuming you can afford it...</p>
      <h5>Manually powered</h5>
      <p>There's no motor. You walk up a slope and gravity does the job. This saves on electricity, and makes setting your speed second nature rather than set.</p>
      <h5>Last a Lifetime</h5>
      <p>Because there's no motor, there's little that can go wrong. It's the motor that dies first in treadmills - rarely something else (like deck cracks, etc). Additionally, this is built in Germany by real geeks who care. This isn't an alphabet-soup-named cash-grab on Amazon. They got the tech right.</p>
      <h5>Ergonomics</h5>
      <p>The slight slope offers that needed angle. The ${slats.thera} or ${slats.terrain} offer significant cushioning - like you're walking on foam or forrest moss. Most walk barefoot or with socks (ergonomically bad with other mills). The ${slats.terrain} is good for your feet (applying uneven pressure as you go); though it does add a slight instability, so if you're worried get the ${slats.thera}. Also, research that ${thera} tech. It won't get gross nor flattened with time, which foam would. It's really cool tech</p>
      <h5>Whisper quiet</h5>
      <p>35dB. Most sound comes for motors, so there you go.</p>
      <h5>Global shipping</h5>
      <p>The only treadmill I've found that ships everywhere, rather than the usual suspects. Do note though, it's pricey shipping, and takes 6-8 weeks.</p>
      <h5>Cons</h5>
      <ul>
        <li>Price, obviously.</li>
        <li>Height. It's so tall you'll need a specialized desk; or at least peripherals, like monitor arms and a keyboard raiser.</li>
      </ul>
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
    value: 6231,
    notes: () => <div>This is why it's not in my "Premium Pick" above. 99% of people (including myself) can't afford it.</div>
  },
  pickedBy: {
    me: 10,
    trusted: [{value: 10}],
    websites: [{value: 1}],
  },
  incline: {
    value: NA,
    // method: "auto"
    notes: () => <div>It's unknown the angle of the incline, but there is one - required for the gravity-based manual walking. In terms of knee-health, even if it's not 3%, there's enough shock absorption in the {thera} to more than compensate.</div>
  },
  shock: {
    value: true,
    rating: 10,
    notes: () => <div>It has 3 options: ${slats.standard}, ${slats.thera}, ${slats.terrain}</div>
  },
  decibels: {
    value: 35,
  },
  app: {
    value: false,
  },
  easyLube: {
    value: NA,
    notes: () => <div>No need to lube! There's no motor to protect. And the rotating slats work different than a belt on deck besides.</div>
  },
  material: {},
}
export default info