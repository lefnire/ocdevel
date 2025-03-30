import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3XyGqPa"
  },
  brand: {
    US: "https://www.walkingpad.com/products/walkingpad-c2-foldable-walking-machine",
    EU: "https://amzn.to/442i2cu"
  }
}
const info: Product = {
  model: {
    value: "C2",
    notes: brand.notes
  },
  key: `${brand.key}_c2`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [56.9, 20.4, 4.9], // "D x "W x "H
  },
  weight: {
    value: 55,
  },
  maxWeight: {
    value: 220,
  },
  maxSpeed: {
    value: 3.7,
  },
  horsePower: {
    value: 2.0,
  },
  age: {
    value: "2021-08-30",
  },
  rating: {
    value: [[4.0, 206], [61,14,5,4,16]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 500,
    sale: 400,
  },
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    // websites: [{value: 1}],
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: false,
    rating: 1,
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
  material: { value: "Aluminum" },
}
export default info