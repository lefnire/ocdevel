import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3XE75Kq"
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
  // description: "",
  dimensions: {
    value: [50, 16, 5], // "D x "W x "H
  },
  weight: {
    value: 42,
  },
  maxWeight: {
    value: 340,
  },
  maxSpeed: {
    value: 3.8,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-08-29",
  },
  rating: {
    value: [[4.4, 360], [72,15,4,2,7]],
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 300,
  },
  pickedBy: {
    trusted: [{label: "Affiliate Rebel", value: 1}]
  },
  incline: {
    value: 5,
    method: "manual"
  },
  shock: {
    value: false,
    rating: 0,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  app: {
    value: true,
  },
  bump: {},
  easyLube: {
    value: 10,
  },
  material: {

  },
}
export default info