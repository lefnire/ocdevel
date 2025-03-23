import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "Z1",
  key: `${brand.key}_z1`,
  links: {
    amazon: "https://amzn.to/4kQEnA0"
  },

  dimensions: {
    value: [57, 20.7, 5.5], // 57.17"D x 28.43"W x 51.18"H
    // notes: () => <div>Larger dimensions than many competitors, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 50,
  },
  maxWeight: {
    value: 242,
  },
  maxSpeed: {
    value: 4,
    // notes: () => <div>Higher max speed (7.5mph) than most competitors, allowing for running.</div>
  },
  horsePower: {
    value: 2,
  },
  age: {
    value: "2024-01-10",
    rating: 4,
    // notes: () => <div>Released August 12, 2021 - older model compared to newer options.</div>
  },
  rating: {
    value: [[4.4, 107], [70, 15, 5, 4, 6]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Concerning rating distribution with 11% 1-star ratings, indicating potential quality issues.</div>
  },
  fakespot: {
    value: ["A", brand.fakespot], // Fakespot A for the product
    // notes: () => <div>Fakespot A rating indicates generally reliable reviews, despite the concerning distribution.</div>
  },
  price: {
    value: 400, // Taking the middle of the $500-1000 range
    sale: 350,
    // notes: () => <div>Price range of $500-1000 is higher than many competitors. The X21 model is $1000.</div>
  },
  pickedBy: {
    value: ["public", "websites"], // Listed as popular but not recommended
    notes: () => <div>Popular among the public but not recommended due to quality issues.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
  },
  shock: {
    value: true, // Not mentioned in the data
    rating: 2,
  },
  decibels: {
  },
  sturdy: {
    value: false,
    notes: () => <div>Many reports of quality issues including motor burnout and belt drift.</div>
  },
  app: {
    value: false,
    // notes: () => <div>Uses an app instead of a controller, which removes a point of failure and tracks stats over time.</div>
  },
  easyLube: {
    value: true, // Not mentioned in the data
  },
  amazon: {
    value: true,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },
  bump: -10,

  pros: [
    {
      value: "Folds up for stow-away",
      rating: 8,
      
      notes: () => <div>This mill folds in half, and you can either store it under your bed or vertically like a box. Only mill which does this. Personally I don't care, because most mills can tilt against a wall and take up less depth-space that way than a folded WalkingPad anyway.</div>
    },
    {
      value: "App instead of controller",
      rating: 7,
      
      notes: () => <div>Many of these mills use a dedicated controller, which adds a point of failure (the cheapest point of failure in many cases). Not only does an app remove that liability; but also tracks stats over time, which most mills lack.</div>
    },
    {
      value: "Running speed",
      rating: 8,
      
      notes: () => <div>Doubles as a proper treadmill at 7.5mph, much higher than most of the mills listed (including the quality mills). So if you want the choice between walking desk and actual treadmill, this is a great pick.</div>
    }
  ],
  
  cons: [
    {
      value: "Major bad reviews",
      rating: 1,
      
      notes: () => <div>Including motor issues and frequent belt drift. Each of these models ha a high 1-star skew, which is very concerning. I've seen a lot of complaints even outside of Amazon (esp. Reddit). I personally would never buy a WalkingPad; but they are very popular among those who read my content and later make a choice, which is why I'm listing it. I strongly advise doing some heavy review research.</div>
    }
  ],
}
export default info