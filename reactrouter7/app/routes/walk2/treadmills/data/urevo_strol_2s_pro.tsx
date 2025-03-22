import type {Product} from '../types'
import brands from '../brands'
const info: Product = {
  make: "urevo",
  model: "Strol 2S Pro",
  description: "If you also want to run (use this away from the walking desk), get this. You flip up the handles and it enables high speed; flip down to put it under your desk (low speed). This will generally be higher quality and last longer than a walking-only pad, due to motor requirements for high speed.",
  link: "",

  dimensions: {
    value: [54.72, 25.37, 6.67],
    notes: () => <div>Depth and height are good, but side-rails add some width (a necessary walking pads that allow speeds over 4mph). So measure the space between your desk legs.</div>
  },
  weight: {
    value: 86,
    notes: () => <div>Woa mama is it heavy! Much of it is in the rails.</div>
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 7.6,
    notes: () => <div>One of thew quality walking pads which allows running.</div>
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-08-07",
  },
  rating: {
    value: [[4.3, 774], [70, 14, 4, 3, 9]],
  },
  fakespot: {
    value: ["A", brands.urevo.fakespot],
  },
  price: {
    value: 800,
    sale: 400,
  },
  pickedBy: {
    value: ["me", "trusted", "public"],
  },
  incline: {
    value: 9,
  },
  shock: {
    value: true,
    notes: () => <div>8-Point silicone</div>
  },
  decibels: {
  },
  sturdy: {
    value: true,
    notes: () => <div>Very high quality, to accommodate running.</div>
  },
  app: {
    value: true,
  },
  countries: {
    value: ["US"]
  },
  bump: 3
}
export default info