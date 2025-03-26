import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useMemo} from "react";
import data, {type Product} from './rows'
import {columnsObj} from './columns'
import {create} from 'zustand'

export const useStore = create<{
  compareKeys: string[]
  isCompareMode: boolean
  filteredData: Product[]
  urlFilters: any[]
}>()((set, get) => ({
  compareKeys: [],
  isCompareMode: false,
  filteredData: data,
  urlFilters: [],
}))

export function SearchListener() {
  // URL parameters for comparison
  const [searchParams, setSearchParams] = useSearchParams();

  const compareParam = searchParams.get('compare');
  const compareKeys = useMemo(() =>
    compareParam ? compareParam.split(',') : []
  , [compareParam]);
  const isCompareMode = compareKeys.length > 0;

  useEffect(() => {
    // Filter data based on comparison keys
    const filteredData = !isCompareMode ? data
        : data.filter(product => compareKeys.includes(product.key));
    useStore.setState({
      filteredData,
      isCompareMode,
      compareKeys,
    })
  }, [compareKeys, isCompareMode])

  // Apply filters from URL search parameters
  useEffect(() => {
    const newFilters: any[] = [];

    // Look for filter parameters in the URL (format: filter_columnId=value)
    searchParams.forEach((value, key) => {
      if (key.startsWith('filter_')) {
        const columnId = key.replace('filter_', '');

        // Only add filter if the column exists
        if (columnsObj[columnId]) {
          const columnDef = columnsObj[columnId];

          // Handle different data types
          if (columnDef.dtype === "number") {
            // For numeric columns, check if it's a range (min-max)
            if (value.includes('-')) {
              const [min, max] = value.split('-').map(v => parseFloat(v));
              newFilters.push({
                id: columnId,
                value: [min, max]
              });
            } else {
              // Single value treated as minimum
              newFilters.push({
                id: columnId,
                value: [parseFloat(value), undefined]
              });
            }
          } else if (columnDef.dtype === "boolean") {
            // For boolean columns
            newFilters.push({
              id: columnId,
              value: value.toLowerCase() === 'true'
            });
          } else {
            // For string columns
            newFilters.push({
              id: columnId,
              value: value
            });
          }
        }
      }
    });

    // Update column filters
    if (newFilters.length > 0) {
      useStore.setState({
        urlFilters: newFilters,
        isCompareMode: true
      });
    }
  }, [searchParams]);

  return null;
}