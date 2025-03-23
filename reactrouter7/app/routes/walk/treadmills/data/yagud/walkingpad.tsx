import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/41VZf00",
    CA: "https://amzn.to/4hBez82",
  },
  brand: {},
}
const info: Product = {
  model: "Walking Pad",
  key: `${brand.key}_walkingpad`,
  description: "",
  seo: 3,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [45.8, 19.76, 4.13],
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
    value: "2024-10-10",
  },
  rating: {
    value: [[4.1, 4360], [64,15,6,4,11]],
  },
  fakespot: {
    value: ["C", brand.fakespot],
  },
  price: {
    value: 130,
    sale: 90,
  },
  pickedBy: {
    value: ["public", "websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
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
    value: true,
  },
  amazon: {
    value: true
  },
  material: {value: "Alloy steel"},

  // warranty: from brands
  // pros: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info