import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4hud9w0",
    CA: "https://amzn.to/4ivdDU4",
  },
  brand: {
    US: "https://speraxsports.com/products/walking-pad-vibration-fat-flat",
    CA: "https://speraxsports.com/products/walking-pad-vibration-fat-flat",
    UK: "https://speraxsports.com/products/walking-pad-vibration-fat-flat",
  }
}

const info: Product = {
  model: "MotionEase Lite P1",
  key: `${brand.key}_motioneaselitep1`,
  description: "No clue what the vibration this is all about, personally think it's a gimmick. I'll update here if I find there's something to it.",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [39, 21, 3.5], // 47.6"D x 23.6"W x 8.7"H
  },
  weight: {
    value: 22,
  },
  maxWeight: {
    value: 350,
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
    value: [[4.2, 3025], [68, 15, 4, 2, 11]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 200,
    sale: 160,
  },
  pickedBy: {
    me: 2,
    trusted: [{value: 2}],
    websites: [
      {value: 2},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 5,
  },
  material: {
    value: "Metal, Acrylonitrile Butadiene Styrene (ABS)"
  },
  decibels: {
    value: 45,
  },

  // warranty: from brands
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info