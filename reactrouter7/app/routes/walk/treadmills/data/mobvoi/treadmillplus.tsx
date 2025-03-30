import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    EU: "https://amzn.to/3E0iopu"
  },
  brand: {
    EU: "https://www.mobvoi.com/eu/products/mobvoihomewalkingtreadmillplus"
  }
}
const info: Product = {
  model: {
    value: "Treadmill Plus",
    // notes: () => <div></div>
    notes: () => <div>This kept coming up in my research for EU options. I could only find the "Treadmill" and "Treadmill Plus" options; where in US there are newer models (Treadmill Fit & Treadmill Edge). I'm not sure the difference between the four; the specs look identical, and they don't describe differences on the website. So you may want to do some digging. But if you're EU, this is the newest Mobvoi I could find (2024-05-30).</div>
  },
  key: `${brand.key}_treadmillplus`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [48.4, 20.5, 5.1], // "D x "W x "H
  },
  weight: {
    value: 42.5,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 3.8,
  },
  horsePower: {
    value: 2.25,
  },
  age: {
    value: "2024-04-10",
  },
  rating: {
    value: [[4.2, 111], [62,19,6,3,10]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 150, // estimate
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
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 3,
  },
  material: {value: "Carbon Steel"},
}
export default info