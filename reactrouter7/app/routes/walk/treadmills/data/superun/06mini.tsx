import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3QR0qbT"
  },
  brand: {
  }
}
const info: Product = {
  model: "06 Mini",
  key: `${brand.key}_06mini`,
  description: "Also on that link is 06 Normal and Pro. Upgrade if your budget allows",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [43, 20, 4], // "D x "W x "H
  },
  weight: {
    value: 40,
  },
  maxWeight: {
    value: 250,
  },
  maxSpeed: {
    value: 2.5,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2023-05-03",
  },
  rating: {
    value: [[4.2, 2688], [66,17,5,3,9]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 160,
    sale: 100,
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
    value: 40,
  },
  sturdy: {
    value: false,
    rating: 4,
    // notes: () => <div>List materials?</div>
  },
  app: {
    value: false,
  },
  // bump: 0,
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