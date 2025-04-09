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
  // Map each key to its canonical brand and list of aliases
  const keyToBrandInfo: { [key: string]: { canonical: string, aliases: string[] } } = {};
  scores.forEach(s => {
    const brandName = data[s.key]?.brand?.name || '';
    // Trim aliases and filter out empty ones
    const aliases = brandName.includes(' / ')
      ? brandName.split(' / ').map(a => a.trim()).filter(Boolean)
      : [brandName.trim()].filter(Boolean);

    if (aliases.length > 0) {
      // Use the first alias as the canonical name for comparison purposes
      keyToBrandInfo[s.key] = { canonical: aliases[0], aliases: aliases };
    } else {
      // Handle cases where a product might not have a brand name listed
      keyToBrandInfo[s.key] = { canonical: `unknown_${s.key}`, aliases: [] };
    }
  });

  const usedBrands = new Set<string>(); // Tracks specific brand *aliases* already used in a pair
  const usedKeys = new Set<string>();   // Tracks items (keys) already used in a pair
  const combinations: Combos = [];

  // Iterate through scores (sorted by popularity) to pick the first item (A)
  for (let i = 0; i < scores.length; i++) {
    const keyA = scores[i].key;
    const infoA = keyToBrandInfo[keyA];

    // Skip if item A's key has already been used or has no brand info
    if (usedKeys.has(keyA) || !infoA) {
      continue;
    }

    // Find the first brand alias for item A that hasn't been used yet
    let brandA: string | undefined = undefined;
    for (const alias of infoA.aliases) {
      if (!usedBrands.has(alias)) {
        brandA = alias;
        break; // Found the first available alias for A
      }
    }

    // If no unused brand alias is found for item A, it cannot form a pair, so skip
    if (!brandA) {
      continue;
    }

    // Iterate through the remaining scores (more popular first) to find a partner (item B)
    for (let k = i + 1; k < scores.length; k++) {
      const keyB = scores[k].key;
      const infoB = keyToBrandInfo[keyB];

      // Skip if item B's key has already been used or has no brand info
      if (usedKeys.has(keyB) || !infoB) {
        continue;
      }

      // *** CRITICAL CHECK: Ensure items A and B represent DIFFERENT canonical brands ***
      if (infoA.canonical === infoB.canonical) {
        continue; // Don't pair aliases of the same underlying brand
      }

      // Find the first brand alias for item B that hasn't been used yet
      let brandB: string | undefined = undefined;
      for (const alias of infoB.aliases) {
        // We already know they are different canonical brands, just check if this specific alias is available
        if (!usedBrands.has(alias)) {
          brandB = alias;
          break; // Found the first available alias for B
        }
      }

      // If a suitable unused brand alias is found for item B
      if (brandB) {
        // A valid pair is found!
        combinations.push([
          { key: keyA, brand: brandA },
          { key: keyB, brand: brandB },
        ]);

        // Mark both the chosen brand *aliases* and the *keys* of items A and B as used
        usedBrands.add(brandA);
        usedBrands.add(brandB);
        usedKeys.add(keyA);
        usedKeys.add(keyB);

        // Item A has been successfully paired, break the inner loop (k)
        // to move to the next potential item A (next i)
        break;
      }
    }
    // Continue outer loop (i) to find a pair for the next available item
  }

  return combinations;
}
