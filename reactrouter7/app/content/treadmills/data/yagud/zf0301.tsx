import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/41VZf00",
    CA: "https://amzn.to/4hBez82",
  },
  brand: {},
}
const info: Product = {
  model: {value: "ZF0301"},
  key: `${brand.key}_zf0301`,
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
    value: "2024-11-10",
  },
  rating: {
    value: [[4.3, 188], [68,17,5,2,8]],
  },
  fakespot: {
    value: ["C", brand.fakespot],
  },
  price: {
    value: 130,
    sale: 100,
  },
  pickedBy: {
    websites: [
      {value: 2},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ]
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
  app: {
    value: false,
  },
  easyLube: {
    value: 10,
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