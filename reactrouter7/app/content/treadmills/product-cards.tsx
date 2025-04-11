// import premium, {card as premiumCard} from '~/content/treadmills/data/lifespan/tx6'
import premium, {card as premiumCard} from '~/content/treadmills/data/walkolution/walkolution2'
// import value, {card as valueCard} from '~/content/treadmills/data/urevo/cyberpad'
import value, {card as valueCard} from '~/content/treadmills/data/urevo/strol2spro'
// import value, {card as valueCard} from '~/content/treadmills/data/urevo/3s'
// import budget, {card as budgetCard} from '~/content/treadmills/data/deerrun/q1mini'
// import budget, {card as budgetCard} from '~/content/treadmills/data/sperax/motioneaselitep1'
import budget, {card as budgetCard} from '~/content/treadmills/data/sperax/incline'
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import type {CardIn, CardOut, Product} from "~/content/treadmills/types";
import {VideoButton} from "~/components/video-btn";
import links from '~/content/product-links'

const VIDEOS = false

type LinkCardIn = CardIn & {key: string}

// import matImg from '~/assets/products/sunny_mat_.jpg?w=100&h=100&format=webp&effort=max'
// const matKey = "sunny_mat"
import matImg from '~/assets/products/urevo_mat.jpg?w=100&h=100&format=webp&effort=max'
const matKey = "urevo_mat"
const mat = {
  urevo_mat: {cardTitle: "Urevo"},
  sekoday: {cardTitle: "Sunny"}
}[matKey]
const matCard: LinkCardIn = {
  ...mat,
  key: matKey,
  image: matImg,
  notes: 'Prevents floor damage, protects knees',
  linkText: "Amazon"
}

import deskImg from '~/assets/products/flexispot_en1.jpg?w=100&h=100&format=webp&effort=max'
const deskCard: LinkCardIn = {
  image: deskImg,
  key: "flexispot_en1",
  cardTitle: "FlexiSpot",
  video: "https://www.youtube.com/watch?v=al0tiXKCBdQ",
  notes: 'Electric sit/stand',
  linkText: `Amazon`
}
import lubeImg from '~/assets/products/sekoday_lube.jpg?w=100&h=100&format=webp&effort=max'
const lubeKey = "sekoday_lube"
// import lubeImg from '~/assets/products/godora_lube.jpg?w=100&h=100&format=webp&effort=max'
// const lubeKey = "godora_lube"
const lube = {
  godora_lube: {cardTitle: "Godora"},
  sekoday_lube: {cardTitle: "Sekoday"}
}[lubeKey]
const lubeCard: LinkCardIn = {
  ...lube,
  image: lubeImg,
  key: lubeKey,
  video: "https://www.youtube.com/shorts/QK-BGSrCFXY",
  notes: "Silicone treadmill lubricant. Apply every 50hrs",
  linkText: "Amazon",
}

type Picks = {[k: string]: CardOut}
const picks: Picks = {
  premium: productToCard("Premium", premium, premiumCard),
  value: productToCard("Value", value, valueCard),
  budget: productToCard("Budget", budget, budgetCard),
  mat: linkToCard("Mat", matCard),
  lube: linkToCard("Lube", lubeCard),
  desk: linkToCard("Desk", deskCard),
}
export default picks

function withNotes(notes: string, video?: string) {
  if (!(VIDEOS && video)) { return notes }
  return <div>
    <span>{notes}</span>
    <VideoButton href={video} />
  </div>
}
function productToCard(pickType: string, obj: Product, card: CardIn): CardOut {
  const buyOn = obj.links.amazon?.US ? "Amazon" : obj.brand.name
  const defaultTitle = `${obj.brand.name} ${obj.model.value}`
  const price = getPrice(obj)
  const notes = withNotes(card.notes, obj.video)
  return {
    ...card,
    key: obj.key,
    title: obj.model.value,
    cardTitle: `${pickType}: ${card.cardTitle || defaultTitle}`,
    price,
    link: getCurrentLink(obj),
    linkText: `$${price} on ${buyOn}`,
    notes,
  }
}

function linkToCard(pickType: string, card: LinkCardIn): CardOut {
  const obj = links[card.key]
  return {
    ...obj,
    ...card,
    cardTitle: `${pickType}: ${card.cardTitle}`,
    notes: withNotes(card.notes, card.video),
    linkText: `$${obj.price} on ${card.linkText}`
  }
}