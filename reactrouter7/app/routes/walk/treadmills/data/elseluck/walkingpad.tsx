import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4hAWpmP",
    CA: "https://amzn.to/4iw4jPP"
  },
  brand: {
  }
}
const info: Product = {
  model: "Walking Pad",
  key: `${brand.key}_walkingpad`,
  description: "",
  links,
  brand,
  seo: 2,
  // description: "",
  dimensions: {
    value: [47.6, 20.1, 4.6], // "D x "W x "H
  },
  weight: {
    value: 37.9,
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
    value: "2024-12-06",
  },
  rating: {
    value: [[4.1, 427], [64,13,8,2,13]],
  },
  fakespot: {
    value: ["C", brand.fakespot],
  },
  price: {
    value: 100,
  },
  pickedBy: {
    value: ["websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  sturdy: {
    value: false,
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
  },
  material: {
    value: "Plastic, Metal"
  },

  // // warranty: from brands
  // pros: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info