import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4jrzThO"
  },
  brand: {
    US: "https://revomadic.com/products/best-walking-pad-treadmill"
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "Revo",
  },
  // Key for later lookup
  key: `${brand.key}_revo`,
  links,
  brand,
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [46.29, 19.96, 4.33],
  },
  // Weight of the treadmill
  weight: {
    value: 40.89,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 265,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 4,
  },
  // Motor horsepower
  horsePower: {
    value: 2.25,
  },
  // When was it released
  age: {
    value: "2024-08-15",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.4,318],[77,8,3,2,10]],
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["C", brand.fakespot],
  },
  // Price
  price: {
    // Standard price
    value: 230,
    // Sale price, if on sale
    // sale: 0,
  },
  // MCP: ignore this
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    websites: [{value: 1}],
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
    rating: 0,
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
    value: 10,
  },
  material: {
    // Material listed
    value: "Iron, Rubber, Acrylonitrile Butadiene Styrene (ABS)\n"
  },
}
export default info