import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: ""
  },
  brand: {
    US: ""
  }
}
const info: Product = {
  model: "Product",
  key: `${brand.key}_model`,
  description: "",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [47.6, 23.6, 8.7], // "D x "W x "H
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
    // method: "auto"
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
  // bump: 0,
  easyLube: {
    value: 5,
  },
  amazon: {
    value: true
    // <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>
  },
  material: {

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