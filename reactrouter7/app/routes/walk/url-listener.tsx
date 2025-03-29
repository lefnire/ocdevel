import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useMemo, useRef, useState} from "react";
import {columnsObj} from "./treadmills/columns";
import data, {type Product} from './treadmills/rows'

export interface CompareProps {
  compareKeys: string[]
  isCompareMode: boolean
  filteredData: Product[]
  handleCompare: (key1: string, key2: string) => void
  isFiltered: boolean
  columnFilters: any[]
}
export function useCompare(): CompareProps {
  // URL parameters for comparison
  const [searchParams, setSearchParams] = useSearchParams();

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
    handleCompare,
  }
}

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [columnFilters, setColumnFilters] = useState<any[]>([])
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
            // Get filter options for this column
            const filterOptions = columnDef.filterOptions || { min: true, max: true };

            // For numeric columns, check if it's a range (min-max)
            if (value.includes('-')) {
              const [min, max] = value.split('-').map(v => parseFloat(v));
              newFilters.push({
                id: columnId,
                value: [min, max]
              });
            } else {
              // Single value - treat according to filterOptions
              const parsedValue = parseFloat(value);
              if (filterOptions.min && !filterOptions.max) {
                // If only min is enabled, treat as minimum
                newFilters.push({
                  id: columnId,
                  value: [parsedValue, undefined]
                });
              } else if (!filterOptions.min && filterOptions.max) {
                // If only max is enabled, treat as maximum
                newFilters.push({
                  id: columnId,
                  value: [undefined, parsedValue]
                });
              } else {
                // If both are enabled or neither is specified, default to minimum
                newFilters.push({
                  id: columnId,
                  value: [parsedValue, undefined]
                });
              }
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
    // if (newFilters.length > 0) {
      setColumnFilters(newFilters);
    // }
  }, [searchParams]);
  return {
    columnFilters,
    isFiltered: columnFilters.length > 0,
  }
}