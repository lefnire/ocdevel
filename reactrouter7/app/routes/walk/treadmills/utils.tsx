import type {Product} from "./data/types";
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

export function toFixed0(val: number | undefined) {
  let val_ = val ?? 0;
  if (val_ < 1) { val_ = val_ * 100 }
  return val_.toFixed(0);
}