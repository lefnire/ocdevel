import React, {useRef} from 'react';
import {Button, Container} from 'react-bootstrap';
import { seoScored, dataObj } from './treadmills/data/index';
import {type CompareProps} from "~/routes/walk/treadmills/compare";
import _ from 'lodash'

// Helper function to get product combinations based on SEO scores
const getTopProductCombinations = (maxProducts = 10, maxCombinations = 30) => {
  const topProducts = seoScored.slice(0, maxProducts);
  
  // Generate all possible unique combinations (pairs)
  const combinations = [];
  for (let i = 0; i < topProducts.length; i++) {
    for (let j = i + 1; j < topProducts.length; j++) {
      combinations.push({
        a: topProducts[i],
        b: topProducts[j]
      });
      
      // Limit the number of combinations
      if (combinations.length >= maxCombinations) break;
    }
    if (combinations.length >= maxCombinations) break;
  }
  
  return combinations;
};

export default function BottomSection(props: CompareProps) {
  const i = useRef(0)
  if (props.isCompareMode) { return null; }
  // Get top product combinations based on SEO
  const productCombinations = getTopProductCombinations();

  function getBrandPart(name: string, j: number) {
    if (!name.includes(' / ')) { return name; }
    const parts = name.split(' / ')
    return parts[j % parts.length]
  }

  function renderButton(combo: {a: any, b: any}, j: number) {
    const {a, b} = combo
    const brandA = getBrandPart(a.brand.name, j)
    const brandB = getBrandPart(b.brand.name, j)
    i.current = i.current + 1
    return (
      <Button
        key={`compare-${i}`}
        variant="light"
        size="sm"
        className="me-2 whitespace-nowrap"
        onClick={() => props.handleCompare(a.key, b.key)}
      >
        {brandA} vs {brandB}
      </Button>
    );
  }
  
  return <Container>
    <h5 className='text-center'>Popular Comparisons</h5>
    <div className="d-flex overflow-auto pb-2">
      {productCombinations.map(renderButton)}
    </div>
  </Container>
}