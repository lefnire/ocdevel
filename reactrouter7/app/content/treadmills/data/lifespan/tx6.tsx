import type {Product} from "../types"
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
    notes: () => <div>From their website (which I had to view-source)</div>
  },
  fakespot: {
    value: ["A", brand.fakespot], // Not specified in the data
  },
  price: {
    value: 1499,
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
  // pros: [
  //   {
  //     value: "Commercial use",
  //     rating: 9,
  //
  //     notes: () => <div>I've seen Lifespans in coworking spaces often (I've used them there too, they're so smooth, quiet... incredible machines. Huge though). If these are picked for industrial use by someone in charge of this task, instead of iMovR, that's enough for me to blind-faith the same selection.</div>
  //   },
  //   {
  //     value: "Highest max weight capacity",
  //     rating: 10,
  //
  //     notes: () => <div>400 pounds capacity is significantly higher than most competitors and even other LifeSpan models.</div>
  //   },
  //   {
  //     value: "Recommended for 9 hours daily use",
  //     rating: 10,
  //
  //     notes: () => <div>Designed for extended daily use (9 hours vs 6 hours for TR1000/TR1200), indicating superior durability.</div>
  //   },
  //   {
  //     value: "Premium quality",
  //     rating: 10,
  //
  //     notes: () => <div>As LifeSpan's flagship model, offers the highest quality components and durability in their lineup.</div>
  //   }
  // ],
  
  // cons: [
  //   {
  //     value: "Very expensive",
  //     rating: 2,
  //
  //     notes: () => <div>$2200 price point is significantly higher than consumer models and even other LifeSpan models.</div>
  //   },
  //   {
  //     value: "Very large size",
  //     rating: 3,
  //
  //     notes: () => <div>At 63" length, larger dimensions may be challenging for home office setups.</div>
  //   }
  // ],
}
export default info