import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: ""
  },
  brand: {
    US: "https://lichico.com/products/basic-walkingpad",
    AU: "https://lichico.com.au/products/lichico-dk-38ab-2-walkingpad-aus",
  }
}
const info: Product = {
  model: "DK-38AB-2",
  key: `${brand.key}_dk38ab2`,
  description: "",
  seo: 3,
  links,
  brand,
  dimensions: {
    value: [47.2, 20, 4], // "D x "W x "H
  },
  weight: {
    value: 37.5,
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
    value: "2024-01-01",
  },
  rating: {
    value: [[4.2, 1673], [71,8,5,3,13]],
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 170,
    sale: 120,
  },
  pickedBy: {
    value: ["websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
  },
  decibels: {
    value: 30,
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
    value: 10,
  },
  amazon: {
    value: true
  },
  material: {
    value: "Alloy Steel"
  },

  // warranty: from brands
  // pros: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info