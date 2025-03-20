import type {Product} from "../types"
const info: Product = {
  make: "imovr",
  model: "iMovR",
  description: "Considered on the internet the highest quality underdesk treadmill, often over Lifespan. Which has me stumped, because so many of the specs seem better in the Lifespan models. I personally would prefer Lifespan based on what I've seen.",
  link: "https://www.imovr.com/treadmill-desk-workstations.html",

  dimensions: {
    value: [56, 39, 0], // 39″ wide × 56″ long, height not specified
    rating: 2,
    flag: "yellow",
    notes: () => <div>Very wide at 39 inches, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
    flag: "yellow",
    notes: () => <div>Described as heavy in the data, which may make it difficult to move.</div>
  },
  maxWeight: {
    value: 300,
    rating: 8,
    flag: "green",
    notes: () => <div>Good max weight capacity (300lbs), though less than LifeSpan models.</div>
  },
  maxSpeed: {
    value: 2,
    rating: 2,
    flag: "red",
    notes: () => <div>Very low max speed (2mph) compared to most competitors, which typically offer 4mph or more.</div>
  },
  horsePower: {
    value: 2.5, // Assuming 2.5+ based on premium positioning
    rating: 7,
    flag: "green",
    notes: () => <div>Likely has a high-quality motor given the premium positioning and price point.</div>
  },
  age: {
    value: "", // TODO: Age not specified in the data
    rating: 0,
  },
  rating: {
    value: [[0, 0], [0, 0, 0, 0, 0]], // TODO: Rating not specified in the data
    rating: 0,
  },
  fakespot: {
    value: ["", ""], // Not specified in the data
    rating: 0,
  },
  price: {
    value: 2500,
    rating: 1,
    flag: "red",
    notes: () => <div>Extremely high price point, even higher than premium LifeSpan models.</div>
  },
  pickedBy: {
    value: [], // Not specifically picked by the author
    rating: 0,
    notes: () => <div>Considered on the internet the highest quality underdesk treadmill, often over Lifespan. The author is stumped by this, as the specs seem better in the Lifespan models.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: true, // Assuming based on premium positioning
    rating: 8,
    flag: "green",
    notes: () => <div>Likely has good shock absorption given the premium positioning and price point.</div>
  },
  quiet: {
    value: true, // Assuming based on premium positioning
    rating: 8,
    flag: "green",
    notes: () => <div>Likely quiet given the premium positioning and price point.</div>
  },
  sturdy: {
    value: true,
    rating: 9,
    flag: "green",
    notes: () => <div>Likely very sturdy given the premium positioning and price point.</div>
  },
  app: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  easyLube: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  amazon: {
    value: false, // Link is to iMovR website, not Amazon
    rating: 0,
  },
  countries: {
    value: ["US"] // Assuming US availability
  },

  pros: [
    {
      value: "Highest quality reputation",
      rating: 8,
      flag: "green",
      notes: () => <div>Considered on the internet the highest quality underdesk treadmill, often over Lifespan.</div>
    }
  ],
  
  cons: [
    {
      value: "Wide, heavy",
      rating: 3,
      flag: "yellow",
      notes: () => <div>Very wide at 39 inches and described as heavy, which may make it difficult to fit in some spaces or move around.</div>
    },
    {
      value: "Expensive",
      rating: 1,
      flag: "red",
      notes: () => <div>At $2500, it's significantly more expensive than most competitors, including premium LifeSpan models.</div>
    },
    {
      value: "Slow",
      rating: 2,
      flag: "red",
      notes: () => <div>Max speed of only 2mph is very low compared to most competitors, which typically offer 4mph or more.</div>
    }
  ],
}
export default info