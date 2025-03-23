import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "Unsit",
  key: `${brand.key}_unsit`,
  description: "Considered on the internet the highest quality underdesk treadmill, often over Lifespan. Which has me stumped, because so many of the specs seem better in the Lifespan models. I personally would prefer Lifespan based on what I've seen.",
  links: {
    brand: {
      US: "https://www.imovr.com/products/unsit-desk-treadmill",
      CA: "https://www.imovr.com/products/unsit-desk-treadmill",
    },
    amazon: {}
  },

  dimensions: {
    value: [56, 39, 5], // 39″ wide × 56″ long, height not specified
    notes: () => <div>Very wide at 39 inches, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 162,
  },
  maxWeight: {
    value: 300,
    // notes: () => <div>Good max weight capacity (300lbs), though less than LifeSpan models.</div>
  },
  maxSpeed: {
    value: 2,
    notes: () => <div>Very low max speed (2mph) compared to most competitors, which typically offer 4mph or more.</div>
  },
  horsePower: {
    value: 2, // Assuming 2.5+ based on premium positioning
    notes: () => <div>Wildly low for such a high-end machine</div>
  },
  age: {
  },
  rating: {
    value: [[5, 4], [1, 0, 0, 0, 0]], // TODO: Rating not specified in the data
  },
  fakespot: {
    value: ["A", "A"], // Not specified in the data
  },
  price: {
    value: 2500,
    notes: () => <div>Extremely high price point, even higher than premium LifeSpan models.</div>
  },
  pickedBy: {
    value: ["public"],
    notes: () => <div>Considered on the internet the highest quality underdesk treadmill, often over Lifespan. I'm is stumped by this, as the specs seem better in the Lifespan models.</div>
  },
  incline: {
    value: 0,
  },
  shock: {
    value: false,
    // notes: () => <div>Likely has good shock absorption given the premium positioning and price point.</div>
  },
  decibels: {
    value: 42.9,
  },
  sturdy: {
    value: true,
    rating: 10,
    notes: () => <div>I've not tested it, but those who have swear by its invincibility. I don't doubt this. I just don't like it's value.</div>
  },
  app: {
    value: true,
  },
  easyLube: {
    value: false,
  },
  amazon: {
    value: false,
  },
  bump: -5,

  pros: [
    {
      value: "Highest quality reputation",
      rating: 8,
      
      notes: () => <div>Considered on the internet the highest quality underdesk treadmill, often over Lifespan.</div>
    }
  ],
  
  cons: [
    {
      value: "Wide, heavy",
      rating: 3,
      
      notes: () => <div>Very wide at 39 inches and described as heavy, which may make it difficult to fit in some spaces or move around.</div>
    },
    {
      value: "Expensive",
      rating: 1,
      
      notes: () => <div>At $2500, it's significantly more expensive than most competitors, including premium LifeSpan models.</div>
    },
    {
      value: "Slow",
      rating: 2,
      
      notes: () => <div>Max speed of only 2mph is very low compared to most competitors, which typically offer 4mph or more.</div>
    }
  ],
}
export default info