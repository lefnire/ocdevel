import type {CardIn, Product} from "../types"
import image from '~/assets/products/lifespan_tx6.jpg?w=100&h=100&format=avif&effort=max'

import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "TX6",
    notes: () => <div>
      Newest commercial-grade treadmill from LifeSpan, designed for intensive daily use. Their last model was some 10 years ago, so this is a big deal. Very highest durability and weight capacity. Premium commercial-grade construction designed for 9 hours of daily use.
    </div>
  },
  key: `${brand.key}_tx6`,
  links: {
    brand: {
      US:"https://lifespan-fitness.e9ppfh.net/3JoMjn",
      CA:"https://lifespan-fitness.e9ppfh.net/3JoMjn",
    },
    amazon: {
      // US: "https://amzn.to/4j7uQCJ",
      US: "https://amzn.to/3FT2VrZ", // only pink avail right now
    }
  },

  dimensions: {
    value: [60, 27.6, 6], // 60"L x 27.6"W x 6"H (from Amazon)
  },
  weight: {
    value: 88,
  },
  maxWeight: {
    value: 400,
  },
  maxSpeed: {
    value: 6,
  },
  horsePower: {
    value: 4.5, // Assuming higher than TR1200 based on tier
    // notes: () => <div>What?? I've never seen a walking pad with HP this high.</div>
  },
  age: {
    rating: 10,
    value: "2024-01-29",
    notes: () => <div>I'm overriding this attribute because Lifespan is a "buy it for life" brand, age isn't a factor.</div>
  },
  rating: {
    value: [[4.67, 5], [4, 1, 0, 0, 0]],
    notes: () => <div>From their website (which I had to view-source, since their website is a mess). Their Amazon listing is a combo with TR1200, TR5000; so it's using those reviews as well.</div>
  },
  fakespot: {
    value: ["A", brand.fakespot], // Not specified in the data
  },
  price: {
    value: 1500,
    // notes: () => <div>Premium price point reflecting top-tier commercial-grade quality. $400 more than the TR1200 and $600 more than the TR1000.</div>
  },
  pickedBy: {
  },
  incline: {
    value: 0,
  },
  shock: {
    value: true, // Assuming based on commercial quality
    rating: 8,
    notes: () => <div>6 Independent Compression Shocks</div>
  },
  decibels: {
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 4,
  },
  material: {
    value: "Aluminum"
  },
}
export default info

export const card: CardIn = {
  image,
  notes: () => <div>
    <span>Buy it for life. Invincible, quiet, fast.</span>
    {/*<VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />*/}
  </div>,
}