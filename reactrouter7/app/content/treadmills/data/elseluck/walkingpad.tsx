import type {Product} from "../../types";
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
  model: {value: "Walking Pad"},
  key: `${brand.key}_walkingpad`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [47.6, 20.1, 4.6], // "D x "W x "H
  },
  weight: {
    value: 37.9,
  },
  maxWeight: {
    value: 265,
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
    value: [[4.1, 506], [65, 13, 7, 1, 14]],
  },
  fakespot: {
    value: ["C", brand.fakespot],
  },
  price: {
    value: 100,
  },
  pickedBy: {
    websites: [
      {value: 1},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ],
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
  app: {
    value: false,
  },
  easyLube: {
    value: 10,
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