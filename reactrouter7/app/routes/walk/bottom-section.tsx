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
  
  return (
    <Button
      variant="light"
      size="sm"
      className={`me-2 whitespace-nowrap ${className}`}
      onClick={handleCompare}
    >
      {product1.brand.name} vs {product2.brand.name}
    </Button>
  );
};

export default function BottomSection() {
  return <Container>
    <h5 className='text-center'>Popular Comparisons</h5>
    <div className="d-flex overflow-auto pb-2">
      <CompareButton
        product1Key="egofit_m2"
        product2Key="urevo_cyberpad"
      />
      <CompareButton
        product1Key="sperax_motioneaselitep1"
        product2Key="deerrun_q1mini"
      />
      <CompareButton
        product1Key="walkingpad_z1"
        product2Key="sperax_motioneaselitep1"
      />
      <CompareButton
        product1Key="imovr_unsit"
        product2Key="lifespan_tr1200"
      />
      <CompareButton
        product1Key="goplus_goplus"
        product2Key="goyouth_2in1"
      />
      <CompareButton
        product1Key="walkingpad_z1"
        product2Key="goplus_goplus"
      />
      {/* Add more comparison buttons as needed */}
    </div>
  </Container>
}