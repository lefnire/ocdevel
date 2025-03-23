import type {Product} from "./types";
import _ from "lodash"

export const PAUSE_AMAZON = false;
export function getCurrentLink(product: Product) {
  return getCountryLink(product, "US")
}

// Helper function to get the URL for a country based on priority order
export const getCountryLink = (row: Product, countryCode: string): string | undefined => {
  // Define the paths to check in priority order
  const pathsToCheck = [
    `links.amazon.${countryCode}`,
    `links.brand.${countryCode}`,
    `brand.links.amazon.${countryCode}`,
    `brand.links.brand.${countryCode}`
  ];

  // Return the first non-undefined result
  return pathsToCheck.map(path => _.get(row, path)).find(Boolean);
};

export const getCountryCodes = (row: Product, includeBrand=false): string[] => {
  // Define sources to extract country codes from
  const sources = [
    _.keys(row.links?.amazon || {}),
    _.keys(row.links?.brand || {}),
  ];
  if (includeBrand) {
    sources.push(_.keys(row.brand?.links?.amazon || {}))
    sources.push(_.keys(row.brand?.links?.brand || {}))
  }

  // Flatten all sources and get unique values
  return _.uniq(_.flatten(sources));
};

export const getPrice = (product: Product) => product.price.sale || product.price.value;

export const nonBudgetNote = "These can bear more weight than the budget picks, and can run continuously for much longer. They're quieter, and they're likely to need less servicing. However, I can't in good faith recommend these, given I haven't needed to service my budget mills after 2 years; I contend that the budget picks are less an issue of quality; and more an issue of using them wisely, like non-continuous use."

export const budgetNote = "For lowest price mills, I recommend DeerRun instead. All the ultra-budget mills last around a year (at 40hrs / week). So if you're just testing the waters, prioritize cost (DeerRun); and if you want more value, upgrade to my mid-tier recommend. For Urevo budget mills, below are best price, no incline (except E3), less durable (but still very good). E3 has incline, but is very old and lacks shock absorption and motor venting. So I recommend E5 with a 2x4 under the head."