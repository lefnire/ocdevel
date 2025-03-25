import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/41XUJOv",
  },
  brand: {
    US: "https://wellfittreadmill.com/products/wp017-auto-incline-walking-pad"
  }
}
const info: Product = {
  model: "WP017",
  key: `${brand.key}_wp017`,
  description: "",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [47.2, 18.5, 5.5], // "D x "W x "H
  },
  weight: {
    value: 46.5,
  },
  maxWeight: {
    value: 330,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.85,
  },
  age: {
    value: "2024-10-16",
  },
  rating: {
    value: [[4.4, 237], [68,18,5,3,6]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 500,
    sale: 290,
  },
  pickedBy: {
    value: [],
  },
  incline: {
    value: 10,
    method: "auto"
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  sturdy: {
    value: false,
    rating: 5,
  },
  app: {
    value: true,
  },
  // bump: 0,
  easyLube: {
    value: 6,
  },
  amazon: {
    value: true
  },
  material: {
    value: "Carbon Steel"
  },
}
export default info