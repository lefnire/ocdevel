import _sumBy from "lodash/sumBy";
import _uniq from "lodash/uniq";
import {dataKeys, dataObj} from "~/content/treadmills/data";

export const seoScored = (dataKeys
  .map((key) => {
    const obj = dataObj[key]
    return {
      ...obj,
      seo: _sumBy(
        (obj.pickedBy?.websites || obj.brand.pickedBy?.websites || []),
        'value'
      )
    }
  })
  .filter((obj) => Boolean(obj.seo))
  .sort((a, b) => b.seo - a.seo)
);

export const seoLabels = _uniq(seoScored
  .map(obj => obj.brand.name.replaceAll(' / ', ', '))
)