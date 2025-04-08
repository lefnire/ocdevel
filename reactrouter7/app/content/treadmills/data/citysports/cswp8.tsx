import type {Product} from "../types";
import brand from './brand'
import {expires} from "~/components/date-utils";

const link = expires(
  "https://www.amazon.com/dp/B0C2XHN42Y?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.1XD58GWGCXXF4&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.1XD58GWGCXXF4_1742863282855",
  "2025-05-01",
  "https://amzn.to/4ln4Dlv"
)
const links = {
  amazon: {
    US: link,
    CA: link,
    UK: link,
  },
  brand: {
  }
}
const info: Product = {
  model: {value: "CS-WP8"},
  key: `${brand.key}_cswp8`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [50.39, 22.83, 5.51], // "D x "W x "H
  },
  weight: {
    value: 50,
  },
  maxWeight: {
    value: 265,
    // value: 243, // 110 kg
  },
  maxSpeed: {
    value: 3.8,
  },
  horsePower: {
    // it's measured as 550 Watts. How the heck to I convert that?
    value: 2.5,
    // value: 0.74, // 550 Watts
  },
  age: {
    value: "2023-05-11",
  },
  rating: {
    value: [[4.3, 299], [67,17,5,4,7]],
  },
  fakespot: {
    value: ["D", brand.fakespot],
  },
  price: {
    value: 230,
  },
  pickedBy: {
    websites: [{value: 10}], // current Google trend
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: false,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 50,
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 5,
  },
  material: {
    value: "Alloy Steel"
  },

}
export default info