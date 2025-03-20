import type {Product} from '../types'
const info: Product = {
  make: "urevo",
  model: "Strol 2S Pro",
  description: "If you also want to run (use this away from the walking desk), get this. You flip up the handles and it enables high speed; flip down to put it under your desk (low speed). This will generally be higher quality and last longer than a walking-only pad, due to motor requirements for high speed.",
  link: "",

  dimensions: {
    value: [54.72, 25.37, 6.67],
    rating: 5,
    notes: () => <div>Depth and height are good, but side-rails add some width (a necessary walking pads that allow speeds over 4mph). So measure the space between your desk legs.</div>
  },
  weight: {
    value: 86,
    rating: 1,
    flag: 'yellow',
    notes: () => <div>Woa mama is it heavy! Much of it is in the rails.</div>
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 7.6,
    rating: 10,
    flag: "green",
    notes: () => <div>One of thew quality walking pads which allows running.</div>
  },
  horsePower: {
    value: 2.5,
    rating: 5,
  },
  age: {
    value: "2024-08-07",
    rating: 7,
  },
  rating: {
    value: [[4.3, 772], [70, 14, 4, 3, 9]],
    rating: 6,
  },
  fakespot: {
    value: ["A", "B"],
    rating: 10,
  },
  price: {
    value: 800,
    sale: 400,
  },
  pickedBy: {
    value: ["me", "trusted", "public"],
    rating: 9,
    flag: "green",
  },
  incline: {
    value: 9,
    rating: 9,
  },
  shock: {
    value: true,
    rating: 8,
    notes: () => <div>8-Point silicone (standard)</div>
  },
  quiet: {
  },
  sturdy: {
    value: true,
    rating: 8,
    flag: "green",
    notes: () => <div>Very high quality, to accommodate running.</div>
  },
  app: {
    value: true,
    rating: 1,
  },
  countries: {
    value: ["US"]
  },
}
export default info