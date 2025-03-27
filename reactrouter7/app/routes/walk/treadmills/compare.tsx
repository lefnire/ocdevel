import {useNavigate, useSearchParams} from "react-router";
import {useMemo} from "react";
import data, {type Product} from './rows'

export interface CompareProps {
  compareKeys: string[]
  isCompareMode: boolean
  filteredData: Product[]
  handleShowAll: () => void
  handleCompare: (key1: string, key2: string) => void
}
export function useCompare(): CompareProps {
  // URL parameters for comparison
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get comparison keys from URL
  const compareParam = searchParams.get('compare');
  const compareKeys = useMemo(() =>
    compareParam ? compareParam.split(',') : []
  , [compareParam]);
  const isCompareMode = compareKeys.length > 0;

  // Filter data based on comparison keys
  const filteredData: Product[] = useMemo(() => {
    if (!isCompareMode) return data;
    return data.filter(product => compareKeys.includes(product.key));
  }, [compareKeys, isCompareMode]);

  const handleShowAll = () => {
    // Remove the compare parameter from the URL
    navigate('/walk')
    // searchParams.delete('compare');
    // setSearchParams(searchParams);
  };

  const handleCompare = (key1: string, key2: string) => {
    setSearchParams(params => {
      params.set('compare', `${key1},${key2}`)
      return params
    });
  };

  return {
    compareKeys,
    isCompareMode,
    filteredData,
    handleShowAll,
    handleCompare,
  }
}