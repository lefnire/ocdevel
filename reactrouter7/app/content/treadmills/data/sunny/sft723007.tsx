import type {Product} from "../types";
import brand from './brand'
import dayjs from 'dayjs'

const links = {
  amazon: {
    US: (
      dayjs().isAfter("2025-04-01")
        ? "https://amzn.to/3Y5ywwM"
        : "https://www.amazon.com/dp/B0CBD38VMM?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.M5D1TRKXQ8SF&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.M5D1TRKXQ8SF_1743301085196",
    ),
    CA: "https://amzn.to/4iK1Wc1"
  },
  brand: {
    US: "https://sunnyhealthfitness.com/collections/under-desk-treadpad-treadmills/products/smart-trekpad-treadmill-with-arm-exerciser-sf-t723007"
  }
}
const info: Product = {
  model: {
    value: "TreadPad",
    // notes: () => <div></div>
  },
  key: `${brand.key}_sft723007`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [49.6, 25.4, 50.4], // "D x "W x "H
  },
  weight: {
    value: 61.7,
  },
  maxWeight: {
    value: 245,
  },
  maxSpeed: {
    value: 3.7,
  },
  horsePower: {
    value: 1.5,
  },
  age: {
    value: "2023-07-07",
  },
  rating: {
    value: [[4.0, 876], [59,15,7,6,13]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 500,
    sale: 400,
  },
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    // websites: [{value: 1}],
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: false,
    rating: 3,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 6,
  },
  material: {value: "Alloy Steel, Plastic"},
}
export default info