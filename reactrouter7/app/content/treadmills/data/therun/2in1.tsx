import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3G33hMH",
    CA: "https://amzn.to/3Ygb8wT"
  },
  brand: {
    // US: ""
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "2 in 1",
  },
  // Key for later lookup
  key: `${brand.key}_2in1`,
  links,
  brand,
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [39, 22.8, 49],
  },
  // Weight of the treadmill
  weight: {
    value: 43.4,
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
    value: "2024-11-01",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.2, 2048], [68,14,5,3,10]],
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["A", brand.fakespot],
  },
  // Price
  price: {
    // Standard price
    value: 180,
    // Sale price, if on sale
    sale: 160,
  },
  // MCP: ignore this
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    websites: [{value: 1, label: "Amazon Top Sellers", url: "https://www.amazon.com/gp/bestsellers/sporting-goods/3407831/"}],
  },
  incline: {
    // Incline percentage
    value: 0,
    // Whether that incline is controller-based (auto), manual kickstands (manual), or built into it permanently (fixed)
    // method: "auto"
  },
  shock: {
    // Does it have shock absorption advertised?
    value: true,
    // If so, how would you guesstimate it's rated (1-10)
    rating: 3,
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