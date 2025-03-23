import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "TR5000",
  key: `${brand.key}_tr5000`,
  description: "The top-tier commercial-grade treadmill from LifeSpan, designed for intensive daily use in professional environments. This is their flagship model with the highest durability and weight capacity.",
  links: {
    brand: {
      US:"https://lifespan-fitness.e9ppfh.net/GmyR4k"
    },
    amazon: {
      US: "https://amzn.to/4iWPdmh",
      CA: "https://amzn.to/4iy2f9Z"
    }
  },

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
    notes: () => <div>Larger dimensions than many consumer models, which may be an issue for some desk setups. Same size as the TR1200.</div>
  },
  weight: {
    value: 122,
    notes: () => <div>Likely the heaviest of the LifeSpan models due to premium commercial-grade construction.</div>
  },
  maxWeight: {
    value: 400,
    notes: () => <div>Exceptional max weight capacity compared to most competitors and even other LifeSpan models.</div>
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 3, // Assuming higher than TR1200 based on tier
    notes: () => <div>Premium commercial-grade motor likely has the highest horsepower and durability in the LifeSpan lineup.</div>
  },
  age: {
    value: "2022-11-16",
  },
  rating: {
    value: [[3.2, 85], [45, 8, 12, 2, 33]],
  },
  fakespot: {
    value: ["A", "B"], // Not specified in the data
  },
  price: {
    value: 1800,
    // notes: () => <div>Premium price point reflecting top-tier commercial-grade quality. $400 more than the TR1200 and $600 more than the TR1000.</div>
  },
  pickedBy: {
    value: [],
    notes: () => <div>Popular choice for commercial use in coworking spaces, indicating professional-level quality.</div>
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
  sturdy: {
    value: true,
    rating: 7,
    notes: () => <div>Premium commercial-grade construction designed for 9 hours of daily use, more than the TR1000 and TR1200.</div>
  },
  app: {
    value: false,
  },
  easyLube: {
    value: false,
  },
  amazon: {
    value: true,
    rating: 0,
  },

  pros: [
    {
      value: "Commercial use",
      rating: 9,
      
      notes: () => <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
    },
    {
      value: "Highest max weight capacity",
      rating: 10,
      
      notes: () => <div>400 pounds capacity is significantly higher than most competitors and even other LifeSpan models.</div>
    },
    {
      value: "Recommended for 9 hours daily use",
      rating: 10,
      
      notes: () => <div>Designed for extended daily use (9 hours vs 6 hours for TR1000/TR1200), indicating superior durability.</div>
    },
    {
      value: "Premium quality",
      rating: 10,
      
      notes: () => <div>As LifeSpan's flagship model, offers the highest quality components and durability in their lineup.</div>
    }
  ],
  
  cons: [
    {
      value: "Very expensive",
      rating: 2,
      
      notes: () => <div>$2200 price point is significantly higher than consumer models and even other LifeSpan models.</div>
    },
    {
      value: "Very large size",
      rating: 3,
      
      notes: () => <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
    }
  ],
}
export default info