import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/42ImGKD",
    CA: "https://amzn.to/3GaU6tB",
  },
  brand: {
    // US: ""
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "P11-S",
  },
  // Key for later lookup
  key: `${brand.key}_p11s`,
  links,
  brand,
  // Price
  price: {
    // Standard price
    value: 220,
    // Sale price, if on sale
    sale: 187,
    // Does the Amazon listing have a coupon option? (simply checkmark to apply?)
    coupon: false
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
    value: [51.2, 22, 5.3],
  },
  material: {
    // Material listed
    value: "Alloy Steel"
  },
  // Weight of the treadmill
  weight: {
    value: 51.8,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 300,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 6.2,
  },
  // Motor horsepower
  horsePower: {
    value: 2.5,
  },
  // When was it released
  age: {
    value: "2024-09-27",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.5, 510], [73,16,4,2,5]],
  },

  // MCP: ignore this
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    websites: [{value: 2}],
  },
  incline: {
    // Incline percentage
    value: 10,
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