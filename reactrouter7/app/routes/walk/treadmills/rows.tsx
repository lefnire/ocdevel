import {Brand, Product} from './data/types'
import * as r from './value-ranges'
import dayjs from 'dayjs'
import {produce} from 'immer'
import _ from 'lodash'
import data from './data/index'

function hydrateProduct(product: Product) {
  return produce(product, d => {
    d.brand.fakespot = d.brand.fakespot || "B"
    if (_.size(d.links.amazon) && !d.brand.warranty.amazon) {
      d.brand.warranty.amazon = 2 * 12 // Asurion
    }
    d.brand.rating = d.brand.rating ?? 5
    d.brand.bump = d.brand.bump ?? 0

    d.dimensions.value = d.dimensions.value || [
      r.dimensions.depth.median,
      r.dimensions.width.median,
      r.dimensions.height.median,
    ]
    // No easy guess
    d.weight.value = d.weight.value ?? r.weight.median
    // Common default is 265
    d.maxWeight.value = d.maxWeight.value ?? 265
    // Commonly 4.0, but often the unlisted / hidden ones turn out to be 3.8
    d.maxSpeed.value = d.maxSpeed.value ?? 3.8
    // Commonly 2.5, but if not listed it's suspicious
    d.horsePower.value = d.horsePower.value ?? 2.25
    // No easy value, just set to 2 years ago
    d.age.value = d.age.value ?? dayjs().subtract(2, 'year').toISOString()
    // TODO parse date here
    d.rating.value = d.rating.value ?? [
      [4.0, 0],
      [0, 0, 0, 0, 0]
    ]
    d.fakespot.value = d.fakespot.value ?? ["B", d.brand.fakespot]
    d.price.value = d.price.value ?? r.price.median
    d.pickedBy.value = d.pickedBy.value || []
    d.incline.value = d.incline.value || 0
    d.shock.value = d.shock.value || false
    d.decibels.value = d.decibels.value || 50
    d.sturdy.value = d.stury.value || 5
    d.app.value = d.app.value || false
    d.easyLube.value = d.easyLube.value || 5
    d.amazon.value = d.amazon.value || false
    d.material.value = d.material.value || "Alloy Steel"
  })
}

const hydrated = data.map(hydrateProduct)
export default hydrated
