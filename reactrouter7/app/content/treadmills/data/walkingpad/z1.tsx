import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "Z1",
    notes: brand.notes
  },
  key: `${brand.key}_z1`,
  links: {
    amazon: {
      US: "https://amzn.to/4kQEnA0",
      CA: "https://amzn.to/4bUsuVA",
      UK: "https://amzn.to/41OdVy6",
      EU: "https://amzn.to/3QYs3zT"
    },
    brand: {
      US: "https://www.walkingpad.com/products/walkingpad-z1-under-desk-treadmill",
    }
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
    value: ["B", brand.fakespot], // Fakespot A for the product
    // notes: () => <div>Fakespot A rating indicates generally reliable reviews, despite the concerning distribution.</div>
  },
  price: {
    value: 400, // Taking the middle of the $500-1000 range
    sale: 350,
    // notes: () => <div>Price range of $500-1000 is higher than many competitors. The X21 model is $1000.</div>
  },
  pickedBy: {
    websites: [{value: 10}]
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
  app: {
    value: true,
    // notes: () => <div>Uses an app instead of a controller, which removes a point of failure and tracks stats over time.</div>
  },
  easyLube: {
    value: 10, // Not mentioned in the data
  },
  material: {
    value: "Aluminum"
  },
}
export default info