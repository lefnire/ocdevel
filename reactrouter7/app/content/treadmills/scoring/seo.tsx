import data from "~/content/treadmills/data";
import type {Product} from "~/content/treadmills/types";
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
  function seoScore(obj: Product) {
    const picks = [
      ...(obj.pickedBy?.websites || obj.brand.pickedBy?.websites || []),
      ...(obj.pickedBy?.affiliate || obj.brand.pickedBy?.affiliate || []),
    ]
    return picks.reduce((sum, pick) => (
      sum + (pick?.value || 0)
    ), 0)
  }
  const withSeo = (
    Object.values(data)
    .map(obj => ({
      ...obj,
      seo: seoScore(obj)
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
 * Generates unique pairs of treadmill brands based on popularity scores.
 *
 * - Takes a list of scores (`{key: string, score: number}`) sorted by popularity (descending).
 * - Handles brand aliases (e.g., "BrandA / BrandB" results in two potential names).
 * - Pairs items starting from the most popular.
 * - Ensures that each *item* (identified by its key) is used in at most one pair.
 * - Ensures that each specific *brand alias* is used in at most one pair across all combinations.
 * - Critically, prevents pairing two items that represent the *same underlying brand* (even if using different aliases).
 * - Returns an array of pairs, where each pair contains `{key, brand}` for the two items.
 */
type KeyBrand = {key: string, brand: string}
export type Combos = [KeyBrand, KeyBrand][]
export function getCombos(scores: Scores): Combos {
  // --- Configuration for Manual Pairings ---
  // Add pairs using the *canonical* (first listed) brand name.
  const manualPairingsConfig: [string, string][] = [
    ["Urevo", "DeerRun"],
    ["LifeSpan", "Walkolution"],
    // Add more manual pairs here as needed
  ];
  // -----------------------------------------

  // 1. Prepare Brand Information: Map each item key to its canonical brand and aliases.
  const keyToBrandInfo: { [key: string]: { canonical: string, aliases: string[] } } = {};
  scores.forEach(s => {
    const brandName = data[s.key].brand.name;
    const aliases = brandName.split(' / ').map(a => a.trim());
    keyToBrandInfo[s.key] = { canonical: aliases[0], aliases };
  });

  const usedBrandAliases = new Set<string>(); // Tracks specific brand *aliases* already used
  const usedItemKeys = new Set<string>();   // Tracks item *keys* already used
  const combinations: Combos = [];

  // 2. Process Manual Pairings First
  manualPairingsConfig.forEach(([canonicalA, canonicalB]) => {
    // Find the *first available* (most popular) item matching canonicalA
    const itemA = scores.find(s => keyToBrandInfo[s.key]?.canonical === canonicalA && !usedItemKeys.has(s.key));
    // Find the *first available* (most popular) item matching canonicalB
    const itemB = scores.find(s => keyToBrandInfo[s.key]?.canonical === canonicalB && !usedItemKeys.has(s.key));

    if (itemA && itemB) {
      const keyA = itemA.key;
      const keyB = itemB.key;
      const infoA = keyToBrandInfo[keyA];
      const infoB = keyToBrandInfo[keyB];

      // Find the first available alias for each
      const brandA = infoA.aliases.find(alias => !usedBrandAliases.has(alias));
      const brandB = infoB.aliases.find(alias => !usedBrandAliases.has(alias));

      // If usable aliases are found for both, create the manual pair
      if (brandA && brandB) {
        combinations.push([
          { key: keyA, brand: brandA },
          { key: keyB, brand: brandB },
        ]);
        // Mark as used
        usedItemKeys.add(keyA);
        usedItemKeys.add(keyB);
        usedBrandAliases.add(brandA);
        usedBrandAliases.add(brandB);
      }
    }
  });

  // 3. Generate Remaining Combinations Algorithmically
  for (let i = 0; i < scores.length; i++) {
    const keyA = scores[i].key;
    const infoA = keyToBrandInfo[keyA];

    // Skip if item A is already paired (manually or algorithmically)
    if (usedItemKeys.has(keyA)) {
      continue;
    }

    // Find the first available (unused) alias for item A
    const brandA = infoA.aliases.find(alias => !usedBrandAliases.has(alias));

    // If no unused alias found for A, it can't be paired; move to the next item
    if (!brandA) {
      continue;
    }

    // Try to find a partner (item B) for item A
    for (let k = i + 1; k < scores.length; k++) {
      const keyB = scores[k].key;
      const infoB = keyToBrandInfo[keyB];

      // Skip if item B is already paired or is the same canonical brand as A
      if (usedItemKeys.has(keyB) || infoA.canonical === infoB.canonical) {
        continue;
      }

      // Find the first available (unused) alias for item B
      const brandB = infoB.aliases.find(alias => !usedBrandAliases.has(alias));

      // If a suitable alias for B is found, create the pair
      if (brandB) {
        // Add the algorithmic pair
        combinations.push([
          { key: keyA, brand: brandA },
          { key: keyB, brand: brandB },
        ]);

        // Mark the used aliases and item keys
        usedBrandAliases.add(brandA);
        usedBrandAliases.add(brandB);
        usedItemKeys.add(keyA);
        usedItemKeys.add(keyB);

        // Item A is now paired, break the inner loop to find the next item A
        break;
      }
    }
  }

  return combinations;
}
