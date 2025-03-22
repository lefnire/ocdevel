import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "2S Lite",
  key: '2slite',
  description: "If 3S is just a tad too expensive for you, this one is a peg down in cost and quality. It supports incline (set it to 3%), has plenty of shock absorption, is new, available on Amazon, and $100 cheaper than 3S.",
  links: {amazon: "https://amzn.to/3ROlFvN"},

  dimensions: {
    value: [48.6, 20, 6.06], // 48.6"D x 20"W x 6.06"H
    rating: 5,
  },
  weight: {
    value: 57,
    // notes: () => <div>High weight according to the data, but exact value not specified.</div>
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2023-10-19",
  },
  rating: {
    value: [[4.3, 1105], [66, 16, 7, 3, 8]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Good distribution with majority 5-star ratings, but Fakespot D rating suggests some review reliability issues.</div>
  },
  fakespot: {
    value: ["C", brand.fakespot],
    // notes: () => <div>Fakespot D rating suggests potential issues with review authenticity.</div>
  },
  price: {
    value: 400,
    sale: 270,
  },
  pickedBy: {
    value: ["me", "public"],
  },
  incline: {
    value: 8, // Exact value not specified, but it has incline
    // notes: () => <div>Has incline functionality, which is important for knee health.</div>
  },
  shock: {
    value: true,
    rating: 6,
    notes: () => <div>8 silicone shock absorbers</div>
  },
  decibels: {
    rating: 3,
    notes: () => <div>A fair bit louder than Urevo 3S and Egofit M2. Still workable for meetings, but not if you want to be inconspicuous.</div>
  },
  sturdy: {
    value: true,
    rating: 6,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: false, // Not mentioned in the data
  },
  amazon: {
    value: true,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

  cons: [
    {
      value: "Loud",
      rating: 4,
      notes: () => <div>A fair bit louder than Urevo 3S and Egofit M2. Still workable for meetings, but not if you want to be inconspicuous.</div>
    },
    {
      value: "Bulky",
      rating: 3,
      notes: () => <div>Larger size may be an issue for some desk setups.</div>
    }
  ],
}
export default info