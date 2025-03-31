import type {Product} from "../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "Walking Pad",
    notes: () => <div>
      <p>I strongly discourage GoPlus. Forget the Wirecutter pick, they only did it because GoPlus is the most popular Amazon budget mill - it was a grab pick. There are two main models. They have a ton more, so visit their store page to compare. Hover over as many models' star-rating widgets as you can. Notice the distribution, that looks like a \"C\" rather than a stair-case. High 1-stars and 2-stars indicate quality issues. If you have the FakeSpot Chrome Extension, you'll see almost all their models are F and D; meaning the 5-stars are fake. Scan through the reviews, and you'll see countless cases of belt-drift, motor blow-out, and more.</p>
      <h5>Pro: Extremely popular</h5>
      <div>One of the most popular budget treadmills out there.</div>
      <h5>Con: Belt drift</h5>
      <div>Many reports of belt drift issues.</div>
      <h5>Con: Motor burnout</h5>
      <div>Frequent complaints about motor burnout.</div>
      <h5>Con: Console errors</h5>
      <div>Reports of console errors and failure to start.</div>
      <h5>Con: Poor review distribution</h5>
      <div>Strong 1-star skew, indicating quality issues. FakeSpot F, and "Seller Caution".</div>
    </div>
  },
  key: `${brand.key}_goplus`,
  links: {
    amazon: {
      US: "https://amzn.to/4bTDpio",
      CA: "https://amzn.to/4hC2n78"
    },
    brand: {
      US: "https://www.goplusus.com/collections/treadmill/products/goplus-walking-pad-under-desk-treadmill-with-remote-control-led-display-3-countdown-modes?variant=49821539926232",
      CA: "https://www.goplusus.com/collections/treadmill/products/goplus-walking-pad-under-desk-treadmill-with-remote-control-led-display-3-countdown-modes?variant=49821539926232"
    }
  },

  dimensions: {
    value: [43, 19, 4.7], // 52.5"D x 29"W x 44.5"H
    // notes: () => <div>Larger dimensions than many competitors, which may be an issue for some desk setups.</div>
  },
  weight: {
    value: 36,
  },
  maxWeight: {
    value: 220,
  },
  maxSpeed: {
    value: 4, // Listed as 2.5mph / 7.5mph in the data, taking the higher value
    // notes: () => <div>Higher max speed than many competitors, allowing for running.</div>
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-11-16",
    rating: 2,
    notes: () => <div>Released June 9, 2020 - older model compared to newer options.</div>
  },
  rating: {
    value: [[1.7, 3], [0, 0, 37, 0, 63]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Concerning rating distribution with 14% 1-star ratings, showing a "C" shape rather than a staircase, which indicates potential quality issues.</div>
  },
  fakespot: {
    value: ["B", brand.fakespot],
    notes: () => <div>Fakespot F rating and "Seller Caution" indicates significant issues with review authenticity.</div>
  },
  price: {
    value: 135,
  },
  pickedBy: {
    websites: [{value: 5}],
  },
  incline: {
    value: 0, // Not mentioned in the data
  },
  shock: {
    value: false, // Not mentioned in the data
  },
  decibels: {
    value: 45,
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 10,
  },
}
export default info