import data from "~/content/treadmills/data";

/*
`data` is of type {
  brand: {pickedBy: {websites: {value: number}[]}, name: string}
  pickedBy: {websites: {value: number}[]}
}
 */

type Scores = {key: string, score: number}[]
type Labels = string[]
type ScoresAndLabels = {scores: Scores, labels: Labels}
export function getScoresAndLabels(): ScoresAndLabels {
  const withSeo = (
    Object.values(data)
    .map(obj => ({
      ...obj,
      seo: (obj.pickedBy?.websites || obj.brand.pickedBy?.websites || []).reduce(
        (sum, item) => sum + (item?.value || 0), 0
      )
    }))
    .filter((obj) => Boolean(obj.seo))
    .sort((a, b) => b.seo - a.seo)
  )

  const labels = [...new Set(
    withSeo
    .map(obj => obj.brand.name.replaceAll(' / ', ', '))
  )]
  const scores = withSeo.map(s => ({
    key: s.key,
    score: s.seo
  }))
  return {labels, scores}
}

/*
The goal of this function is to create pairs of all brand-name combinations, *without replacement*.
That is, if a brand name has been seen before, remove it from the list. But there's a gotcha:
Some brand names have aliases. Eg, product.brand.name for WalkingPad is "WalkingPad / KingSmith / Xiaomi".
So I want to convert that to 3 brand names to add to the list of combinations.

To keep the code simple, I start with BrandA on the left; and BrandB on the right, while-loop
them together until they meet in the middle. However, I want instead the more popular brands
to appear first; and since they're ordered by popularity, the current code has the BrandB
sequence ordering from *least* popular. So really, they should both move from the left.
 */
type KeyBrand = {key: string, brand: string}
export type Combos = [KeyBrand, KeyBrand][]
export function getCombos(scores: Scores): Combos {
  const availableNames = Object.fromEntries(
    scores.map(s => {
      const brandName = data[s.key].brand.name
      const aliases = brandName.includes(' / ') ? brandName.split(' / ') : [brandName]
      return [s.key, aliases]
    })
  )
  const seenCombos: {[combo: string]: boolean} = {}
  const combinations: [KeyBrand, KeyBrand][] = [];
  let i = 0;
  let j = scores.length - 1;
  while (true) {
    if (Object.keys(availableNames).length < 2) { break; }
    const [a, b] = [scores[i], scores[j]];
    let brandA = availableNames[a.key].shift()
    if (!availableNames[a.key].length) {
      i += 1;
      delete availableNames[a.key]
    }
    let brandB = availableNames[b.key].shift()
    if (!availableNames[b.key].length) {
      j -= 1;
      delete availableNames[b.key]
    }

    // TODO delete this if we show models too
    if (seenCombos[`${brandA}${brandB}`]) { continue; }
    seenCombos[`${brandA}${brandB}`] = true;
    if (brandA === brandB) { continue; }

    combinations.push([
      {key: a.key, brand: brandA!},
      {key: b.key, brand: brandB!},
    ])
  }
  return combinations
}
