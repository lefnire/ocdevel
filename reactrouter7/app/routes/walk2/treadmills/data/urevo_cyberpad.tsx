import type {Product} from "./types"
const info: Product = {
  make: "urevo",
  model: "Cyberpad",
  description: "I just got this (Feb 12th 2025) and am in love. It's their newest, most upgraded model via Kickstarter. I'm retiring my 3S as a backup. Quality upgrades over 3S are worth the +$150.",
  link: "",

  dimensions: {
    value: [47.6, 23.6, 8.7], // 47.6"D x 23.6"W x 8.7"H
    rating: 3,
    
    notes: () => <div>Extremely tall. The back legs are 8.7", much taller than most mills. So make sure your standing desk is tall enough. Indeed, after switching from Urevo 3S to this, I had to raise my monitor arms.</div>
  },
  weight: {
    value: 70.6,
    rating: 2,
    
    notes: () => <div>Very heavy! It does have wheels and tilt stoppers though, so it shouldn't  be a problem.</div>
  },
  maxWeight: {
    value: 265,
    rating: 8,
  },
  maxSpeed: {
    value: 4,
    rating: 5,
  },
  horsePower: {
    value: 2.5,
    rating: 5,
  },
  age: {
    value: "2025-02-05",
    rating: 8,
    
    notes: () => <div>Brand spankin' new, baby. It's their flagship from a Kickstarter campaign, and they're proud of it (as they should be). This is my favorite mill of all!</div>
  },
  rating: {
    value: [[4.4, 10], [86, 0, 0, 0, 14]],
    rating: 7,
    notes: () => <div>Too soon to tell (to new). But I've seen, heard, and experienced only good.</div>
  },
  fakespot: {
    value: ["F", "B"],
    rating: 5,
    notes: () => <div>Too few to go off. Urevo is reputable, so seems like a fluke.</div>
  },
  price: {
    value: 900,
    sale: 500,
  },
  pickedBy: {
    value: ["me", "trusted", "public"],
    rating: 10,
    
  },
  incline: {
    value: 12,
    rating: 9,
    notes: () => <div>Goes really high! Don't get greedy with those calories though, 3% for those knees baby.</div>
  },
  shock: {
    value: true,
    rating: 8,
    
    notes: () => <div>The absorption happens at the pistons of the incline mechanism, like spring-loading. This is more robust than silicone absorbers at the deck-level.</div>
  },
  decibels: {
    value: 30,
    notes: () => <div>Brushless motor, 30db - 30% quieter than average.</div>
  },
  sturdy: {
    value: true,
    rating: 9,
    
    notes: () => <div>Uses alloy materials, and a specialized motor (MegaMotor & Dyson's brushless). Big upgrade over most treadmills; will likely last much longer</div>
  },
  app: {
    value: true,
    notes: () => <div>I've seen many treadmills with apps, but never got any of them working until this one. Control
        speed / incline / lights via app, track calories & distance over time. It's more convenient than the controller
        (easier to navigate, no beeps) and removes the controller as a point of failure</div>
  },
  countries: {
    value: ["US"]
  },
  bump: 5,

  // warranty: from brands

  cons: [
    {
      value: "No Running",
      rating: 0,
      notes: () => <div>Only their Strol models support speeds past 4mph. But this being a premium-tier price point, I'd hoped it'd support higher speeds. So go Strol if you need to run.</div>
    }
  ],
}
export default info