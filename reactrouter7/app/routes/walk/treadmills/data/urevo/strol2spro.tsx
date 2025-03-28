import type {Product} from '../types'
import brand from './brand'
const info: Product = {
  brand,
  model: "Strol 2S Pro",
  key: `${brand.key}_strol2spro`,
  description: "If you also want to run (use this away from the walking desk), get this. You flip up the handles and it enables high speed; flip down to put it under your desk (low speed). This will generally be higher quality and last longer than a walking-only pad, due to motor requirements for high speed.",
  links: {
    amazon: {
      US: "https://www.amazon.com/dp/B0DCG2GBVG?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.30AMLNVI2M157&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.30AMLNVI2M157_1741381357876"
    },
    brand: {}
  },

  dimensions: {
    value: [54.72, 25.37, 6.67],
    notes: () => <div>Depth and height are good, but side-rails add some width (a necessary walking pads that allow speeds over 4mph). So measure the space between your desk legs.</div>
  },
  weight: {
    value: 86,
    notes: () => <div>Woa mama is it heavy! Much of it is in the rails.</div>
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 7.6,
    notes: () => <div>One of thew quality walking pads which allows running.</div>
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-08-07",
  },
  rating: {
    value: [[4.3, 774], [70, 14, 4, 3, 9]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 800,
    sale: 400,
  },
  pickedBy: {
    me: 3,
    trusted: [{value: 1}],
    websites: [{value: 1}]
  },
  incline: {
    value: 9,
    method: "auto"
  },
  shock: {
    value: true,
    notes: () => <div>8-Point silicone</div>
  },
  decibels: {
  },
  app: {
    value: true,
  },
}
export default info