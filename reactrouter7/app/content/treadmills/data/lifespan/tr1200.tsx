import type {Product} from "../../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "TR1200",
    notes: () => <div>
      <p>A higher-tier commercial-grade treadmill often seen in coworking spaces. LifeSpan is known for high-quality, durable treadmills suitable for extended daily use (6 hours at a time).</p>
      <h5>Pro: Commercial use</h5>
      <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
      <h5>Pro: High max weight capacity</h5>
      <div>350 pounds capacity is significantly higher than most consumer models.</div>
      <h5>Pro: Recommended for 6 hours daily use</h5>
      <div>Designed for extended daily use, indicating superior durability.</div>
      <h5>Pro: Higher quality than TR1000</h5>
      <div>As a higher-tier model, likely offers improved components and durability over the TR1000.</div>
      <h5>Con: Expensive</h5>
      <div>$1800 price point is significantly higher than consumer models and $200 more than the TR1000.</div>
      <h5>Con: Very large size</h5>
      <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
    </div>
  },
  key: `${brand.key}_tr1200`,
  links: {
    brand: {
      US: "https://lifespan-fitness.e9ppfh.net/N94Yz1",
      CA: "https://lifespan-fitness.e9ppfh.net/N94Yz1",
    },
    amazon: {
      US: "https://amzn.to/4jcm2Mb",
      CA: "https://amzn.to/4ixfzve"
    }
  },

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
  },
  weight: {
    value: 117, // TODO: Weight not specified in the data
    // notes: () => <div>Likely heavier than consumer models due to commercial-grade construction.</div>
  },
  maxWeight: {
    value: 330,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 3.0,
    // notes: () => <div>Commercial-grade motor likely has higher horsepower and better durability than consumer models and the TR1000.</div>
  },
  age: {
    rating: 10, // timeless
    value: "2022-11-16",
    notes: () => <div>I'm overriding this attribute because Lifespan is a "buy it for life" brand, age isn't a factor.</div>
  },
  rating: {
    value: [[3.2, 86], [43, 8, 11, 2, 36]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 1300,
  },
  pickedBy: {
  },
  incline: {
    value: 0, // Not mentioned in the data
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 4,
    // notes: () => <div>Likely has superior shock absorption as a higher-tier commercial-grade treadmill.</div>
  },
  decibels: {
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 4, // Not mentioned in the data
  },
  material: {
    value: "Aluminum, Plastic" // From Amazon page
  },


}
export default info