import type {Product} from "../types"
import brand from './brand'
const links = {
  amazon: {},
  brand: {
    US: "https://egofitwalker.com/products/egofit-m2t-foldable-treadmill?sca_ref=5484370.9SQi3qcg7q&sca_source=blog",
    UK: "https://egofitwalker.com/products/egofit-m2t-foldable-treadmill?sca_ref=5484370.9SQi3qcg7q&sca_source=blog",
  }
}
const info: Product = {
  brand,
  model: {value: "M2T"},
  key: `${brand.key}_m2t`,
  links,

  dimensions: {
    value: [41.5, 27.4, 7],
    notes: () => <div>They've dialed the depth to the smallest comfortable even for long strides, to minimize space within the home. Part of this is removing face plates (the front is all belt), and part of it is leaning into the incline's modified gait.</div>
  },
  weight: {
    value: 62,
  },
  maxWeight: {
    value: 245,
  },
  maxSpeed: {
    value: 3.73,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-01-01",
    notes: () => <div>Unknown, but I think late 2023 / early 2024</div>
  },
  rating: {
    value: [[4.67, 576], [488/576, 34/576, 25/576, 10/576, 19/576]],
    notes: () => <div>Ratings from their website.</div>
  },
  fakespot: {
    // using C since they won't sell this model on Amazon, though they do sell
    // m1 pro there. Makes me suspicious
    value: ["C", brand.fakespot],
  },
  price: {
    value: 660,
    sale: 560,
  },
  pickedBy: {
  },
  incline: {
    value: 3,
    method: "fixed",
    notes: () => <div>Fixed 3%, which is the sports medicine recommendation. They optimized this down from the 5% of the M1 Pro (prior version). The fact you don't have to set this every time you use it is great.</div>
  },
  shock: {
    value: true,
    rating: 5,
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