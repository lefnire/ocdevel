import type {Product} from "../types"
const info: Product = {
  make: "goplus",
  model: "GoPlus",
  description: "I strongly discourage GoPlus. Forget the Wirecutter pick, they only did it because GoPlus is the most popular Amazon budget mill - it was a grab pick. There are two main models. They have a ton more, so visit their store page to compare. Hover over as many models' star-rating widgets as you can. Notice the distribution, that looks like a \"C\" rather than a stair-case. High 1-stars and 2-stars indicate quality issues. If you have the FakeSpot Chrome Extension, you'll see almost all their models are F and D; meaning the 5-stars are fake. Scan through the reviews, and you'll see countless cases of belt-drift, motor blow-out, and more.",
  link: "https://amzn.to/3vxMSuh",

  dimensions: {
    value: [52.5, 29, 44.5], // 52.5"D x 29"W x 44.5"H
    rating: 3,
    flag: "yellow",
    notes: () => <div>Larger dimensions than many competitors, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
  },
  maxWeight: {
    value: 265,
    rating: 7,
  },
  maxSpeed: {
    value: 7.5, // Listed as 2.5mph / 7.5mph in the data, taking the higher value
    rating: 8,
    flag: "green",
    notes: () => <div>Higher max speed than many competitors, allowing for running.</div>
  },
  horsePower: {
    value: 2.25,
    rating: 6,
  },
  age: {
    value: "2020-06-09",
    rating: 2,
    flag: "red",
    notes: () => <div>Released June 9, 2020 - older model compared to newer options.</div>
  },
  rating: {
    value: [[4, 0], [56, 17, 8, 5, 14]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 3,
    flag: "red",
    notes: () => <div>Concerning rating distribution with 14% 1-star ratings, showing a "C" shape rather than a staircase, which indicates potential quality issues.</div>
  },
  fakespot: {
    value: ["F", ""], // Fakespot F for the product
    rating: 1,
    flag: "red",
    notes: () => <div>Fakespot F rating and "Seller Caution" indicates significant issues with review authenticity.</div>
  },
  price: {
    value: 300,
    rating: 5,
  },
  pickedBy: {
    value: ["public"], // Listed as popular but not recommended
    rating: 2,
    flag: "red",
    notes: () => <div>Extremely popular but not recommended due to quality issues.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  quiet: {
    value: false, // Not specifically mentioned
    rating: 0,
  },
  sturdy: {
    value: false,
    rating: 2,
    flag: "red",
    notes: () => <div>Many reports of quality issues including belt drift and motor burnout.</div>
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
    value: true,
    rating: 8,
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
      flag: "red",
      notes: () => <div>Many reports of belt drift issues.</div>
    },
    {
      value: "Motor burnout",
      rating: 1,
      flag: "red",
      notes: () => <div>Frequent complaints about motor burnout.</div>
    },
    {
      value: "Console errors",
      rating: 2,
      flag: "red",
      notes: () => <div>Reports of console errors and failure to start.</div>
    },
    {
      value: "Poor review distribution",
      rating: 1,
      flag: "red",
      notes: () => <div>Strong 1-star skew, indicating quality issues. FakeSpot F, and "Seller Caution".</div>
    }
  ],
}
export default info