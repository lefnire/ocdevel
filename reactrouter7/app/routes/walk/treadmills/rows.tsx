import type {Brand, Product} from './types'
import * as s from './scoring/index'
import {produce} from 'immer'
import _ from 'lodash'
import data from './data/index'
import index from "./data/index";

type Score = {score: number}
export type Row = Product & {
  total: number
  dimensions: Product['dimensions'] & Score
  weight: Product['weight'] & Score
  maxWeight: Product['maxWeight'] & Score
  maxSpeed: Product['maxSpeed'] & Score
  horsePower: Product['horsePower'] & Score
  age: Product['age'] & Score
  rating: Product['rating'] & Score
  price: Product['price'] & Score
  pickedBy: Product['pickedBy'] & Score
  incline: Product['incline'] & Score
  shock: Product['shock'] & Score
  decibels: Product['decibels'] & Score
  sturdy: Product['sturdy'] & Score
  app: Product['app'] & Score
  easyLube: Product['easyLube'] & Score
  amazon: Product['amazon'] & Score
  score: number
}

function hydrate(d: Row) {
  if (_.size(d.links.amazon) && !d.brand.warranty.amazon) {
    d.brand.warranty.amazon = 2 * 12 // Asurion
  }
  d.brand.rating = d.brand.rating ?? 5
  d.brand.bump = d.brand.bump ?? 0

  d.dimensions = d.dimensions || {}
  d.dimensions.score = s.dimensions(d)

  d.weight = d.weight || {}
  d.weight.score = s.weight(d)

  d.maxWeight = d.maxWeight || {}
  d.maxWeight.score = s.maxWeight(d)

  d.horsePower = d.horsePower ||{ }
  d.horsePower.score = s.horsePower(d)

  d.age = d.age || {}
  d.age.score = s.age(d)

  d.rating = d.rating || {}
  d.rating.score = s.rating(d)

  d.price = d.price || {}
  d.price.score = s.price(d)

  d.pickedBy = d.pickedBy || {}
  d.pickedBy.score = s.pickedBy(d)

  d.incline = d.incline || {}
  d.incline.score = s.incline(d)

  d.shock = d.shock || {}
  d.shock.score = s.shock(d)

  d.decibels = d.decibels || {}
  d.decibels.score = s.decibels(d)

  d.sturdy = d.sturdy || {}
  d.sturdy.score = s.sturdy(d)

  d.app = d.app || {}
  d.app.score = s.app(d)

  d.easyLube = d.easyLube || {}
  d.easyLube.score = s.easyLube(d)

  d.amazon = d.amazon || {}
  d.amazon.score = s.amazon(d)
  // d.total = s.total(d)
}

const hydrated = data.map(p => produce(p, hydrate))
export default hydrated

export const dataObj = Object.fromEntries(
  hydrated.map(product => ([
    product.key,
    product
  ]))
)