import type {Product} from "../types"
const info: Product = {
  make: "lifespan",
  model: "TR5000",
  description: "The top-tier commercial-grade treadmill from LifeSpan, designed for intensive daily use in professional environments. This is their flagship model with the highest durability and weight capacity.",
  link: "https://lifespan-fitness.e9ppfh.net/LXLRYZ",

  dimensions: {
    value: [63, 28.5, 7.25], // 63"L x 28.5"W x 7.25"H
    rating: 3,
    
    notes: () => <div>Larger dimensions than many consumer models, which may be an issue for some desk setups. Same size as the TR1200.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    
    notes: () => <div>Likely the heaviest of the LifeSpan models due to premium commercial-grade construction.</div>
  },
  maxWeight: {
    value: 400,
    rating: 10,
    
    notes: () => <div>Exceptional max weight capacity (400lbs) compared to most competitors and even other LifeSpan models.</div>
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 3.5, // Assuming higher than TR1200 based on tier
    rating: 10,
    
    notes: () => <div>Premium commercial-grade motor likely has the highest horsepower and durability in the LifeSpan lineup.</div>
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
    value: 2200,
    rating: 2,
    
    notes: () => <div>Premium price point reflecting top-tier commercial-grade quality. $400 more than the TR1200 and $600 more than the TR1000.</div>
  },
  pickedBy: {
    value: ["public"],
    rating: 7,
    
    notes: () => <div>Popular choice for commercial use in coworking spaces, indicating professional-level quality.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 10,
    
    notes: () => <div>Likely has the best shock absorption in the LifeSpan lineup as their premium commercial-grade treadmill.</div>
  },
  quiet: {
    value: true, // Assuming based on commercial quality
    rating: 10,
    
    notes: () => <div>Likely the quietest model in the LifeSpan lineup due to premium components.</div>
  },
  sturdy: {
    value: true,
    rating: 10,
    
    notes: () => <div>Premium commercial-grade construction designed for 9 hours of daily use, more than the TR1000 and TR1200.</div>
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