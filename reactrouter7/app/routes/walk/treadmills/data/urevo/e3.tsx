import type {Product} from "../types"
import {budgetNote} from '../utils'
import brand from './brand'
const info: Product = {
  brand,
  model: "E3",
  key: `${brand.key}_e3`,
  description: "Only Spacewalk with in a incline; but people complain about the motor smelling burnt (I've seen less complaints about the motor actually going out). Urevo replies recommending only walking 30-45m at a time, then giving it a break. This aligns with the Pomodoro Technique, and I frankly recommend it for all budget treadmills. Just might be more important with this particular one.",
  links: {
    amazon: {
      US: "https://amzn.to/3zxMhLt",
      UK: "https://amzn.to/41SKgUv"
    },
    brand: {}
  },

  dimensions: {
    value: [50, 20.9, 4.72], // 50"D x 20.9"W x 4.72"H
  },
  weight: {
    value: 46,
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
    value: "2023-08-28",
  },
  rating: {
    value: [[4.3, 1775], [66, 19, 4, 3, 8]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
  },
  fakespot: {
    value: ["B", brand.fakespot],
    rating: 7,
  },
  price: {
    value: 270,
    notes: () => <div>{budgetNote}</div>
  },
  pickedBy: {
    me: -1,
    websites: [],
    trusted: []
  },
  incline: {
    value: 3, // Exact value not specified, but it has incline
    method: "manual",
    notes: () => <div>Kick-stands, so it's on or off. 3%</div>
  },
  shock: {
    value: true, // Not mentioned in the data
    rating: 5,
    notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    rating: 3,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 7, // Not mentioned in the data
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