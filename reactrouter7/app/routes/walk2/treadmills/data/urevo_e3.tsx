import type {Product} from "../types"
import {budgetNote} from '../brands'
const info: Product = {
  make: "urevo",
  model: "E3",
  description: "Only Spacewalk with in a incline; but people complain about the motor smelling burnt (I've seen less complaints about the motor actually going out). Urevo replies recommending only walking 30-45m at a time, then giving it a break. This aligns with the Pomodoro Technique, and I frankly recommend it for all budget treadmills. Just might be more important with this particular one.",
  link: "",

  dimensions: {
    value: [50, 20.9, 4.72], // 50"D x 20.9"W x 4.72"H
    rating: 6,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    
    notes: () => <div>Described as high weight in the data, but exact value not specified.</div>
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
    rating: 5,
  },
  rating: {
    value: [[4.4, 0], [70, 16, 6, 4, 4]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 7,
    notes: () => <div>Good distribution with majority 5-star ratings. Also mentioned separately: 5=68%, 4=16%, 3=6%, 2=4%, 1=6%</div>
  },
  fakespot: {
    value: ["B", ""], // Fakespot B for the product
    rating: 7,
    notes: () => <div>Fakespot B rating indicates generally reliable reviews.</div>
  },
  price: {
    value: 200,
    note: () => <div>{budgetNote}</div>
  },
  pickedBy: {
    value: [], // Not specifically picked by anyone according to the data
    rating: 0,
  },
  incline: {
    value: 3, // Exact value not specified, but it has incline
    rating: 8,
    
    notes: () => <div>Has incline functionality, which is important for knee health. Only Spacewalk model with incline.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  quiet: {
    value: false,
    rating: 3,
    
    notes: () => <div>Described as loud in the data.</div>
  },
  sturdy: {
    value: true,
    rating: 5,
  },
  app: {
    value: false, // Not mentioned in the data
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
      value: "Incline",
      rating: 8,
      notes: () => <div>Has incline functionality, which is important for knee health.</div>
    },
    {
      value: "On Amazon",
      rating: 7,
      notes: () => <div>Available on Amazon for easy purchasing and returns.</div>
    }
  ],
  
  cons: [
    {
      value: "Motor overheating",
      rating: 2,
      
      notes: () => <div>People complain about the motor smelling burnt. Urevo recommends only walking 30-45 minutes at a time, then giving it a break.</div>
    },
    {
      value: "Loud",
      rating: 4,
      notes: () => <div>Described as loud which may be an issue for meetings or calls.</div>
    }
  ],
}
export default info