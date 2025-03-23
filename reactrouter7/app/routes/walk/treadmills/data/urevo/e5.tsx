import type {Product} from "../types"
import {budgetNote} from '../utils'
import brand from './brand'

const info: Product = {
  brand,
  model: "E5",
  key: `${brand.key}_e5`,
  description: "This has the most hardware improvements over the below. Eg, improved motor, and vents to dissipate heat, and doesn't have an incline. I don't know why they removed the incline after E3... real bummer. So I recommend propping the head on some yoga blocks or a 2x4.",
  links: {amazon: "https://amzn.to/4jsteob"},

  dimensions: {
    value: [48.9, 19, 4.5], // 50"D x 20.9"W x 4.72"H
  },
  weight: {
    value: 37.5, // TODO: Weight not specified in the data
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
    value: "2024-08-27",
    notes: () => <div>Newer model with hardware improvements over previous E* versions.</div>
  },
  rating: {
    value: [[4.3, 1175], [66, 19, 4, 3, 8]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", brand.fakespot], // Fakespot B for the product
  },
  price: {
    value: 190,
    sale: 170,
    notes: () => <div>{budgetNote}</div>
  },
  pickedBy: {
    value: ["public"],
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
  sturdy: {
    value: false,
    rating: 4,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: false, // Not mentioned in the data
  },
  amazon: {
    value: true,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

  pros: [
    {
      value: "Better tech",
      rating: 8,
      notes: () => <div>Improved motor with vents to dissipate heat.</div>
    },
    {
      value: "Shock absorption",
      rating: 7,
      notes: () => <div>Has shock absorption for better knee health.</div>
    },
    {
      value: "Affordable",
      rating: 8,
      notes: () => <div>Good value at $200.</div>
    }
  ],
  
  cons: [
    {
      value: "No incline",
      rating: 3,
      notes: () => <div>Lacks incline functionality which is important for knee health.</div>
    },
    {
      value: "Loud",
      rating: 4,
      notes: () => <div>Described as loud which may be an issue for meetings or calls.</div>
    }
  ],
}
export default info