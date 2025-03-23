import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "3S",
  key: `${brand.key}_3s`,
  description: "Best value walking pad. My daily driver after testing many treadmills. Still best mill for this price, but I've since upgraded to CyberPad. If you can afford $150 more, I recommend it.",
  links: {
    amazon: {
      US: "https://amzn.to/4bE2JXR"
    },
    brand: {
    }
  },

  dimensions: {
    value: [51.6, 22.1, 6.5], // 51.6"D x 22.1"W x 6.5"H
  },
  weight: {
    value: 71,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2023-07-18",
  },
  rating: {
    value: [[4.3, 774], [70, 14, 4, 3, 9]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 465,
    sale: 300,
  },
  pickedBy: {
    value: ["me", "public"],
  },
  incline: {
    value: 9,
  },
  shock: {
    value: true,
    notes: () => <div>More shock points than Egofit (4 silicon pins, 2 silicon "sandwiches").</div>
  },
  decibels: {
    value: 46,
    notes: () => <div>52dB near treadmill, 46dB near microphone - relatively quiet.</div>
  },
  sturdy: {
    value: true,
    rating: 7,
    notes: () => <div>The incline mechanism has a focal-point closer to the center, adding better stability to the structure than 2S Lite or EgoFit (which have triangle structure). The overall build quality (including the remote) is better than 2S Lite and EgoFit.</div>
  },
  app: {
    value: true,
  },
  easyLube: {
    value: false,
    notes: () => <div>The rails are elevated, so you have to fish your fingers under the belt to pull it up and apply lubricant.</div>
  },
  amazon: {
    value: true,
  },
  bump: 3,

  cons: [
    {
      value: "Bulky",
      rating: 3,
      notes: () => <div>Larger and heavier than Egofit. Note: it does has tilt wheels for moving the device to/from the desk.</div>
    },
    {
      value: "Can't stand on head",
      rating: 4,
      notes: () => <div>Lacks rubber stops on the head, so if you tilt it head-side you'll break its power switch. You have to stand it on its "feet", but the wheels are near the head - making tilting against a wall a muscular challenge.</div>
    },
    {
      value: "Hard to lube",
      rating: 3,
      notes: () => <div>The rails are elevated, so you have to fish your fingers under the belt to pull it up and apply lubricant. Pain in the butt, but whatever - it's a once-a-week task.</div>
    }
  ],
}
export default info