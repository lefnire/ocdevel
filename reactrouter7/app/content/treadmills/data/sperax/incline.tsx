import image from '~/assets/products/sperax_incline.png?w=100&h=100&format=avif&effort=max'
import type {CardIn, Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3RefLDx",
  },
  brand: {
  }
}

const info: Product = {
  model: {
    // value: "MotionEase Lite P1",
    value: "3 in 1 Incline",
    notes: () => <div>Newer version of the vibration pad, with incline</div>
  },
  key: `${brand.key}_incline`,
  links,
  brand,
  video: "https://www.youtube.com/watch?v=tWuuRPBEegM",
  // description: "",
  dimensions: {
    value: [44.29, 22.56, 3.74], // 47.6"D x 23.6"W x 8.7"H
  },
  weight: {
    value: 31,
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
    value: "2025-03-25",
  },
  rating: {
    value: [[4.3, 3361], [69, 16, 3, 2, 10]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 280,
    sale: 240,
  },
  pickedBy: {
    // me: 2,
    trusted: [{value: 3}],
    affiliate: [{value: 1}],
    websites: [
      {value: 2},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ],
  },
  incline: {
    value: 10,
    method: "manual"
  },
  shock: {
    value: true,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 2.5,
  },
  material: {
    value: "Acrylonitrile Butadiene Styrene (ABS)"
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

export const card: CardIn = {
  image,
  cardTitle: "Sperax Vibration Pad",
  notes: "Test the waters. 1-2 years life with proper care.",
}