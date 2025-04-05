import Button from 'react-bootstrap/cjs/Button';
import Container from 'react-bootstrap/cjs/Container';
import {seoScores} from '~/content/treadmills/scoring/seo';
import {ProductContext} from "~/routes/walk/context";
import {useContext} from "react";
import data from '~/content/treadmills/data'

type KeyBrand = {key: string, brand: string}
const availableNames = Object.fromEntries(
  seoScores.map(s => {
    const brandName = data[s.key].brand.name
    const aliases = brandName.includes(' / ') ? brandName.split(' / ') : [brandName]
    return [s.key, aliases]
  })
)
const seenCombos: {[combo: string]: boolean} = {}
const combinations: [KeyBrand, KeyBrand][] = [];
let i = 0;
let j = seoScores.length - 1;
while (true) {
  if (Object.keys(availableNames).length < 2) { break; }
  const [a, b] = [seoScores[i], seoScores[j]];
  let brandA = availableNames[a.key].shift()
  if (!availableNames[a.key].length) {
    i += 1;
    delete availableNames[a.key]
  }
  let brandB = availableNames[b.key].shift()
  if (!availableNames[b.key].length) {
    j -= 1;
    delete availableNames[b.key]
  }

  // TODO delete this if we show models too
  if (seenCombos[`${brandA}${brandB}`]) { continue; }
  seenCombos[`${brandA}${brandB}`] = true;
  if (brandA === brandB) { continue; }

  combinations.push([
    {key: a.key, brand: brandA!},
    {key: b.key, brand: brandB!},
  ])
}

export default function CompareButtons() {
  const {isCompareMode, isFiltered, handleCompare} = useContext(ProductContext)
  if (isCompareMode) { return null; }
  if (isFiltered) { return null; }
  // Get top product combinations based on SEO

  function renderButton(combo: typeof combinations[0], i: number) {
    const [a, b] = combo
    return (
      <Button
        key={`compare-${i}`}
        variant="light"
        size="sm"
        className="me-2 whitespace-nowrap"
        onClick={() => handleCompare(a.key, b.key)}
      >
        {/*{a.brand} {dataObj[a.key].model} vs {b.brand} {dataObj[b.key].model}*/}
        {a.brand} vs {b.brand}
      </Button>
    );
  }
  
  return <Container>
    <h4 className='text-center'>Popular Comparisons</h4>
    <div className="d-flex overflow-auto pb-2">
      {combinations.map(renderButton)}
    </div>
  </Container>
}