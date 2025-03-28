import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3QR0qbT",
    CA: "https://amzn.to/4hQIglE",
  },
  brand: {
  }
}
const info: Product = {
  model: "06 Normal",
  key: `${brand.key}_06normal`,
  description: "",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [45, 20.59, 4.5], // "D x "W x "H
  },
  weight: {
    value: 41,
  },
  maxWeight: {
    value: 300,
  },
  maxSpeed: {
    value: 3.8,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-02-01",
  },
  rating: {
    value: [[4.2, 2688], [66,17,5,3,9]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 160,
    sale: 130,
  },
  pickedBy: {
    value: ["websites"],
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: false,
    rating: 4,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  sturdy: {
    value: false,
    rating: 4,
    // notes: () => <div>List materials?</div>
  },
  app: {
    value: true,
  },
  bump: {},
  easyLube: {
    value: 10,
  },
  amazon: {
    value: true
    // <div>Buyer peace-of-mind, can't get Asurion extended warranty (which I recommend with treadmills)</div>
  },
  material: {
    value: "Alloy Steel"
  },
}
export default info