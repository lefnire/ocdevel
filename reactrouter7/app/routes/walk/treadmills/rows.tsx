import type {Brand, Product as ProductObj} from './types'
import * as s from './scoring/index'
import {produce} from 'immer'
import _ from 'lodash'
import data from './data/index'
import index from "./data/index";

type Score = {score: number}
export type Product = ProductObj & {
  dimensions: ProductObj['dimensions'] & Score
  links: ProductObj['links'] & Score
  weight: ProductObj['weight'] & Score
  maxWeight: ProductObj['maxWeight'] & Score
  maxSpeed: ProductObj['maxSpeed'] & Score
  horsePower: ProductObj['horsePower'] & Score
  age: ProductObj['age'] & Score
  rating: ProductObj['rating'] & Score
  price: ProductObj['price'] & Score
  pickedBy: ProductObj['pickedBy'] & Score
  incline: ProductObj['incline'] & Score
  shock: ProductObj['shock'] & Score
  decibels: ProductObj['decibels'] & Score
  sturdy: ProductObj['sturdy'] & Score
  app: ProductObj['app'] & Score
  easyLube: ProductObj['easyLube'] & Score
  amazon: ProductObj['amazon'] & Score
  total: Score
}

function hydrate(d: Product) {
  if (_.size(d.links.amazon) && !d.brand.warranty.amazon) {
    d.brand.warranty.amazon = 2 * 12 // Asurion
  }
  d.brand.score = d.brand.rating ?? 5
  d.brand.bump = d.brand.bump ?? 0

  d.dimensions = d.dimensions || {}
  d.dimensions.score = s.dimensions(d)

  d.links = d.links || {amazon: {}, brand: {}}
  d.links.score = s.links(d)

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

  d.total = {score: s.total(d)}
}

const hydrated = data.map(p => produce(p, hydrate))
export default hydrated

export const dataObj = Object.fromEntries(
  hydrated.map(product => ([
    product.key,
    product
  ]))
)