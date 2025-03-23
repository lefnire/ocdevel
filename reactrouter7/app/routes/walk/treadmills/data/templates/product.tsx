import type {Product} from "../types";
import brand from './brand'

const info: Product = {
  model: "Product",
  key: `${brand.key}_cyberpad`,
  links: {
    amazon: "",
    brand: "",
    // amazonPause: "brand",
  },
  brand,
  // description: "",
  dimensions: {
    value: [47.6, 23.6, 8.7], // 47.6"D x 23.6"W x 8.7"H
  },
  weight: {
    value: 100,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 3.5,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-01-01",
  },
  rating: {
    value: [[4.1, 100], [70, 20, 0, 0, 10]],
  },
  fakespot: {
    value: ["C", brand.fakespot],
  },
  price: {
    value: 900,
    sale: 500,
  },
  pickedBy: {
    value: ["public", "websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  sturdy: {
    value: false,
    rating: 5,
    // notes: () => <div>List materials?</div>
  },
  app: {
    value: false,
  },
  countries: {
    value: ["US"]
  },
  // bump: 0,
  easyLube: {
    value: false,
  },
  amazon: {
    value: true
  },

  // warranty: from brands
  pros: [
    {value: "", rating: 0, notes: () => <div></div>}
  ],
  cons: [
    {value: "", rating: 0, notes: () => <div></div>}
  ],
}
export default info