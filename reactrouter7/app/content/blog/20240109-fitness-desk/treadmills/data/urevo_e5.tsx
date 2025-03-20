import type {Product} from "../types"
import {budgetNote} from '../brands'

const info: Product = {
  make: "urevo",
  model: "E5",
  description: "This has the most hardware improvements over the below. Eg, improved motor, and vents to dissipate heat, and doesn't have an incline. I don't know why they removed the incline after E3... real bummer. So I recommend propping the head on some yoga blocks or a 2x4.",
  link: "",

  dimensions: {
    value: [50, 20.9, 4.72], // 50"D x 20.9"W x 4.72"H
    rating: 6,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 2.25,
    rating: 6,
  },
  age: {
    value: "", // TODO: Age not specified in the data
    rating: 6,
    notes: () => <div>Newer model with hardware improvements over previous versions.</div>
  },
  rating: {
    value: [[4.4, 0], [70, 16, 6, 4, 4]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 7,
    notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", ""], // Fakespot B for the product
    rating: 7,
    notes: () => <div>Fakespot B rating indicates generally reliable reviews.</div>
  },
  price: {
    value: 200,
    notes: () => <div>{budgetNote}</div>
  },
  pickedBy: {
    value: ["me", "public"],
    rating: 8,
    flag: "green",
  },
  incline: {
    value: 0,
    rating: 2,
    flag: "red",
    notes: () => <div>No incline functionality. Recommendation is to prop the head on yoga blocks or a 2x4.</div>
  },
  shock: {
    value: true,
    rating: 7,
    flag: "green",
    notes: () => <div>Has shock absorption for better knee health.</div>
  },
  quiet: {
    value: false,
    rating: 3,
    flag: "yellow",
    notes: () => <div>Described as loud in the data.</div>
  },
  sturdy: {
    value: true,
    rating: 7,
  },
  app: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  easyLube: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  amazon: {
    value: true,
    rating: 8,
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