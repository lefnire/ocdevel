import type {Product} from "../types"
import brand from './brand'
const links = {
  amazon: "https://amzn.to/4bM8iFn"
}
const info: Product = {
  brand,
  key: `${brand.key}_q1mini`,
  model: "Q1 Mini",
  description: "Most popular of the very-budget picks. The common 3 are DeerRun, Sperax, and Yagud. But Sperax and Yagud have lower ratings and worse FakeSpot scores on Amazon; and I see a lot of complaints and returns.",
  links,
  dimensions: {
    value: [43, 20, 4.3], // 45"D x 20.3"W x 4.3"H
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
    value: [[4.6, 0], [75, 16, 4, 2, 3]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // rating: 8,
    // notes: () => <div>Excellent rating distribution with 73% 5-star ratings and no 2-star ratings.</div>
  },
  fakespot: {
    value: ["D", "C"],
    rating: 0,
  },
  price: {
    value: 200,
    sale: 150,
    notes: () => <div>Very affordable price point, especially during sales.</div>
  },
  pickedBy: {
    value: ["me", "public"],
  },
  incline: {
    value: 0,
    notes: () => <div>No incline functionality. Recommendation is to prop the front on a block of wood or foam.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
    notes: () => <div>No shock absorption mentioned, which may be a concern for knee health.</div>
  },
  decibels: {
    value: 45, //TODO double-check, and put in table
  },
  sturdy: {
    value: false,
  },
  app: {
    value: true,
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
  bump: 4,

  pros: [
    {
      value: "Very affordable",
      rating: 9,
      
      notes: () => <div>Cheapest you'll find, especially on a sale. The pro option (increased quality and horse power) sometimes drops to this price, so check before buying.</div>
    }
  ],
  
  cons: [
    {
      value: "Low-ish quality",
      rating: 3,
      
      notes: () => <div>This won't last you more than a year. But if you're just testing the waters, it's a good way to go.</div>
    },
    {
      value: "No incline",
      rating: 3,
      
      notes: () => <div>No incline functionality, which is important for knee health. Recommendation is to prop the front on a block of wood or foam.</div>
    }
  ],
}
export default info