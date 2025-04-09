import type {Product} from "../../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "TR1000",
  key: `${brand.key}_tr1000`,
  description: "A commercial-grade treadmill often seen in coworking spaces. LifeSpan is known for high-quality, durable treadmills suitable for extended daily use. Commercial-grade construction designed for 6 hours of daily use.",
  links: {
    brand: {
      US: "https://lifespan-fitness.e9ppfh.net/eK0k5j"
    },
    amazon: {}
  },

  dimensions: {
    value: [58, 28.5, 7.25], // 58"L x 28.5"W x 7.25"H
    rating: 4,
    
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    
  },
  maxWeight: {
    value: 350,
    rating: 9,
    
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 2.5, // Assuming 2.5+ based on commercial grade
    rating: 8,
    
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
    value: 1600,
    rating: 3,
    
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 8,
    
  },
  decibels: {
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    rating: 4,
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
    }
  ],
  
  cons: [
    {
      value: "Expensive",
      rating: 3,
      
      notes: () => <div>$1600 price point is significantly higher than consumer models.</div>
    },
    {
      value: "Large size",
      rating: 4,
      
      notes: () => <div>Larger dimensions may be challenging for home office setups.</div>
    }
  ],
}
export default info