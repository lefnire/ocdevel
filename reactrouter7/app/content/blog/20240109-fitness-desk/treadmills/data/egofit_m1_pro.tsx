import type {Product} from "./types"
const info: Product = {
  make: "Egofit",
  model: "M1 Pro",
  description: "I don't recommend this one, because (1) they've improved knee-health by adding shock absorption and dialing incline from 5% to 3% based on research; (2) increased the max weight and horse power; and (3) I'm sure improved on quality / durability (as a newer edition). The M2 is $100 more, but I truly think it's worth it. Listing M1 here in case you really want to save the $100.",
  link: "https://amzn.to/4817FEe",

  dimensions: {
    value: [38.39, 21.85, 6.89], // 38.39"D x 21.85"W x 6.89"H
    rating: 7,
    flag: "green",
    notes: () => <div>Smaller depth than many competitors, which may be beneficial for smaller spaces.</div>
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
  },
  maxWeight: {
    value: 220,
    rating: 4,
    flag: "yellow",
    notes: () => <div>Lower max weight capacity (220lbs) than many competitors which typically offer 265lbs.</div>
  },
  maxSpeed: {
    value: 3.1,
    rating: 3,
    flag: "yellow",
    notes: () => <div>Lower max speed than many competitors which typically offer 4mph.</div>
  },
  horsePower: {
    value: 2,
    rating: 3,
    flag: "yellow",
    notes: () => <div>2HP is lower than the recommended 2.25HP+ for longevity.</div>
  },
  age: {
    value: "2021-03-30",
    rating: 3,
    flag: "yellow",
    notes: () => <div>Released March 30, 2021 - older model compared to newer options.</div>
  },
  rating: {
    value: [[4.5, 0], [75, 15, 4, 2, 4]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 8,
    flag: "green",
    notes: () => <div>Excellent rating distribution with 75% 5-star ratings.</div>
  },
  fakespot: {
    value: ["B", ""], // Fakespot B for the product
    rating: 7,
    notes: () => <div>Fakespot B rating indicates generally reliable reviews.</div>
  },
  price: {
    value: 400,
    rating: 5,
  },
  pickedBy: {
    value: ["public"],
    rating: 6,
  },
  incline: {
    value: 5,
    rating: 6,
    flag: "yellow",
    notes: () => <div>Has a fixed 5% incline, which is higher than the ideal 3% recommended for knee health. This makes it tall (6.89"H) which may or may not accommodate your desk height for ergonomic peripherals and monitor placement.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
    rating: 0,
    flag: "yellow",
    notes: () => <div>No shock absorption mentioned, which is a feature added in the newer M2 model.</div>
  },
  quiet: {
    value: false, // Not specifically mentioned
    rating: 0,
  },
  sturdy: {
    value: true, // Assuming based on the brand reputation
    rating: 6,
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
    value: true,
    rating: 8,
  },
  countries: {
    value: ["US"] // Assuming US availability since it's on Amazon
  },

  pros: [
    {
      value: "Incline",
      rating: 6,
      notes: () => <div>Has a fixed 5% incline, which is beneficial for knee health, though 3% is considered ideal.</div>
    },
    {
      value: "Compact size",
      rating: 8,
      flag: "green",
      notes: () => <div>Smaller depth (38.39") than many competitors, which may be beneficial for smaller spaces.</div>
    }
  ],
  
  cons: [
    {
      value: "2HP & max weight 220lbs",
      rating: 3,
      flag: "yellow",
      notes: () => <div>Lower horsepower (2HP) and max weight capacity (220lbs) than recommended for longevity and heavier users.</div>
    },
    {
      value: "Older model",
      rating: 4,
      flag: "yellow",
      notes: () => <div>The M2 model offers improvements in knee-health with shock absorption and a more ideal 3% incline, increased max weight and horse power, and likely improved quality/durability.</div>
    }
  ],
}
export default info