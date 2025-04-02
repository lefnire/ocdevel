import type {Product} from "../types"
import {budgetNote} from '../utils'
import brand from './brand'

const info: Product = {
  brand,
  model: {
    value: "E5",
    notes: () => <div>
      <p>This has the most hardware improvements over the below. Eg, improved motor, and vents to dissipate heat, and doesn't have an incline. I don't know why they removed the incline after E3... real bummer. So I recommend propping the head on some yoga blocks or a 2x4.</p>
      <p>{budgetNote}</p>
      <h5>Better tech</h5>
      <div>Improved motor with vents to dissipate heat.</div>
      <h5>Shock absorption</h5>
      <div>Has shock absorption for better knee health.</div>
      <h5>Affordable</h5>
      <div>Good value at $200.</div>
      <h5>No incline</h5>
      <div>Lacks incline functionality which is important for knee health.</div>
      <h5>Loud</h5>
      <div>Described as loud which may be an issue for meetings or calls.</div>
    </div>
  },
  key: `${brand.key}_e5`,
  links: {
    amazon: {
      US: "https://amzn.to/4jsteob",
    },
    brand: {}
  },

  dimensions: {
    value: [48.9, 19, 4.5],
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
    value: 2,
  },
  age: {
    value: "2024-08-27",
    notes: () => <div>Newer model with hardware improvements over previous E* versions.</div>
  },
  rating: {
    value: [[4.3, 1784], [65, 19, 5, 3, 8]],
    notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", brand.fakespot], // Fakespot B for the product
  },
  price: {
    value: 190,
    sale: 170,
  },
  pickedBy: {
    // me: 0,
    websites: [],
    trusted: []
  },
  incline: {
    value: 0,
    notes: () => <div>No incline. Since this is the newest E model, it's recommend over E3 which *has* incline. So prop the head on yoga blocks or a 2x4.</div>
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>8-point silicone</div>
  },
  decibels: {
    rating: 3,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 5, // Not mentioned in the data
  }, // Added comma
  material: {
    value: "Alloy Steel" // From Amazon specs
  },
}
export default info