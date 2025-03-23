import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: "2 in 1",
  key: `${brand.key}_2in1`,
  description: "My prior main, and I loved it. I upgraded to Egofit for the incline. If you choose GoYouth, go to their store page just to make sure there's nothing newer than the link I posted. These budget brands often release newer versions quite frequently; and newer is better with these.",
  links: {
    amazon: {
      US: "https://amzn.to/4hx38hC",
      CA: "https://amzn.to/4bXikDA",
    },
    brand: {}
  },

  dimensions: {
    value: [49, 21.6, 5.9], // 49"D x 21.6"W x 5.9"H
  },
  weight: {
    value: 50,
  },
  maxWeight: {
    value: 300,
    // notes: () => <div>Lower max weight capacity (220lbs) than many competitors which typically offer 265lbs.</div>
  },
  maxSpeed: {
    value: 3.7,
    // notes: () => <div>Higher max speed (6mph) than many competitors, allowing for faster walking or even light jogging.</div>
  },
  horsePower: {
    value: 2.25,
    notes: () => <div>2.25 HP is the minimum recommended for longevity. Treadmills lower than this won't last (heat build-up, inability to handle the walking load).</div>
  },
  age: {
    value: "2021-05-25",
    // notes: () => <div>Released May 9, 2022. There may be a newer edition from June 20, 2023.</div>
  },
  rating: {
    value: [[4.1, 1944], [61, 17, 6, 6, 10]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["A", brand.fakespot], // Fakespot A for the product
    notes: () => <div>Fakespot A rating indicates highly reliable reviews.</div>
  },
  price: {
    value: 300,
    // sale: 300, // $40 Amazon coupon mentioned
    // notes: () => <div>There's currently a $40 Amazon "Apply Coupon" = $300 total. A possibly newer edition is $390 with a $120 coupon (=$270).</div>
  },
  pickedBy: {
    value: [], // Not specifically picked by anyone according to the data
  },
  incline: {
    value: 0, // No incline mentioned
    notes: () => <div>No incline functionality, which is important for knee health.</div>
  },
  shock: {
    value: false, // Not mentioned in the data
  },
  decibels: {
  },
  sturdy: {
    value: true,
    rating: 5,
    notes: () => <div>Described as surprisingly durable, lasting 2 years with intense usage (6hrs per day, 5 days a week, 220lbs user at 3.5mph).</div>
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: false, // Not mentioned in the data
  },
  amazon: {
    value: true,
  },

  pros: [
    {
      value: "Surprisingly durable",
      rating: 8,
      
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
      
      notes: () => <div>I like to walk 3.5mph while working; faster than most walking treadmills allow. I wouldn't recommend using this to run/sprint though, unless you absolutely must (no nearby gym, bad weather, etc). While it's quite durable, I fear my 220lbs landing too hard on the pad would cause cracks.</div>
    }
  ],
  
  cons: [
    {
      value: "Controller sucks",
      rating: 4,
      
      notes: () => <div>But can easily be replaced for free. Just deal with it. The first one will have button-presses miss-firing (as in, activating a different button's action). To fix this, buy a compatible controller battery along with the treadmill and replace the one in the controller immediately. I think they just run out while sitting in the warehouse. After 1.5yrs, I nonetheless had to do a hard replacement, which GoYouth did for free via Amazon messaging center. It was easy, came fast, and didn't phase me. This isn't a fluke; you'll see in the reviews many have experienced this scenario.</div>
    },
    {
      value: "Low max weight",
      rating: 3,
      
      notes: () => <div>220 is lower than 265 average of the budget picks.</div>
    }
  ],
}
export default info