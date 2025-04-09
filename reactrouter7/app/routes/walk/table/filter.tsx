import {type ChangeEvent, createContext, type FC, useCallback} from "react";
import type {
  Column, Row,
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/types';
import {columnsObj} from '~/content/treadmills/columns';
import Form from 'react-bootstrap/cjs/Form';
import {NA} from "~/content/treadmills/data/utils";
// import { useDebouncedCallback } from 'use-debounce'


// Filter component
export const Filter: FC<{
  column: Column<Product, unknown>;
}> = ({column}) => {
  const columnId = column.id;
  const colDef = columnsObj[columnId]
  const columnFilterValue = column.getFilterValue();
  const setFilter = column.setFilterValue
  const onChange = useCallback((e: ChangeEvent<any>, inputType: string) => {
    if (inputType === "min") {
      const val = e.target.value ? parseFloat(e.target.value) : undefined;
      setFilter((old: [number, number] | undefined) =>
        old ? [val, old[1]] : [val, undefined]
      );
    }
    else if (inputType === "max") {
      const val = e.target.value ? parseFloat(e.target.value) : undefined;
      setFilter((old: [number, number] | undefined) =>
        old ? [old[0], val] : [undefined, val]
      );
    }
    else if (inputType === "bool") {
      const value = e.target.value;
      if (value === '') {
        setFilter(undefined);
      } else if (value === 'true') {
        setFilter(true);
      } else if (value === 'false') {
        setFilter(false);
      }
    }
    else if  (inputType === "text") {
      setFilter(e.target.value)
    }
  }, [])
  // const onChange = useDebouncedCallback(onChange_, 300)

  // Use numeric filter for numeric columns
  if (colDef.dtype === "number") {
    const filterOptions = colDef?.filterOptions || {min: true, max: true};

    return (
      <div className="w-100 max-w-130px">
        <div className="d-flex gap-1 mb-1">
          {filterOptions.min && (
            <Form.Control
              type="number"
              value={columnFilterValue?.[0] ?? ''}
              onChange={e => onChange(e, 'min')}
              placeholder="Min"
              className="border rounded fs-7 p-1 w-50px h-24px"
            />
          )}
          {filterOptions.max && (
            <Form.Control
              type="number"
              value={columnFilterValue?.[1] ?? ''}
              onChange={e => onChange(e, 'max')}
              placeholder="Max"
              className="border rounded fs-7 p-1 w-50px h-24px"
            />
          )}
        </div>
      </div>
    );
  }

  // Use boolean filter for boolean columns
  if (colDef.dtype === "boolean") {
    return (
      <div className="w-100 max-w-130px">
        <Form.Select
          size="sm"
          value={columnFilterValue === undefined ? '' : String(columnFilterValue)}
          onChange={(e) => onChange(e, "bool")}
          className="mb-1 fs-7 p-1 h-24px"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Form.Select>
      </div>
    );
  }

  // Use text filter for other columns
  return (
    <div className="max-w-100px">
      <Form.Control
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => onChange(e, "text")}
        placeholder="Search"
        className="border rounded mb-1 fs-7 p-1 h-24px"
      />
    </div>
  );
};

export const filterFn = (row: Row<Product>, columnId: string, filterValue: any) => {
  const columnDef = columnsObj[columnId];
  const value = columnDef.getValue(row.original);

  if (value === undefined || value === null) return false;

  // Always include NA values
  if (value === NA) return true;

  // For numeric columns with range filtering
  if (columnDef.dtype === "number" && Array.isArray(filterValue)) {
    const [min, max] = filterValue;
    // NA check already happened, so value should be a number here
    const numValue = value as number;

    const filterOptions = columnDef.filterOptions || {min: true, max: true};

    if (filterOptions.min && min !== undefined && numValue < min) return false;
    if (filterOptions.max && max !== undefined && numValue > max) return false;

    return true;
  }

  // For boolean columns
  if (columnDef.dtype === "boolean" && typeof filterValue === 'boolean') {
    return value === filterValue;
  }

  // For string columns
  if (typeof filterValue === 'string') {
    return String(value).toLowerCase().includes(filterValue.toLowerCase());
  }

  return true;
}

export const sortingFn = (rowA: Row<Product>, rowB: Row<Product>, columnId: string) => {
  const columnDef = columnsObj[columnId];

  // Use getSortValue if available, otherwise use getValue
  const getValueFn = columnDef.getSortValue || columnDef.getValue;
  const valueA = getValueFn(rowA.original);
  const valueB = getValueFn(rowB.original);

  // Handle NA values: always rank highest
  const isValueANA = valueA === NA;
  const isValueBNA = valueB === NA;

  if (isValueANA && isValueBNA) return 0; // Both are NA
  if (isValueANA) return 1;  // A is NA, treat as larger (comes last in asc, first in desc)
  if (isValueBNA) return -1; // B is NA, treat as larger (comes last in asc, first in desc)

  // Compare based on data type for non-NA values
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA - valueB; // Simpler numeric comparison
  }

  // Fallback to string comparison
  return String(valueA).localeCompare(String(valueB));
}