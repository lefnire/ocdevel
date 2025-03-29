import type {PickedBy, Product} from "./data/types";
import _ from "lodash"

export const PAUSE_AMAZON = false;
export function getCurrentLink(product: Product) {
  return getCountryLink(product, "US")
}

// Helper function to get the URL for a country based on priority order
export const getCountryLink = (row: Product, countryCode: string): string | undefined => {
  // Check in priority order: model amazon, model brand, brand amazon, brand brand
  return _.get(row, `links.amazon.${countryCode}`) ||
         _.get(row, `links.brand.${countryCode}`) ||
         _.get(row, `brand.links.amazon.${countryCode}`) ||
         _.get(row, `brand.links.brand.${countryCode}`);
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

// Generic function to get links with labels from any links object
export function getLinksWithLabels(linksObj: any): {label: string, link: string}[] {
  const links: {label: string, link: string}[] = [];
  
  // Process Amazon links
  Object.entries(linksObj?.amazon || {}).forEach(([countryCode, link]) => {
    if (link) {
      links.push({
        label: `${countryCode}: Amazon`,
        link: link as string
      });
    }
  });
  
  // Process Brand links
  Object.entries(linksObj?.brand || {}).forEach(([countryCode, link]) => {
    if (link) {
      links.push({
        label: `${countryCode}: Brand`,
        link: link as string
      });
    }
  });
  
  return links;
}

// Get brand links with labels
export function getBrandLinks(row: Product): {label: string, link: string}[] {
  return getLinksWithLabels(row.brand?.links);
}

// Get model links with labels
export function getModelLinks(row: Product): {label: string, link: string}[] {
  return getLinksWithLabels(row.links);
}

// Get brand primary link (US Amazon or Brand link)
export function getBrandPrimaryLink(row: Product): string | undefined {
  return _.get(row, 'brand.links.amazon.US') || _.get(row, 'brand.links.brand.US');
}

// Determine if a link is Amazon or Brand
export function getLinkType(row: Product, link: string | undefined, defaultType: string = "Amazon"): string {
  if (!link) return defaultType;
  
  // For brand links
  if (link === _.get(row, 'brand.links.amazon.US') ||
      Object.values(row.brand?.links?.amazon || {}).includes(link)) {
    return "Amazon";
  }
  
  // For model links
  if (Object.values(row.links?.amazon || {}).includes(link)) {
    return "Amazon";
  }
  
  return "Brand";
}