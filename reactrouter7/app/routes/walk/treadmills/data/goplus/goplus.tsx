import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "GoPlus",
  key: `${brand.key}_goplus`,
  description: "I strongly discourage GoPlus. Forget the Wirecutter pick, they only did it because GoPlus is the most popular Amazon budget mill - it was a grab pick. There are two main models. They have a ton more, so visit their store page to compare. Hover over as many models' star-rating widgets as you can. Notice the distribution, that looks like a \"C\" rather than a stair-case. High 1-stars and 2-stars indicate quality issues. If you have the FakeSpot Chrome Extension, you'll see almost all their models are F and D; meaning the 5-stars are fake. Scan through the reviews, and you'll see countless cases of belt-drift, motor blow-out, and more.",
  links: {amazon: "https://amzn.to/4bTDpio"},

  dimensions: {
    value: [43, 19, 4.7], // 52.5"D x 29"W x 44.5"H
    // notes: () => <div>Larger dimensions than many competitors, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
  },
  maxWeight: {
    value: 220,
  },
  maxSpeed: {
    value: 4, // Listed as 2.5mph / 7.5mph in the data, taking the higher value
    // notes: () => <div>Higher max speed than many competitors, allowing for running.</div>
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-11-16",
    rating: 2,
    notes: () => <div>Released June 9, 2020 - older model compared to newer options.</div>
  },
  rating: {
    value: [[2, 0], [0, 0, 1, 0, 1]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Concerning rating distribution with 14% 1-star ratings, showing a "C" shape rather than a staircase, which indicates potential quality issues.</div>
  },
  fakespot: {
    value: ["B", "F"], // Fakespot F for the product
    notes: () => <div>Fakespot F rating and "Seller Caution" indicates significant issues with review authenticity.</div>
  },
  price: {
    value: 135,
  },
  pickedBy: {
    value: ["public", "websites"], // Listed as popular but not recommended
    rating: 1,
    notes: () => <div>Extremely popular but not recommended due to quality issues.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
  },
  shock: {
    value: false, // Not mentioned in the data
  },
  decibels: {
    value: 45,
  },
  sturdy: {
    value: false,
    rating: 0,
    notes: () => <div>Many reports of quality issues including belt drift and motor burnout.</div>
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: true,
  },
  amazon: {
    value: true,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

  pros: [
    {
      value: "Extremely popular",
      rating: 5,
      notes: () => <div>One of the most popular budget treadmills on Amazon.</div>
    }
  ],
  
  cons: [
    {
      value: "Belt drift",
      rating: 2,
      
      notes: () => <div>Many reports of belt drift issues.</div>
    },
    {
      value: "Motor burnout",
      rating: 1,
      
      notes: () => <div>Frequent complaints about motor burnout.</div>
    },
    {
      value: "Console errors",
      rating: 2,
      
      notes: () => <div>Reports of console errors and failure to start.</div>
    },
    {
      value: "Poor review distribution",
      rating: 1,
      
      notes: () => <div>Strong 1-star skew, indicating quality issues. FakeSpot F, and "Seller Caution".</div>
    }
  ],
}
export default info