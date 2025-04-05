import {useNavigate, useSearchParams} from "react-router";
import {createContext, type PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {columnsObj} from "~/content/treadmills/columns";
import data_ from '~/content/treadmills/data'
import type {Computed, Row} from '~/content/treadmills/computed'

export interface ProductContext {
  compareKeys: string[]
  isCompareMode: boolean
  filteredData: Row[]
  handleCompare: (key1: string, key2: string) => void
  handleShowAll: () => void
  isFiltered: boolean
  urlFilters: any[]
}
export const ProductContext = createContext<ProductContext>({
  compareKeys: [],
  isCompareMode: false,
  filteredData: [],
  handleCompare: () => {},
  handleShowAll: () => {},
  isFiltered: false,
  urlFilters: []
})

type ProductProvider = PropsWithChildren<{
  computed: {[k: string]: Computed}
}>
export function ProductProvider({computed, children}: ProductProvider) {
  // URL parameters for comparison
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const data = useMemo(() => {
    return Object.values(data_).map(obj => ({
      ...obj,
      c: computed[obj.key as keyof typeof computed]
    }))
  }, [computed])

  const compareParam = searchParams.get('compare');
  const [
    compareKeys,
    isCompareMode,
    filteredData
  ] = useMemo(() => {
    if (!compareParam) {
      return [ [], false, data ]
    }
    const compareKeys = compareParam.split(',')
    const isCompareMode = compareKeys.length > 0;
    const filteredData = data.filter(product => compareKeys.includes(product.key));
    return [compareKeys, isCompareMode, filteredData]
  }, [compareParam])

  const handleCompare = useCallback((key1: string, key2: string) => {
    setSearchParams(params => {
      params.set('compare', `${key1},${key2}`)
      return params
    });
  }, []);

  const handleShowAll = useCallback(() => {
    navigate('/walk')
    // searchParams.delete('compare');
    // setSearchParams(searchParams);
  }, [])


  const [columnFilters, setColumnFilters] = useState<any[]>([])
  // Apply filters from URL search parameters
  const [
    urlFilters,
    isFiltered,
  ] = useMemo(() => {
    const filters: any[] = [];

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
              filters.push({
                id: columnId,
                value: [min, max]
              });
            } else {
              // Single value - treat according to filterOptions
              const parsedValue = parseFloat(value);
              if (filterOptions.min && !filterOptions.max) {
                // If only min is enabled, treat as minimum
                filters.push({
                  id: columnId,
                  value: [parsedValue, undefined]
                });
              } else if (!filterOptions.min && filterOptions.max) {
                // If only max is enabled, treat as maximum
                filters.push({
                  id: columnId,
                  value: [undefined, parsedValue]
                });
              } else {
                // If both are enabled or neither is specified, default to minimum
                filters.push({
                  id: columnId,
                  value: [parsedValue, undefined]
                });
              }
            }
          } else if (columnDef.dtype === "boolean") {
            // For boolean columns
            filters.push({
              id: columnId,
              value: value.toLowerCase() === 'true'
            });
          } else {
            // For string columns
            filters.push({
              id: columnId,
              value: value
            });
          }
        }
      }
    });

    // Update column filters on if lenght > 0?
    // if (newFilters.length > 0) { ...}
    const isFiltered = filters.length > 0
    return [filters, isFiltered]

  }, [searchParams]);


  const contextValue = {
    compareKeys,
    isCompareMode,
    filteredData,
    handleCompare,
    handleShowAll,
    urlFilters,
    isFiltered,
  }
  return <ProductContext.Provider value={contextValue}>
    {children}
  </ProductContext.Provider>
}