import data from "~/content/treadmills/data";
import type {Product} from "~/content/treadmills/types";

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

export const seoLabels = [...new Set(
  withSeo
  .map(obj => obj.brand.name.replaceAll(' / ', ', '))
)]
export const seoScores = withSeo.map(s => ({
  key: s.key,
  score: s.seo
}))
