import React, {useRef} from 'react';
import {Button, Container} from 'react-bootstrap';
import { seoScored, dataObj } from './treadmills/data/index';
import {type CompareProps} from "~/routes/walk/url-listener";
import TDECalculator from "~/routes/walk/tdee";

type KeyBrand = {key: string, brand: string}
const availableNames = Object.fromEntries(seoScored.map(row => ([
  row.key,
  row.brand.name.includes(' / ') ? row.brand.name.split(' / ') : [row.brand.name]
])))
const seenCombos: {[combo: string]: boolean} = {}
const combinations: [KeyBrand, KeyBrand][] = [];
let i = 0;
let j = seoScored.length - 1;
while (true) {
  if (Object.keys(availableNames).length < 2) { break; }
  const [a, b] = [seoScored[i], seoScored[j]];
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

export default function BottomSection(props: CompareProps) {
  if (props.isCompareMode) { return null; }
  if (props.isFiltered) { return null; }
  // Get top product combinations based on SEO

  function renderButton(combo: typeof combinations[0], i: number) {
    const [a, b] = combo
    return (
      <Button
        key={`compare-${i}`}
        variant="light"
        size="sm"
        className="me-2 whitespace-nowrap"
        onClick={() => props.handleCompare(a.key, b.key)}
      >
        {/*{a.brand} {dataObj[a.key].model} vs {b.brand} {dataObj[b.key].model}*/}
        {a.brand} vs {b.brand}
      </Button>
    );
  }
  
  return <Container>
    <h5 className='text-center'>Popular Comparisons</h5>
    <div className="d-flex overflow-auto pb-2">
      {combinations.map(renderButton)}
    </div>
    <TDECalculator />
  </Container>
}