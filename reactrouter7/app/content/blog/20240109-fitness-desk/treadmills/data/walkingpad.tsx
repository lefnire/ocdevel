import type {Product} from "./types"
const info: Product = {
  make: "WalkingPad",
  model: "WalkingPad",
  description: "I strongly discourage WalkingPad. It's the one I see the most complaints about online; severe quality issues like motor burnout. I think it's so popular because they landed strong SEO with the name, being exactly what people search for. Please look at the reviews before considering WalkingPad.",
  link: "https://amzn.to/3HCBP67",

  dimensions: {
    value: [57.17, 28.43, 51.18], // 57.17"D x 28.43"W x 51.18"H
    rating: 3,
    flag: "yellow",
    notes: () => <div>Larger dimensions than many competitors, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
  },
  maxWeight: {
    value: 242,
    rating: 6,
    notes: () => <div>Max weight capacity of 242lbs is lower than the 265lbs offered by many competitors.</div>
  },
  maxSpeed: {
    value: 7.5,
    rating: 8,
    flag: "green",
    notes: () => <div>Higher max speed (7.5mph) than most competitors, allowing for running.</div>
  },
  horsePower: {
    value: 2,
    rating: 3,
    flag: "yellow",
    notes: () => <div>2 HP is slightly less than most on this list. 2.25 HP or more is preferred for longevity.</div>
  },
  age: {
    value: "2021-08-12",
    rating: 4,
    notes: () => <div>Released August 12, 2021 - older model compared to newer options.</div>
  },
  rating: {
    value: [[4, 0], [55, 21, 8, 5, 11]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 3,
    flag: "red",
    notes: () => <div>Concerning rating distribution with 11% 1-star ratings, indicating potential quality issues.</div>
  },
  fakespot: {
    value: ["A", ""], // Fakespot A for the product
    rating: 7,
    notes: () => <div>Fakespot A rating indicates generally reliable reviews, despite the concerning distribution.</div>
  },
  price: {
    value: 750, // Taking the middle of the $500-1000 range
    rating: 3,
    flag: "yellow",
    notes: () => <div>Price range of $500-1000 is higher than many competitors. The X21 model is $1000.</div>
  },
  pickedBy: {
    value: ["public"], // Listed as popular but not recommended
    rating: 2,
    flag: "red",
    notes: () => <div>Popular among the public but not recommended due to quality issues.</div>
  },
  incline: {
    value: 0, // Not mentioned in the data
    rating: 0,
  },
  shock: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  quiet: {
    value: false, // Not specifically mentioned
    rating: 0,
  },
  sturdy: {
    value: false,
    rating: 2,
    flag: "red",
    notes: () => <div>Many reports of quality issues including motor burnout and belt drift.</div>
  },
  app: {
    value: true,
    rating: 7,
    flag: "green",
    notes: () => <div>Uses an app instead of a controller, which removes a point of failure and tracks stats over time.</div>
  },
  easyLube: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  amazon: {
    value: true,
    rating: 8,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

  pros: [
    {
      value: "Folds up for stow-away",
      rating: 8,
      flag: "green",
      notes: () => <div>This mill folds in half, and you can either store it under your bed or vertically like a box. Only mill which does this. Personally I don't care, because most mills can tilt against a wall and take up less depth-space that way than a folded WalkingPad anyway.</div>
    },
    {
      value: "App instead of controller",
      rating: 7,
      flag: "green",
      notes: () => <div>Many of these mills use a dedicated controller, which adds a point of failure (the cheapest point of failure in many cases). Not only does an app remove that liability; but also tracks stats over time, which most mills lack.</div>
    },
    {
      value: "Running speed",
      rating: 8,
      flag: "green",
      notes: () => <div>Doubles as a proper treadmill at 7.5mph, much higher than most of the mills listed (including the quality mills). So if you want the choice between walking desk and actual treadmill, this is a great pick.</div>
    }
  ],
  
  cons: [
    {
      value: "Major bad reviews",
      rating: 1,
      flag: "red",
      notes: () => <div>Including motor issues and frequent belt drift. Each of these models ha a high 1-star skew, which is very concerning. I've seen a lot of complaints even outside of Amazon (esp. Reddit). I personally would never buy a WalkingPad; but they are very popular among those who read my content and later make a choice, which is why I'm listing it. I strongly advise doing some heavy review research.</div>
    }
  ],
}
export default info