import type {Product} from "../types"
import brand from './brand'
const links = {
  amazon: {
    US: "https://amzn.to/4bM8iFn",
    CA: "https://amzn.to/4kYbXnJ",
    EU: "https://amzn.to/3XBIoOF",
  },
  brand: {
    US: "https://deerruntreadmill.com/products/deerrun-q1-mini-under-desk-treadmill",
  }
}
const info: Product = {
  brand,
  key: `${brand.key}_q1mini`,
  model: {
    value: "Q1 Mini",
    notes: () => <div>
      <h5>Pro: Very affordable</h5>
      <div>Cheapest you'll find, especially on a sale. The pro option (increased quality and horse power) sometimes drops to this price, so check before buying.</div>
      <h5>Con: Low-ish quality</h5>
      <div>This won't last you more than 1-2 years. But if you're just testing the waters, it's a good way to go. Get the Amazon warranty!</div>
      <h5>Con: No incline</h5>
      <div>No incline functionality, which is important for knee health. Recommendation is to prop the front on a block of wood or foam.</div>
    </div>
  },
  links,
  dimensions: {
    value: [43, 20, 4.3],
    // value: [45, 20.3, 4.3], // From Amazon: 45"D x 20.3"W x 4.3"H
  },
  weight: {
    value: 42,
  },
  maxWeight: {
    value: 265,
    // notes: () => <div>Small but mighty!</div>
  },
  maxSpeed: {
    value: 3.8,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-10-15",
    rating: 8,
  },
  rating: {
    value: [[4.6, 96], [75, 16, 4, 2, 3]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // rating: 8,
    // notes: () => <div>Excellent rating distribution with 73% 5-star ratings and no 2-star ratings.</div>
  },
  fakespot: {
    value: ["D", brand.fakespot],
  },
  price: {
    value: 200,
    sale: 150,
  },
  pickedBy: {
    me: 5,
    trusted: [{value: 1}],
    affiliate: [{value: 1}],
    websites: [{value: 3}],
  },
  incline: {
    value: 0,
    notes: () => <div>No incline functionality. Recommendation is to prop the front on a block of wood or foam.</div>
  },
  shock: {
    value: false, // Mentioned in Amazon "Special Features"
    rating: 3,
  },
  decibels: {
    value: 45, //TODO double-check, and put in table
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 5,
  },
  material: {
    value: "Alloy Steel" // From Amazon technical details
  },
}
export default info