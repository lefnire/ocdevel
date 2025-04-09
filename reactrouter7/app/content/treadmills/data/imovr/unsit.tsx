import type {Product} from "../../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "Unsit",
    notes: () => <div>
      <p>Considered on the internet the highest quality underdesk treadmill. Which has me stumped, because so many of the specs seem better in the LifeSpan models. I personally would prefer LifeSpan based on what I've seen. Those who've used it swear by its invincibility. I don't doubt this. I just don't like it's value.</p>
      <h5>Pro: High quality reputation</h5>
      <div>Considered on the internet the highest quality underdesk treadmill, often copmared to Lifespan.</div>
      <h5>Con: Wide, heavy</h5>
      <div>Very wide at 39 inches and described as heavy, which may make it difficult to fit in some spaces or move around.</div>
      <h5>Con: Expensive</h5>
      <div>At $2500, it's significantly more expensive than most competitors, including premium LifeSpan models.</div>
      <h5>Con: Slow, and low HP</h5>
      <div>Max speed of only 2mph is very low compared to most competitors, which typically offer 4mph or more. And 2 HP - I actually think that's concerning, not just a nuissance. </div>
    </div>
  },
  key: `${brand.key}_unsit`,
  links: {
    brand: {
      US: "https://www.imovr.com/products/unsit-desk-treadmill",
      CA: "https://www.imovr.com/products/unsit-desk-treadmill",
    },
    amazon: {}
  },

  dimensions: {
    value: [56, 39, 5], // 39″ wide × 56″ long, height not specified
    notes: () => <div>Very wide at 39 inches, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 162,
  },
  maxWeight: {
    value: 300,
    // notes: () => <div>Good max weight capacity (300lbs), though less than LifeSpan models.</div>
  },
  maxSpeed: {
    value: 2,
    notes: () => <div>Very low max speed (2mph) compared to most competitors, which typically offer 4mph or more.</div>
  },
  horsePower: {
    value: 2, // Assuming 2.5+ based on premium positioning
    notes: () => <div>Wildly low for such a high-end machine</div>
  },
  age: {
  },
  rating: {
    value: [[5, 4], [1, 0, 0, 0, 0]], // TODO: Rating not specified in the data
  },
  fakespot: {
    value: ["A", brand.fakespot], // Not specified in the data
  },
  price: {
    value: 2500,
  },
  pickedBy: {
    me: -5,
    trusted: [{value: 1}],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    // notes: () => <div>Likely has good shock absorption given the premium positioning and price point.</div>
  },
  decibels: {
    value: 42.9,
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 1,
  },
}
export default info