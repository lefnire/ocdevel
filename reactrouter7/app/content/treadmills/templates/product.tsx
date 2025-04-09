import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    // US: ""
  },
  brand: {
    // US: ""
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "Product",
  },
  // Key for later lookup
  key: `${brand.key}_model`,
  links,
  brand,
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [47.6, 23.6, 8.7],
  },
  // Weight of the treadmill
  weight: {
    value: 100,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 265,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 3.5,
  },
  // Motor horsepower
  horsePower: {
    value: 2.5,
  },
  // When was it released
  age: {
    value: "2024-01-01",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.1, 100], [70, 20, 0, 0, 10]],
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["C", brand.fakespot],
  },
  // Price
  price: {
    // Standard price
    value: 900,
    // Sale price, if on sale
    sale: 500,
  },
  // MCP: ignore this
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    // websites: [{value: 1}],
  },
  incline: {
    // Incline percentage
    value: 0,
    // Whether that incline is controller-based (auto), manual kickstands (manual), or built into it permanently (fixed)
    // method: "auto"
  },
  shock: {
    // Does it have shock absorption advertised?
    value: false,
    // If so, how would you guesstimate it's rated (1-10)
    rating: 5,
  },
  decibels: {
    // value: 50,
  },
  app: {
    // Does it connect to an app?
    value: false,
  },
  easyLube: {
    // Is it easy to lubricate? Judge by the photo, the side-rails must be level with the deck.
    // 10 if the deck is level; 1 if they're really large and would require loosening the belt
    // just to access it
    value: 5,
  },
  material: {
    // Material listed
    // value: "Alloy Steel"
  },
}
export default info