import type {CardIn, Product} from '../types'
import image from '~/assets/products/urevo_strol2spro.png?w=100&h=100&format=avif&effort=max'
import brand from './brand'
const info: Product = {
  brand,
  key: `${brand.key}_strol2spro`,
  model: {
    value: "Strol 2S Pro",
    notes: () => <div>
      If you also want to run (use this away from the walking desk), get this. You flip up the handles and it enables high speed; flip down to put it under your desk (low speed). This will generally be higher quality and last longer than a walking-only pad, due to motor requirements for high speed.
    </div>
  },
  video: "https://youtu.be/sj7hzsez3Z8?si=9OR-SeIKFC2c4Fv2&t=68",
  links: {
    amazon: {
      US: "https://www.amazon.com/dp/B0DCG2GBVG?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.30AMLNVI2M157&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.30AMLNVI2M157_1741381357876"
    },
    brand: {
      US: "https://shareasale.com/r.cfm?b=2635321&u=4069700&m=159466&urllink=www%2Eurevo%2Ecom%2Fcollections%2Funder%2Ddesk%2Dtreadmill%2Fproducts%2Furevo%2Dstrol%2D2s%2Dpro%2Dtreadmill&afftrack=",
    }
  },
  price: {
    value: 800,
    sale: 450,
  },
  dimensions: {
    value: [54.72, 25.37, 6.67],
    notes: () => <div>Depth and height are good, but side-rails add some width (necessary for walking pads that allow speeds over 4mph). So measure the space between your desk legs.</div>
  },
  weight: {
    value: 86,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 7.6,
    notes: () => <div>One of the few quality walking pads which allows running.</div>
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
  easyLube: {
    rating: 3,
  }
}
export default info
export const card: CardIn = {
  image,
  notes: "Sturdy, quiet, can run. Use Amazon coupon."
}