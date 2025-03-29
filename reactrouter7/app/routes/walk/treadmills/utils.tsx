import type {PickedBy, Product} from "./data/types";
import _ from "lodash"
import React from "react";
import {Badge} from "react-bootstrap";

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

export function ScoreInfo() {
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
}

// FIXME make these dynamic (pulled from available options in dat)
export const countries = {
  order: ["US", "CA", "UK"],
  buyOrder: ["amazon", "brand"],
  emojis: {"US": "🇺🇸", "CA": "🇨🇦", "UK": "🇬🇧"}
}

// Type for the country-specific links
type CountryLinks = {
  amazon?: string,
  brand?: string
} | boolean;

export type LinksFull = {
  [countryCode: string]: {
    product: CountryLinks
    brand: CountryLinks
    either: CountryLinks
  }
}

/**
 * Creates a structured links object with product, brand, and fallback links organized by country
 * @param row Product object containing links
 * @returns LinksFull object with links organized by country and source
 */
export function hydrateLinks(row: Product): LinksFull {
  const linksFull: LinksFull = {};

  // Process each country in the defined order
  countries.order.forEach(code => {
    // Initialize country entry with all false values
    linksFull[code] = {
      product: false,
      brand: false,
      either: false
    };
    
    // Track if we found any links for this country
    let foundProductLink = false;
    let foundBrandLink = false;
    
    // Process sites in reverse order for more elegant assignment
    [...countries.buyOrder].reverse().forEach(site => {
      // Check for product links
      if (row.links?.[site]?.[code]) {
        if (!foundProductLink) {
          linksFull[code].product = {
            [site]: row.links[site][code]
          };
          foundProductLink = true;
        } else if (typeof linksFull[code].product === 'object') {
          // Add to existing object if we already found a link
          (linksFull[code].product as CountryLinks)[site] = row.links[site][code];
        }
      }
      
      // Check for brand links
      if (row.brand?.links?.[site]?.[code]) {
        if (!foundBrandLink) {
          linksFull[code].brand = {
            [site]: row.brand.links[site][code]
          };
          foundBrandLink = true;
        } else if (typeof linksFull[code].brand === 'object') {
          // Add to existing object if we already found a link
          (linksFull[code].brand as CountryLinks)[site] = row.brand.links[site][code];
        }
      }
      
      // Set either links (giving preference to product links over brand links)
      const productLink = row.links?.[site]?.[code];
      const brandLink = row.brand?.links?.[site]?.[code];
      
      if (productLink || brandLink) {
        const link = productLink || brandLink;
        
        if (linksFull[code].either === false) {
          linksFull[code].either = { [site]: link };
        } else if (typeof linksFull[code].either === 'object') {
          // Only add if we don't already have this site
          if (!(site in linksFull[code].either)) {
            (linksFull[code].either as CountryLinks)[site] = link;
          }
        }
      }
    });
  });
  
  return linksFull;
}