import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4j2Jyvp",
    CA: "https://amzn.to/3XO6u91"
  },
  brand: {
    US: "https://airhot.com/collections/walkingpad/products/tm400-walking-pad"
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "TM400",
  },
  // Key for later lookup
  key: `${brand.key}_tm400`,
  links,
  brand,
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [45, 20, 4],
  },
  // Weight of the treadmill
  weight: {
    value: 45,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 265,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 3.7,
  },
  // Motor horsepower
  horsePower: {
    value: 2.5,
  },
  // When was it released
  age: {
    value: "2023-07-15",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.3, 1391], [69,13,6,3,9]],
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["B", brand.fakespot],
  },
  // Price
  price: {
    // Standard price
    value: 130,
  },
  // MCP: ignore this
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    websites: [{value: 2}], // @experiment
  },
  incline: {
    // Incline percentage
    value: 15,
    // Whether that incline is controller-based (auto), manual kickstands (manual), or built into it permanently (fixed)
    method: "manual"
  },
  shock: {
    // Does it have shock absorption advertised?
    value: true,
    // If so, how would you guesstimate it's rated (1-10)
    rating: 5,
    notes: () => <div>10-Point Silicone Absorbers</div>
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
    value: "Alloy Steel"
  },
}
export default info