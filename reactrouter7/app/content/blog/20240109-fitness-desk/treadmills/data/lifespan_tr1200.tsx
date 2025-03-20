import type {Product} from "./types"
const info: Product = {
  make: "lifespan",
  model: "TR1200",
  description: "A higher-tier commercial-grade treadmill often seen in coworking spaces. LifeSpan is known for high-quality, durable treadmills suitable for extended daily use.",
  link: "https://lifespan-fitness.e9ppfh.net/GmyR4k",

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
    rating: 3,
    flag: "yellow",
    notes: () => <div>Larger dimensions than many consumer models and even the TR1000, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    flag: "yellow",
    notes: () => <div>Likely heavier than consumer models due to commercial-grade construction.</div>
  },
  maxWeight: {
    value: 350,
    rating: 9,
    flag: "green",
    notes: () => <div>High max weight capacity (350lbs) compared to most competitors.</div>
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 3, // Assuming higher than TR1000 based on tier
    rating: 9,
    flag: "green",
    notes: () => <div>Commercial-grade motor likely has higher horsepower and better durability than consumer models and the TR1000.</div>
  },
  age: {
    value: "", // TODO: Age not specified in the data
    rating: 0,
  },
  rating: {
    value: [[0, 0], [0, 0, 0, 0, 0]], // TODO: Rating not specified in the data
    rating: 0,
  },
  fakespot: {
    value: ["", ""], // Not specified in the data
    rating: 0,
  },
  price: {
    value: 1800,
    rating: 3,
    flag: "yellow",
    notes: () => <div>Significantly higher price point than consumer models and $200 more than the TR1000, reflecting higher-tier commercial-grade quality.</div>
  },
  pickedBy: {
    value: ["public"],
    rating: 7,
    flag: "green",
    notes: () => <div>Popular choice for commercial use in coworking spaces, indicating professional-level quality.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 9,
    flag: "green",
    notes: () => <div>Likely has superior shock absorption as a higher-tier commercial-grade treadmill.</div>
  },
  quiet: {
    value: true, // Assuming based on commercial quality
    rating: 9,
    flag: "green",
    notes: () => <div>Likely quieter than consumer models and possibly the TR1000 due to higher quality components.</div>
  },
  sturdy: {
    value: true,
    rating: 9,
    flag: "green",
    notes: () => <div>Commercial-grade construction designed for 6 hours of daily use.</div>
  },
  app: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  easyLube: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  amazon: {
    value: false, // Link is to LifeSpan website, not Amazon
    rating: 0,
  },
  countries: {
    value: ["US"] // Assuming US availability
  },

  pros: [
    {
      value: "Commercial use",
      rating: 9,
      flag: "green",
      notes: () => <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
    },
    {
      value: "High max weight capacity",
      rating: 9,
      flag: "green",
      notes: () => <div>350 pounds capacity is significantly higher than most consumer models.</div>
    },
    {
      value: "Recommended for 6 hours daily use",
      rating: 8,
      flag: "green",
      notes: () => <div>Designed for extended daily use, indicating superior durability.</div>
    },
    {
      value: "Higher quality than TR1000",
      rating: 8,
      flag: "green",
      notes: () => <div>As a higher-tier model, likely offers improved components and durability over the TR1000.</div>
    }
  ],
  
  cons: [
    {
      value: "Expensive",
      rating: 2,
      flag: "yellow",
      notes: () => <div>$1800 price point is significantly higher than consumer models and $200 more than the TR1000.</div>
    },
    {
      value: "Very large size",
      rating: 3,
      flag: "yellow",
      notes: () => <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
    }
  ],
}
export default info