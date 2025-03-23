import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "TR1200",
  key: `${brand.key}_tr1200`,
  description: "A higher-tier commercial-grade treadmill often seen in coworking spaces. LifeSpan is known for high-quality, durable treadmills suitable for extended daily use.",
  links: {brand: "https://lifespan-fitness.e9ppfh.net/GmyR4k"},

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
    notes: () => <div>Larger dimensions than many consumer models and even the TR1000, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 117, // TODO: Weight not specified in the data
    // notes: () => <div>Likely heavier than consumer models due to commercial-grade construction.</div>
  },
  maxWeight: {
    value: 350,
    notes: () => <div>High max weight capacity (350lbs) compared to most competitors.</div>
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.25, // Assuming higher than TR1000 based on tier
    // notes: () => <div>Commercial-grade motor likely has higher horsepower and better durability than consumer models and the TR1000.</div>
  },
  age: {
    value: "2022-11-16",
  },
  rating: {
    value: [[3.2, 85], [45, 8, 12, 2, 33]],
  },
  fakespot: {
    value: ["A", "A"],
  },
  price: {
    value: 1300,
    notes: () => <div>Significantly higher price point than consumer models and $200 more than the TR1000, reflecting higher-tier commercial-grade quality.</div>
  },
  pickedBy: {
    value: ["public"],
    notes: () => <div>Popular choice for commercial use in coworking spaces, indicating professional-level quality.</div>
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
  sturdy: {
    value: true,
    notes: () => <div>Commercial-grade construction designed for 6 hours of daily use.</div>
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: false, // Not mentioned in the data
  },
  amazon: {
    value: true, // Link is to LifeSpan website, not Amazon
  },
  countries: {
    value: ["US"] // Assuming US availability
  },

  pros: [
    {
      value: "Commercial use",
      rating: 9,
      
      notes: () => <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
    },
    {
      value: "High max weight capacity",
      rating: 9,
      
      notes: () => <div>350 pounds capacity is significantly higher than most consumer models.</div>
    },
    {
      value: "Recommended for 6 hours daily use",
      rating: 8,
      
      notes: () => <div>Designed for extended daily use, indicating superior durability.</div>
    },
    {
      value: "Higher quality than TR1000",
      rating: 8,
      
      notes: () => <div>As a higher-tier model, likely offers improved components and durability over the TR1000.</div>
    }
  ],
  
  cons: [
    {
      value: "Expensive",
      rating: 2,
      
      notes: () => <div>$1800 price point is significantly higher than consumer models and $200 more than the TR1000.</div>
    },
    {
      value: "Very large size",
      rating: 3,
      
      notes: () => <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
    }
  ],
}
export default info