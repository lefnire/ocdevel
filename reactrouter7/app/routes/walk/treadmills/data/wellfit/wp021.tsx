import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
  },
  brand: {
    US: "https://wellfittreadmill.com/products/wp021-under-desk-walking-pad"
  }
}
const info: Product = {
  model: "WP021",
  key: `${brand.key}_wp021`,
  description: "",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [43, 18, 4.7], // "D x "W x "H
  },
  weight: {
    value: 30,
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
    // value: "2024-10-16",
  },
  rating: {
    value: [[4.6, 5], [3,2,0,0,0]],
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 280,
    sale: 140,
  },
  pickedBy: {
    value: [],
  },
  incline: {
    value: 10,
    method: "manual"
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 45,
  },
  sturdy: {
    value: false,
    rating: 5,
  },
  app: {
    value: true,
  },
  bump: {},
  easyLube: {
    value: 6,
  },
  amazon: {
    value: false
  },
  material: {
    // value: "Carbon Steel"
  },
}
export default info