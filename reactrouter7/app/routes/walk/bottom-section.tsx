import React from 'react';
import {Button, Container} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router';
import data, { dataObj } from './treadmills/data/index';

// CompareButton component for comparing two products
interface CompareButtonProps {
  product1Key: string;
  product2Key: string;
  className?: string;
}

const CompareButton: React.FC<CompareButtonProps> = ({ product1Key, product2Key, className = '' }) => {
  const [searchParam, setSearchParams] = useSearchParams();
  
  // Get product objects
  const product1 = dataObj[product1Key];
  const product2 = dataObj[product2Key];
  
  if (!product1 || !product2) return null;
  
  const handleCompare = () => {
    setSearchParams(params => {
      params.set('compare', `${product1Key},${product2Key}`)
      return params
    });
  };

  function randomPart(name) {
    if (!name.includes('/')) { return name; }
    const parts = name.split('/').map(p => p.trim())
    return parts[Math.random() * 3]
  }
  const brand1 = randomPart(product1.brand.name)
  const brand2 = randomPart(product2.brand.name)

  return (
    <Button
      variant="light"
      size="sm"
      className={`me-2 whitespace-nowrap ${className}`}
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
  // Get top product combinations based on SEO
  const productCombinations = getTopProductCombinations();
  
  return <Container>
    <h5 className='text-center'>Popular Comparisons</h5>
    <div className="d-flex overflow-auto pb-2">
      {productCombinations.map((combo, index) => (
        <CompareButton
          key={`compare-${index}`}
          product1Key={combo.product1Key}
          product2Key={combo.product2Key}
        />
      ))}
    </div>
  </Container>
}