import type {Product} from "./types"
const info: Product = {
  make: "urevo",
  model: "3S",
  description: "Best value walking pad. My daily driver after testing many treadmills. Still best mill for this price, but I've since upgraded to CyberPad. If you can afford $150 more, I recommend it.",
  link: "",

  dimensions: {
    value: [51.6, 22.1, 6.5], // 51.6"D x 22.1"W x 6.5"H
    rating: 5,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 2,
    flag: 'yellow',
    notes: () => <div>High weight according to the data, but exact value not specified.</div>
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 2.5,
    rating: 7,
  },
  age: {
    value: "2023-07-18",
    rating: 7,
    flag: "green",
    notes: () => <div>Released July 18, 2023 - relatively new model.</div>
  },
  rating: {
    value: [[4.3, 0], [70, 15, 4, 3, 8]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 7,
    notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", "A"],
    rating: 8,
    notes: () => <div>Fakespot A for the company, B for the product - good reliability of reviews.</div>
  },
  price: {
    value: 350,
  },
  pickedBy: {
    value: ["me", "public"],
    rating: 9,
    flag: "green",
  },
  incline: {
    value: 3, // Exact value not specified, but it has incline
    rating: 8,
    flag: "green",
    notes: () => <div>Has incline functionality, which is important for knee health.</div>
  },
  shock: {
    value: true,
    rating: 8,
    flag: "green",
    notes: () => <div>More shock points than Egofit (4 silicon pins, 2 silicon "sandwiches").</div>
  },
  quiet: {
    value: true,
    rating: 7,
    notes: () => <div>52dB near treadmill, 46dB near microphone - relatively quiet.</div>
  },
  sturdy: {
    value: true,
    rating: 9,
    flag: "green",
    notes: () => <div>The incline mechanism has a focal-point closer to the center, adding better stability to the structure than 2S Lite or EgoFit (which have triangle structure). The overall build quality (including the remote) is better than 2S Lite and EgoFit.</div>
  },
  app: {
    value: false, // Not mentioned in the data
    rating: 0,
  },
  easyLube: {
    value: false,
    rating: 2,
    notes: () => <div>The rails are elevated, so you have to fish your fingers under the belt to pull it up and apply lubricant.</div>
  },
  amazon: {
    value: true,
    rating: 8,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

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