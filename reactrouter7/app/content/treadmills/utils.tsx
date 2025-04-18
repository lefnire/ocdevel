import type {PickedBy, Product} from "./types";
import type {Row} from './types'
import _get from 'lodash/get'
import Badge from 'react-bootstrap/cjs/Badge';
import {Affiliate} from "~/content/product-links";
import {memo} from "react";

export const PAUSE_AMAZON = false;
export function getCurrentLink(product: Product): string {
  return getCountryLink(product, "US") || getCountryLink(product, "ALL")
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
  return pathsToCheck.map(path => _get(row, path)).find(Boolean);
};

export const getCountryCodes = (row: Product, includeBrand=false): string[] => {
  // Define sources to extract country codes from
  const sources = [
    Object.keys(row.links?.amazon || {}),
    Object.keys(row.links?.brand || {}),
  ];
  if (includeBrand) {
    sources.push(Object.keys(row.brand?.links?.amazon || {}))
    sources.push(Object.keys(row.brand?.links?.brand || {}))
  }

  // Flatten all sources and get unique values
  return [...new Set(sources.flat())];
};

export const getPrice = (product: Product): number => {
  return product.price.sale || product.price.value;
}

export function toFixed0(val: number | undefined) {
  let val_ = val ?? 0;
  if (val_ < 1) { val_ = val_ * 100 }
  return val_.toFixed(0);
}

export const ScoreInfo = memo(() => {
  return <>
    <p><strong>Score</strong> is a weighted sum of each rows' attributes. "Weighted" because some attributes are more important than others. Eg, <strong>App</strong> support has <code>weight=1</code>, where <strong>Sturdy</strong> has <code>weight=10</code>. You can see how each cell ranks in the bottom corner of that cell, eg <Badge bg="success">10</Badge></p>
    <div>This is particularly interesting for <strong>Star Rating</strong>. The value shown in the cell is the rating (usually from Amazon). But the bottom-right number is the adjusted rating:
      <ul className="m-0">
        <li>star ratings, downplayed if too few ratings present</li>
        <li>modified by the FakeSpot grade, for both the product and company</li>
        <li>and taking 1-star skew into consideration</li>
      </ul> So in reality, that little number is more valuable than the rating itself.
    </div>
  </>
})

// FIXME make these dynamic (pulled from available options in dat)
export const countries = {
  order: ["ALL", "US", "CA", "UK", "EU", "AU"], // Add "ALL" first
  buyOrder: ["amazon", "brand"],
  emojis: {"ALL": "🌍", "US": "🇺🇸", "CA": "🇨🇦", "UK": "🇬🇧", "EU": "🇪🇺", "AU": "🇦🇺"} // Add emoji for "ALL"
} as const

// Type for the country-specific links
type CountryLinks = Record<string, string>;

export type LinksInverted = {
  [countryCode: string]: {
    product: CountryLinks | false
    brand: CountryLinks | false
    either: CountryLinks | false
  }
}

/**
 * Creates a structured links object with product, brand, and fallback links organized by country
 * @param row Product object containing links
 * @returns LinksFull object with links organized by country and source
 */
export function invertLinks(row: Product): LinksInverted {
  // Ensure links objects exist
  const productLinks = row.links || { amazon: {}, brand: {} };
  const brandLinks = row.brand?.links || { amazon: {}, brand: {} };
  
  // Create result object with all countries from the defined order
  return countries.order.reduce((result, countryCode) => {
    // Get links for this country from all sources
    const linksForCountry = countries.buyOrder.reduce((acc, site) => {
      // Get links from product and brand
      const productLink = productLinks[site]?.[countryCode];
      const brandLink = brandLinks[site]?.[countryCode];
      
      // Only add non-empty links
      if (productLink) acc.product[site] = productLink;
      if (brandLink) acc.brand[site] = brandLink;
      if (productLink || brandLink) acc.either[site] = productLink || brandLink;
      
      return acc;
    }, {
      product: {} as CountryLinks,
      brand: {} as CountryLinks,
      either: {} as CountryLinks
    });
    
    // Convert empty objects to false for cleaner representation
    result[countryCode] = {
      product: Object.keys(linksForCountry.product).length === 0 ? false : linksForCountry.product,
      brand: Object.keys(linksForCountry.brand).length === 0 ? false : linksForCountry.brand,
      either: Object.keys(linksForCountry.either).length === 0 ? false : linksForCountry.either
    };
    
    return result;
  }, {} as LinksInverted);
}

type ObjType = 'product' | 'brand'
export function renderCountryLinks(row: Row, objType: ObjType, oneCountry?:string) {
  const siteNames = {
    amazon: "Amazon",
    brand: {brand: "Company Website", product: "Product Page"}[objType]
  }
  const countries_ = oneCountry ? [oneCountry] : countries.order
  const links = countries_.flatMap(code => (
    countries.buyOrder.map((site, i) => {
      // @ts-ignore
      const val = row.c.linksInv[code]?.[objType]?.[site] as any as string
      if (!val) { return null; }
      const aff = {key: row.key, link: val}
      return <div key={`link-brand-${row.key}-${code}-${site}`}>
        <Affiliate product={aff}>
          {countries.emojis[code]} {siteNames[site]}
        </Affiliate>
      </div>
    })
  ))
  return links
}

export function renderReferences(row: Row, objType: ObjType) {
  const picks = (objType === 'brand' ? row.brand : row).pickedBy
  const references = ([
    // ...(picks.websites || []),
    ...(picks.trusted || []),
  ]).map(w => {
    if (!(w.label && w.url)) { return null; }
    return w
  }).filter(Boolean)
  if (!references.length) { return null; }
  return <div>
    <h5 className='text-muted mt-2'>References</h5>
    {references.map(r => <li key={r.url}>
      <a target="_blank" href={r.url}>{r.label}</a>
    </li>)}
  </div>
}