import _sumBy from "lodash/sumBy";
import _uniq from "lodash/uniq";
import data from "~/content/treadmills/data";
import type {Product} from "~/content/treadmills/data/types";

const withSeo = (
  Object.values(data)
  .map(obj => ({
    ...obj,
    seo: _sumBy(
      (obj.pickedBy?.websites || obj.brand.pickedBy?.websites || []),
      'value'
    )
  }))
  .filter((obj) => Boolean(obj.seo))
  .sort((a, b) => b.seo - a.seo)
)

export const seoLabels = _uniq(
  withSeo
  .map(obj => obj.brand.name.replaceAll(' / ', ', '))
)
export const seoScores = withSeo.map(s => ({
  key: s.key,
  score: s.seo
}))
