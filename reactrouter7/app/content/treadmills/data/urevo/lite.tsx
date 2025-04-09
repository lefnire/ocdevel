import type {Product} from "../../types"
import {budgetNote} from '../utils'
import brand from './brand'
import {expires} from "~/components/date-utils";

const info: Product = {
  brand,
  model: {
    value: "Lite",
    notes: () => <div>An older model, but a popular buy. Likely since it's so cheap.</div>
  },
  key: `${brand.key}_lite`,
  links: {
    amazon: {
      US: expires(
        "https://www.amazon.com/dp/B0BVQMSVM1?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.34VHC2IE2U2QY&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.34VHC2IE2U2QY_1744058300862",
        "2025-05-11",
        "https://amzn.to/42xYL1s",
      ),
      CA: "https://amzn.to/43Lgtji"
    },
    brand: {
      US: "https://shareasale.com/r.cfm?b=2635321&u=4069700&m=159466&urllink=www%2Eurevo%2Ecom%2Fproducts%2Fspacewalk%2D1%2Dlite%2Dtreadmill&afftrack="
    }
  },

  dimensions: {
    value: [47.6, 20.9, 4.9],
  },
  weight: {
    value: 45,
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
    value: "2023-09-01",
  },
  rating: {
    value: [[4.2, 1200], [67,16,4,3,10]],
  },
  fakespot: {
    value: ["A", brand.fakespot], // Fakespot B for the product
  },
  price: {
    value: 250,
    sale: 100,
  },
  pickedBy: {
    me: -1,
    websites: [{value: 1}],
    trusted: []
  },
  incline: {
    value: 0,
  },
  shock: {
    value: true,
    rating: 3,
    notes: () => <div>8-point silicone</div>
  },
  decibels: {
    // rating: 45,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 8, // Not mentioned in the data
  },
  material: {
    value: "Alloy Steel"
  },
}
export default info