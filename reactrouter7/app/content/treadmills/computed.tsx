import type {Product, Computed, Row} from './types'
import * as s from './scoring'
import data from './data'
import {type LinksInverted, invertLinks} from "./utils";

function compute(d: Product): Computed {
  const c: Computed = {
    linksInv: invertLinks(d),
    brand: s.brand(d),
    dimensions: s.dimensions(d),
    links: s.links(d),
    weight: s.weight(d),
    maxWeight: s.maxWeight(d),
    maxSpeed: s.maxSpeed(d),
    horsePower: s.horsePower(d),
    age: s.age(d),
    rating: s.rating(d),
    price: s.price(d),
    pickedBy: s.pickedBy(d),
    incline: s.incline(d),
    shock: s.shock(d),
    decibels: s.decibels(d),
    app: s.app(d),
    easyLube: s.easyLube(d),
    total: 0,
  }
  c.total = s.total(c)
  return c
}

export function getComputed(): {[k: string]: Computed} {
  return Object.fromEntries(
    Object.values(data).map(p => [
      p.key,
      compute(p)
    ])
  )
}