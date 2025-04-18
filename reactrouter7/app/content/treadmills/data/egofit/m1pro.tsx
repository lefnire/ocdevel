import type {Product} from "../../types"
import brand from './brand'
const links = {
  amazon: {
    US: "https://amzn.to/41SGudN",
  },
  brand: {
    US: "https://egofitwalker.com/products/m1-under-desk-treadmill",
    UK: "https://egofitwalker.com/products/m1-under-desk-treadmill",
  }
}
const info: Product = {
  brand,
  model: {
    value: "M1 Pro",
    notes: () => <div>
      <p>I don't recommend this one, because (1) they've improved knee-health by adding shock absorption and dialing incline from 5% to 3% based on research; (2) increased the max weight and horse power; and (3) I'm sure improved on quality / durability (as a newer edition). The M2 is $100 more, but I truly think it's worth it. Listing M1 here in case you really want to save the $100.</p>
      <h5>Pro: Incline</h5>
      <div>Has a fixed 5% incline, which is beneficial for knee health, though 3% is considered ideal.</div>
      <h5>Pro: Compact size</h5>
      <div>Smaller depth (38.39") than many competitors, which may be beneficial for smaller spaces.</div>
      <h5>Con: 2HP & max weight 220lbs</h5>
      <div>Lower horsepower (2HP) and max weight capacity (220lbs) than recommended for longevity and heavier users.</div>
      <h5>Con: Older model</h5>
      <div>The M2 model offers improvements in knee-health with shock absorption and a more ideal 3% incline, increased max weight and horse power, and likely improved quality/durability.</div>
    </div>
  },
  key: `${brand.key}_m1pro`,
  links,
  dimensions: {
    value: [38.39, 21.85, 6.89], // 38.39"D x 21.85"W x 6.89"H
    notes: () => <div>Smaller depth than many competitors, which may be beneficial for smaller spaces.</div>
  },
  weight: {
    value: 48.5,
  },
  maxWeight: {
    value: 220,
    notes: () => <div>Lower max weight capacity (220lbs) than many competitors which typically offer 265lbs.</div>
  },
  maxSpeed: {
    value: 3.1,
    notes: () => <div>Lower max speed than many competitors which typically offer 4mph.</div>
  },
  horsePower: {
    value: 2,
    notes: () => <div>2HP is lower than the recommended 2.25HP+ for longevity.</div>
  },
  age: {
    value: "2021-03-30",
    notes: () => <div>Released March 30, 2021 - older model compared to newer options.</div>
  },
  rating: {
    value: [[4.5, 1066], [74, 15, 4, 2, 5]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    notes: () => <div>Excellent rating distribution with 75% 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", "B"], // Fakespot B for the product
    notes: () => <div>Fakespot B rating indicates generally reliable reviews.</div>
  },
  price: {
    value: 400,
  },
  pickedBy: {
    websites: [
      {value: 3},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ],
  },
  incline: {
    value: 5,
    method: "fixed",
    notes: () => <div>Has a fixed 5% incline, which is higher than the ideal 3% recommended for knee health. This makes it tall (6.89"H) which may or may not accommodate your desk height for ergonomic peripherals and monitor placement.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
    notes: () => <div>No shock absorption mentioned, which is a feature added in the newer M2 model.</div>
  },
  decibels: {
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 5, // Not mentioned in the data
  },
  material: {
    value: "Acrylonitrile Butadiene Styrene (ABS)"
  },

}
export default info