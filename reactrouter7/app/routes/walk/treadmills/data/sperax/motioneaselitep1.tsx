import type {Product} from "../types";
import brand from './brand'

const info: Product = {
  model: "MotionEase Lite P1",
  key: `${brand.key}_motioneaselitep1`,
  links: {
    amazon: "https://amzn.to/4hud9w0",
    brand: "https://speraxsports.com/products/walking-pad-vibration-fat-flat",
    // TODO
    amazon_ca: "https://amzn.to/4hAEzAt",
    // amazonPause: "brand",
  },
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
    value: ["public", "websites"],
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  sturdy: {
    value: true,
    rating: 5,
    notes: () => <div>Metal, Acrylonitrile Butadiene Styrene (ABS)</div>
  },
  app: {
    value: true,
  },
  countries: {
    value: ["US", "CA"]
  },
  // bump: 0,
  easyLube: {
    value: false,
  },
  amazon: {
    value: true
  },
  decibels: {
    value: 45,
  },

  // warranty: from brands
  pros: [
    {
      value: "Vibration",
      rating: 0,
      notes: () => <div>I have no idea what this is all about, personally think it's a gimmick. I'll update here if I find there's something to it.</div>
    }
  ],
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info