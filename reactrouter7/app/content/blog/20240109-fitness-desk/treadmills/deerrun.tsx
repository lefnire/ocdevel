import type {Product} from "./types"
const info: Product = {
  make: "DeerRun",
  model: "DeerRun",
  description: "Most popular of the very-budget picks. The common 3 are DeerRun, Sperax, and Yagud. But Sperax and Yagud have lower ratings and worse FakeSpot scores on Amazon; and I see a lot of complaints and returns.",
  link: "",

  dimensions: {
    value: [45, 20.3, 4.3], // 45"D x 20.3"W x 4.3"H
    rating: 6,
  },
  weight: {
    value: 0, // TODO: Weight not specified in the data
    rating: 0,
  },
  maxWeight: {
    value: 300,
    rating: 9,
    flag: "green",
    notes: () => <div>Higher max weight capacity (300lbs) than many competitors.</div>
  },
  maxSpeed: {
    value: 3.8,
    rating: 4,
  },
  horsePower: {
    value: 2.2,
    rating: 5,
  },
  age: {
    value: "2024-10-15",
    rating: 8,
    flag: "green",
    notes: () => <div>Released October 15, 2024 - very recent model.</div>
  },
  rating: {
    value: [[4.6, 0], [73, 19, 4, 0, 4]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 8,
    flag: "green",
    notes: () => <div>Excellent rating distribution with 73% 5-star ratings and no 2-star ratings.</div>
  },
  fakespot: {
    value: ["", ""], // Not specified in the data
    rating: 0,
  },
  price: {
    value: 150,
    rating: 9,
    flag: "green",
    notes: () => <div>Very affordable price point, especially during sales.</div>
  },
  pickedBy: {
    value: ["me", "public"],
    rating: 8,
    flag: "green",
  },
  incline: {
    value: 0,
    rating: 2,
    flag: "red",
    notes: () => <div>No incline functionality. Recommendation is to prop the front on a block of wood or foam.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
    rating: 0,
    flag: "yellow",
    notes: () => <div>No shock absorption mentioned, which may be a concern for knee health.</div>
  },
  quiet: {
    value: false, // Not specifically mentioned
    rating: 0,
  },
  sturdy: {
    value: false, // Not specifically mentioned
    rating: 0,
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
      value: "Very affordable",
      rating: 9,
      flag: "green",
      notes: () => <div>Cheapest you'll find, especially on a sale. The pro option (increased quality and horse power) sometimes drops to this price, so check before buying.</div>
    }
  ],
  
  cons: [
    {
      value: "Low-ish quality",
      rating: 3,
      flag: "yellow",
      notes: () => <div>This won't last you more than a year. But if you're just testing the waters, it's a good way to go.</div>
    },
    {
      value: "No incline",
      rating: 3,
      flag: "red",
      notes: () => <div>No incline functionality, which is important for knee health. Recommendation is to prop the front on a block of wood or foam.</div>
    }
  ],
}
export default info