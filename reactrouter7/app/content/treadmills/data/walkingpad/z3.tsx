import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
  },
  brand: {
    US: "https://www.walkingpad.com/products/walkingpad-z3-just-walk-foldable-treadmill"
  }
}
const info: Product = {
  model: {
    value: "Z3",
    notes: brand.notes,
  },
  key: `${brand.key}_z3`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [57.9, 22.7, 6.2], // "D x "W x "H
  },
  weight: {
    value: 76,
  },
  maxWeight: {
    value: 242,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 1.0,
    notes: () => <div>Yikes. That alone tells me "no".</div>
  },
  age: {
    value: "2025-01-01",
    notes: () => <div>Unknown, but due to 0 reviews and no Amazon yet, I'm assuming it's brand new.</div>
  },
  rating: {
    value: [[4.0, 0], [0, 0, 0, 0, 0]],
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 700,
  },
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    websites: [{value: 1}],
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
    value: true,
  },
  easyLube: {
    value: 10,
  },
  material: {},
}
export default info