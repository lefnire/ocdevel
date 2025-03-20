import type {Product} from "../types"
import {budgetNote} from '../brands'

const info: Product = {
  make: "urevo",
  model: "E4",
  description: "Motor improvement over E3 (which had a lot of overheating complaints); but removed incline. E5 is upgrade over this one, so if you don't want E3's incline, just get E5.",
  link: "",

  dimensions: {
    value: [50, 20.9, 4.72], // 50"D x 20.9"W x 4.72"H
    rating: 6,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    flag: 'yellow',
    notes: () => <div>Described as high weight in the data, but exact value not specified.</div>
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 4,
    rating: 5,
    flag: 'yellow',
    notes: () => <div>Tagged as #speed:low in the data, but max speed is listed as 4mph which is standard.</div>
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
    notes: () => <div>Good distribution with majority 5-star ratings. Also mentioned separately: 5=69%, 4=15%, 3=6%, 2=3%, 1=7%</div>
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
    value: 0,
    rating: 2,
    flag: "red",
    notes: () => <div>No incline functionality, which is a downgrade from E3.</div>
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
    rating: 6,
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
      value: "On Amazon",
      rating: 7,
      notes: () => <div>Available on Amazon for easy purchasing and returns.</div>
    },
    {
      value: "Improved motor heat",
      rating: 8,
      notes: () => <div>Motor improvement over E3 which had overheating complaints.</div>
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