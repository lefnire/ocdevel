import type {Product} from "../types";
import brand from './brand'

const info: Product = {
  model: "TM008",
  key: `${brand.key}_tm008`,
  links: {
    amazon: "https://amzn.to/4hzpqzs",
    brand: "https://bifanuo.com/product/walking-pad-under-desk-treadmill-treadmills-for-home-office-portable-treadmill-walking-pad-treadmill-under-desk-with-remote-control-led-display-ideal-for-fitness-enthusiasts-2/",
    // amazonPause: "brand",
  },
  brand,
  // description: "",
  dimensions: {
    value: [46.2, 20.3, 4.3], // 47.6"D x 23.6"W x 8.7"H
  },
  weight: {
    value: 40,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.25,
  },
  age: {
    value: "2023-10-09",
  },
  rating: {
    value: [[4.3, 1271], [70, 14, 5, 3, 8]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 100,
    sale: 90,
  },
  pickedBy: {
    value: ["public", "websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  sturdy: {
    value: false,
    // notes: () => <div>Iron</div>
  },
  app: {
    value: false,
  },
  countries: {
    value: ["US", "CA", "UK"]
  },
  // bump: 0,
  easyLube: {
    value: false,
  },
  amazon: {
    value: true
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