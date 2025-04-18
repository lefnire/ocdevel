import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4lAsC0D",
    CA: "https://amzn.to/4jCXBr8",
  },
  brand: {
    // US: ""
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "TP2",
  },
  // Key for later lookup
  key: `${brand.key}_tp2`,
  links,
  brand,
  video: "https://www.youtube.com/watch?v=aZ1k8SA39Lg",
  // Price
  price: {
    // Standard price
    value: 300,
    // Sale price, if on sale
    sale: 270,
    coupon: true,
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["B", brand.fakespot],
  },
  easyLube: {
    // Is it easy to lubricate? Judge by the photo, the side-rails must be level with the deck.
    // 10 if the deck is level; 1 if they're really large and would require loosening the belt
    // just to access it
    value: 10,
  },
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [51.2, 22, 5.2],
  },
  material: {
    // Material listed
    value: "Alloy Steel"
  },
  // Weight of the treadmill
  weight: {
    value: 50,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 265,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 7.5,
  },
  // Motor horsepower
  horsePower: {
    value: 2.5,
  },
  // When was it released
  age: {
    value: "2025-02-25",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.8, 645], [88,10,1,0,1]],
  },

  // MCP: ignore this
  pickedBy: {
    // me: 1,
    trusted: [{value: 1}],
    websites: [{value: 1}],
    affiliate: [{value: 1}]
  },
  incline: {
    // Incline percentage
    value: 7,
    // Whether that incline is controller-based (auto), manual kickstands (manual), or built into it permanently (fixed)
    method: "manual"
  },
  shock: {
    // Does it have shock absorption advertised?
    value: true,
    // If so, how would you guesstimate it's rated (1-10)
    rating: 5,
  },
  decibels: {
    value: 45,
    verified: false
  },
  app: {
    // Does it connect to an app?
    value: true,
  },

}
export default info