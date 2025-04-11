import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3RJseiL"
  },
  brand: {
    // US: ""
  }
}
const info: Product = {
  model: {
    // Name of the model / product
    value: "Apollo 11 Ultra",
    notes: () => <div>
      <p>I've got my eye on this. Only started popping up recently, and boasts some good specs. But currently the reviews are slim, and the FakeSpot poor, so I'll watch this and update as more unfolds.</p>
    </div>
  },
  // Key for later lookup
  key: `${brand.key}_apollo11`,
  links,
  brand,
  // Dimensions in inches, D x W x H
  dimensions: {
    value: [47.8, 24.4, 9.3],
  },
  // Weight of the treadmill
  weight: {
    value: 86,
  },
  // Maximum human weight capacity
  maxWeight: {
    value: 350,
  },
  // Maximum speed it can go to
  maxSpeed: {
    value: 5,
  },
  // Motor horsepower
  horsePower: {
    value: 3,
  },
  // When was it released
  age: {
    value: "2024-11-25",
  },
  // Rating of this product. It looks like:
  // [[ star rating, number of ratings ], [ 5-star percentage, 4-star, 3-star, 2-star, 1-star ]]
  rating: {
    value: [[4.9, 34], [98, 0, 0, 0, 2]],
  },
  // Fakespot score (MCP - ignore this)
  fakespot: {
    value: ["F", brand.fakespot],
  },
  // Price
  price: {
    // Standard price
    value: 600,
    // Sale price, if on sale
    sale: 500,
  },
  // MCP: ignore this
  pickedBy: {
    // me: 1,
    affiliate: [{value: 1.5}],
    // trusted: [{value: 1}],
    // websites: [{value: 1}],
  },
  incline: {
    // Incline percentage
    value: 12,
    // Whether that incline is controller-based (auto), manual kickstands (manual), or built into it permanently (fixed)
    method: "auto"
  },
  shock: {
    // Does it have shock absorption advertised?
    value: true,
    // If so, how would you guesstimate it's rated (1-10)
    rating: 7,
    notes: () => <div>Vital+ Shock. Beefy silicones between the pad & frame.</div>
  },
  decibels: {
    value: 40,
  },
  app: {
    // Does it connect to an app?
    value: true,
  },
  easyLube: {
    // Is it easy to lubricate? Judge by the photo, the side-rails must be level with the deck.
    // 10 if the deck is level; 1 if they're really large and would require loosening the belt
    // just to access it
    value: 1,
  },
  material: {
    // Material listed
    value: "Alloy Steel"
  },
}
export default info