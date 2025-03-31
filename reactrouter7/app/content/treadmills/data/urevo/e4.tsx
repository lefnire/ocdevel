import type {Product} from "../types"
import {budgetNote} from '../utils'
import brand from './brand'

const info: Product = {
  brand,
  model: {
    value: "E4",
    notes: () => <div>
      <p>Motor improvement over E3 (which had a lot of overheating complaints); but removed incline. E5 is upgrade over this one, so if you don't want E3's incline, just get E5.</p>
      <p>{budgetNote}</p>
      <h5>Pro: Improved motor heat</h5>
      <div>Motor improvement over E3 which had overheating complaints.</div>
      <h5>Pro: Shock absorption</h5>
      <div>Has shock absorption for better knee health.</div>
      <h5>Pro: Affordable</h5>
      <div>Good value at $200.</div>
      <h5>Con: No incline</h5>
      <div>Lacks incline functionality which is important for knee health.</div>
      <h5>Loud</h5>
      <div>I found it too loud for comfort in meetings.</div>
    </div>

  },
  key: `${brand.key}_e4`,
  links: {
    amazon: {
      // US: "https://amzn.to/3xxWWV9",
      US: "https://www.amazon.com/dp/B0CLH1MNR7?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.NRRCZN113BGN&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.NRRCZN113BGN_1742362488415",
      CA: "https://amzn.to/4kN780p"
    },
    brand: {}
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
  },
  pickedBy: {
    me: -1,
    websites: [],
    trusted: []
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
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 5, // Not mentioned in the data
  },


}
export default info