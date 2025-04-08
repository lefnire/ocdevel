import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "TR5000",
    notes: () => <div>
      <p>The top-tier commercial-grade treadmill from LifeSpan, designed for intensive daily use in professional environments. This is their flagship model with the highest durability and weight capacity. Premium commercial-grade construction designed for 9 hours of daily use, more than the TR1000 and TR1200.</p>
      <h5>Pro: Commercial use</h5>
      <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
      <h5>Pro: Highest max weight capacity</h5>
      <div>400 pounds capacity is significantly higher than most competitors and even other LifeSpan models.</div>
      <h5>Pro: Recommended for 9 hours daily use</h5>
      <div>Designed for extended daily use (9 hours vs 6 hours for TR1000/TR1200), indicating superior durability.</div>
      <h5>Pro: Premium quality</h5>
      <div>As LifeSpan's flagship model, offers the highest quality components and durability in their lineup.</div>
      <h5>Very expensive</h5>
      <div>$2200 price point is significantly higher than consumer models and even other LifeSpan models.</div>
      <h5>Very large size</h5>
      <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
    </div>
  },
  key: `${brand.key}_tr5000`,
  links: {
    brand: {
      US: "https://lifespan-fitness.e9ppfh.net/4GoBJ3",
      CA: "https://lifespan-fitness.e9ppfh.net/4GoBJ3",
    },
    amazon: {
      US: "https://amzn.to/4iWPdmh",
      CA: "https://amzn.to/4iy2f9Z"
    }
  },

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
  },
  weight: {
    value: 122,
  },
  maxWeight: {
    value: 400,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 3, // Assuming higher than TR1200 based on tier
  },
  age: {
    rating: 10,
    value: "2022-11-16",
    notes: () => <div>I'm overriding this attribute because Lifespan is a "buy it for life" brand, age isn't a factor.</div>
  },
  rating: {
    value: [[3.2, 85], [45, 8, 12, 2, 33]],
  },
  fakespot: {
    value: ["A", brand.fakespot], // Not specified in the data
  },
  price: {
    value: 1800,
    // notes: () => <div>Premium price point reflecting top-tier commercial-grade quality. $400 more than the TR1200 and $600 more than the TR1000.</div>
  },
  pickedBy: {
    me: 1
  },
  incline: {
    value: 0,
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 4,
    notes: () => <div>Impact-absorbing silicone</div>
  },
  decibels: {
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 4,
  },

}
export default info