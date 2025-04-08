import type {Product} from "../types"
import brand from './brand'
const links = {
  amazon: {},
  brand: {
    US: "https://egofitwalker.com/products/egofit-comfortdeck-m2-under-desk-treadmill",
    UK: "https://egofitwalker.com/products/egofit-comfortdeck-m2-under-desk-treadmill",
  }
}
const info: Product = {
  brand,
  model: {
    value: "M2",
    notes: () => <div>Compared to Urevo it's compact and quiet; but not on Amazon, no extended warranty, $100 more. Besides those differences, they're equals, which is why I stopped recommending Egofit</div>
  },
  key: `${brand.key}_m2`,
  links,

  dimensions: {
    value: [41.5, 22.8, 7],
    notes: () => <div>They've dialed the depth to the smallest comfortable even for long strides, to minimize space within the home. Part of this is removing face plates (the front is all belt), and part of it is leaning into the incline's modified gait.</div>
  },
  weight: {
    value: 51.36,
  },
  maxWeight: {
    value: 245,
  },
  maxSpeed: {
    value: 3.1,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-01-01",
    notes: () => <div>Unknown, but I think late 2023 / early 2024</div>
  },
  rating: {
    value: [[4.7, 567], [488/576, 34/576, 25/576, 10/576, 19/576]],
    notes: () => <div>Ratings from their website.</div>
  },
  fakespot: {
    // using C since they won't sell this model on Amazon, though they do sell
    // m1 pro there. Makes me suspicious
    value: ["C", brand.fakespot],
  },
  price: {
    value: 600,
    sale: 500,
  },
  pickedBy: {
    me: 2,
    trusted: [{value: -1}],
    websites: [{value: 3}]
  },
  incline: {
    value: 3,
    method: "fixed",
    notes: () => <div>Fixed 3%, which is the sports medicine recommendation. They optimized this down from the 5% of the M1 Pro (prior version). The fact you don't have to set this every time you use it is great.</div>
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>They added this honey-comb thingy (watch their videos) to compress the walking pad when you land; with different firmness across the pad based on phase of step. </div>
  },
  easyLube: {
    value: 10,
  },
  decibels: {
  },
  app: {
    value: false,
  },

  // warranty: from brands
}
export default info