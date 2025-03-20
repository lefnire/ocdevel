import type {Product} from "./types"
const info: Product = {
  make: "GoYouth",
  model: "GoYouth",
  description: "My prior main, and I loved it. I upgraded to Egofit for the incline. If you choose GoYouth, go to their store page just to make sure there's nothing newer than the link I posted. These budget brands often release newer versions quite frequently; and newer is better with these.",
  link: "https://amzn.to/3H75BzJ",

  dimensions: {
    value: [49, 21.6, 5.9], // 49"D x 21.6"W x 5.9"H
    rating: 5,
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
    value: 6,
    rating: 8,
    flag: "green",
    notes: () => <div>Higher max speed (6mph) than many competitors, allowing for faster walking or even light jogging.</div>
  },
  horsePower: {
    value: 2.25,
    rating: 6,
    notes: () => <div>2.25 HP is the minimum recommended for longevity. Treadmills lower than this won't last (heat build-up, inability to handle the walking load).</div>
  },
  age: {
    value: "2022-05-09",
    rating: 5,
    notes: () => <div>Released May 9, 2022. There may be a newer edition from June 20, 2023.</div>
  },
  rating: {
    value: [[4.3, 0], [66, 17, 5, 5, 7]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    rating: 7,
    notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["A", ""], // Fakespot A for the product
    rating: 8,
    flag: "green",
    notes: () => <div>Fakespot A rating indicates highly reliable reviews.</div>
  },
  price: {
    value: 340,
    sale: 300, // $40 Amazon coupon mentioned
    notes: () => <div>There's currently a $40 Amazon "Apply Coupon" = $300 total. A possibly newer edition is $390 with a $120 coupon (=$270).</div>
  },
  pickedBy: {
    value: [], // Not specifically picked by anyone according to the data
    rating: 0,
  },
  incline: {
    value: 0, // No incline mentioned
    rating: 2,
    flag: "red",
    notes: () => <div>No incline functionality, which is important for knee health.</div>
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
    value: true,
    rating: 8,
    flag: "green",
    notes: () => <div>Described as surprisingly durable, lasting 2 years with intense usage (6hrs per day, 5 days a week, 220lbs user at 3.5mph).</div>
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
      value: "Surprisingly durable",
      rating: 8,
      flag: "green",
      notes: () => <div>I've been using it for 2yrs, around 6hrs per day 5 days a week. I'm 220lbs and I walk 3.5mph. That's very intense usage to have lasted this long. Just recently it started to develop creaks and groans, which I believe is due to damage I put on the walking pad from the usage. But I think it has another 6 months left in it before I need to use the extended warranty.</div>
    },
    {
      value: "Smaller than many others",
      rating: 7,
      notes: () => <div>Making it fit under more desks. No rails.</div>
    },
    {
      value: "Up to 6mph",
      rating: 8,
      flag: "green",
      notes: () => <div>I like to walk 3.5mph while working; faster than most walking treadmills allow. I wouldn't recommend using this to run/sprint though, unless you absolutely must (no nearby gym, bad weather, etc). While it's quite durable, I fear my 220lbs landing too hard on the pad would cause cracks.</div>
    }
  ],
  
  cons: [
    {
      value: "Controller sucks",
      rating: 4,
      flag: "yellow",
      notes: () => <div>But can easily be replaced for free. Just deal with it. The first one will have button-presses miss-firing (as in, activating a different button's action). To fix this, buy a compatible controller battery along with the treadmill and replace the one in the controller immediately. I think they just run out while sitting in the warehouse. After 1.5yrs, I nonetheless had to do a hard replacement, which GoYouth did for free via Amazon messaging center. It was easy, came fast, and didn't phase me. This isn't a fluke; you'll see in the reviews many have experienced this scenario.</div>
    },
    {
      value: "Low max weight",
      rating: 3,
      flag: "yellow",
      notes: () => <div>220 is lower than 265 average of the budget picks.</div>
    }
  ],
}
export default info