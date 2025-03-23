import type {Product} from "../types"
import {budgetNote} from '../utils'
import brand from './brand'

const info: Product = {
  brand,
  model: "E4",
  key: `${brand.key}_e4`,
  description: "Motor improvement over E3 (which had a lot of overheating complaints); but removed incline. E5 is upgrade over this one, so if you don't want E3's incline, just get E5.",
  links: {
    // amazon: "https://amzn.to/3xxWWV9",
    amazon: "https://www.amazon.com/dp/B0CLH1MNR7?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.NRRCZN113BGN&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.NRRCZN113BGN_1742362488415"
  },

  dimensions: {
    value: [47.5, 18.9, 4.4], // TODO what was: 50"D x 20.9"W x 4.72"H
  },
  weight: {
    value: 42.3,
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
    value: "2023-09-12",
  },
  rating: {
    value: [[4.3, 1175], [66, 19, 4, 3, 8]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
  },
  fakespot: {
    value: ["B", brand.fakespot], // Fakespot B for the product
  },
  price: {
    value: 200,
    sale: 170,
    note: () => <div>{budgetNote}</div>
  },
  pickedBy: {
    value: [], // Not specifically picked by anyone according to the data
  },
  incline: {
    value: 0,
    notes: () => <div>No incline functionality, which is a downgrade from E3.</div>
  },
  shock: {
    value: true,
    notes: () => <div>8-point silicone</div>
  },
  decibels: {
    // rating: 45,
  },
  sturdy: {
    value: false,
    rating: 3,
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