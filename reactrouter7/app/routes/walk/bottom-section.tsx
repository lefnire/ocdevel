import React from 'react';
import {Button, Container} from 'react-bootstrap';
import data, { dataObj } from './treadmills/data/index';
import {useSearchParams} from "react-router";
import {useStore} from "./treadmills/store";

// Simple function to get a part by index, cycling through all parts
function getPart(name: string, index: number): string {
  if (!name.includes('/')) { return name; }
  
  const parts = name.split('/').map(p => p.trim()).filter(p => p);
  if (parts.length === 0) return name;
  
  // Use modulo to cycle through the parts based on index
  const partIndex = index % parts.length;
  return parts[partIndex];
}

type CompareButtonProps = {
  key1: string;
  key2: string;
  index: number; // Add index prop to cycle through parts
}
const CompareButton: React.FC<CompareButtonProps> = ({
  key1,
  key2,
  index,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  function handleCompare() {
    setSearchParams(params => {
      params.set('compare', `${key1},${key2}`)
      return params
    });
  }

  // Get product objects
  const product1 = dataObj[key1];
  const product2 = dataObj[key2];
  
  if (!product1 || !product2) return null;

  // Use deterministic selection based on button index
  const brand1 = getPart(product1.brand.name, index);
  const brand2 = getPart(product2.brand.name, index + 1); // Offset for variety

  return (
    <Button
      variant="light"
      size="sm"
      className="me-2 whitespace-nowrap"
      onClick={handleCompare}
    >
      {brand1} vs {brand2}
    </Button>
  );
};

// Helper function to get product combinations based on SEO scores
const getTopProductCombinations = (maxProducts = 10, maxCombinations = 30) => {
  // Filter products with SEO scores and ensure they're not filtered out
  const productsWithSEO = data.filter(product => product.seo);
  
  // Sort by SEO score (descending)
  const sortedProducts = [...productsWithSEO].sort((a, b) =>
    (b.seo || 0) - (a.seo || 0)
  );

  // Take top N products
  const topProducts = sortedProducts.slice(0, maxProducts);
  
  // Generate all possible unique combinations (pairs)
  const combinations = [];
  for (let i = 0; i < topProducts.length; i++) {
    for (let j = i + 1; j < topProducts.length; j++) {
      combinations.push({
        product1Key: topProducts[i].key,
        product2Key: topProducts[j].key
      });
      
      // Limit the number of combinations
      if (combinations.length >= maxCombinations) break;
    }
    if (combinations.length >= maxCombinations) break;
  }
  
  return combinations;
};

export default function BottomSection() {
  const isCompareMode = useStore(s => s.isCompareMode)
  if (isCompareMode) { return null; }
  // Get top product combinations based on SEO
  const productCombinations = getTopProductCombinations();
  
  return <Container>
    <h5 className='text-center'>Popular Comparisons</h5>
    <div className="d-flex overflow-auto pb-2">
      {productCombinations.map((combo, index) => (
        <CompareButton
          key={`compare-${index}`}
          key1={combo.product1Key}
          key2={combo.product2Key}
          index={index} // Pass the index to cycle through parts
        />
      ))}
    </div>
  </Container>
}