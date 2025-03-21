import type {Product} from "./types"
const info: Product = {
  make: "urevo",
  model: "2S Lite",
  description: "If 3S is just a tad too expensive for you, this one is a peg down in cost and quality. It supports incline (set it to 3%), has plenty of shock absorption, is new, available on Amazon, and $100 cheaper than 3S.",
  link: "",

  dimensions: {
    value: [48.6, 20, 6.06], // 48.6"D x 20"W x 6.06"H
    rating: 5,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 2,
    
    notes: () => <div>High weight according to the data, but exact value not specified.</div>
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 2.5,
    rating: 7,
  },
  age: {
    value: "2023-10-19",
    rating: 7,
    
    notes: () => <div>Released October 19, 2023 - relatively new model.</div>
  },
  rating: {
    value: [[4.2, 0], [65, 17, 6, 5, 7]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 6,
    notes: () => <div>Good distribution with majority 5-star ratings, but Fakespot D rating suggests some review reliability issues.</div>
  },
  fakespot: {
    value: ["D", ""], // Fakespot D for the product, company rating not specified
    rating: 3,
    notes: () => <div>Fakespot D rating suggests potential issues with review authenticity.</div>
  },
  price: {
    value: 250,
  },
  pickedBy: {
    value: ["me"],
    rating: 7,
    
  },
  incline: {
    value: 3, // Exact value not specified, but it has incline
    rating: 8,
    
    notes: () => <div>Has incline functionality, which is important for knee health.</div>
  },
  shock: {
    value: true,
    rating: 7,
    
    notes: () => <div>Has shock absorption for better knee health.</div>
  },
  quiet: {
    value: false,
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
    rating: 0,
  },
  amazon: {
    value: true,
    rating: 8,
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