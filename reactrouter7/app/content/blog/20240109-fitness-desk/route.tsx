import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { data } from './treadmills/data';
import columnInfo from './treadmills/columns';
import { OverlayTrigger, Popover, Form, InputGroup } from 'react-bootstrap';
import type { Product } from './treadmills/types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export * from './meta.js';

// Define the column info type
interface ColumnInfo {
  label: string;
  dtype: string;
  description?: string;
  rating: number;
  notes?: () => React.ReactElement;
}

// Helper function to calculate the final score for a product
const calculateFinalScore = (product: Product): number => {
  let totalScore = 0;
  let totalWeight = 0;

  // Process each attribute that has a rating
  Object.entries(product).forEach(([key, attr]) => {
    // Skip non-attribute properties
    if (!attr || typeof attr !== 'object' || !('rating' in attr)) {
      return;
    }

    // Get the column info for this attribute
    const colInfo = columnInfo[key as keyof typeof columnInfo];
    if (!colInfo || typeof colInfo.rating !== 'number') {
      return;
    }

    // Get the attribute rating
    const attrRating = attr.rating as number;
    if (typeof attrRating !== 'number') {
      return;
    }

    // Special handling for complex attributes
    let adjustedRating = attrRating;

    // For rating attribute (star ratings)
    if (key === 'rating' && 'value' in attr && attr.value) {
      const ratingValue = attr.value as [[number, number], [number, number, number, number, number]];
      const [starRating, _] = ratingValue[0];
      
      // Adjust the rating based on the star rating (0-5 scale to 0-10 scale)
      adjustedRating = (attrRating + (starRating * 2)) / 2;
    }

    // For fakespot attribute (letter grades)
    if (key === 'fakespot' && 'value' in attr && attr.value) {
      const fakespotValue = attr.value as [string, string];
      const [productScore, companyScore] = fakespotValue;
      
      // Convert letter grades to numeric values (A=4, B=3, C=2, D=1, F=0)
      const letterToNumber = (letter: string): number => {
        switch (letter) {
          case 'A': return 4;
          case 'B': return 3;
          case 'C': return 2;
          case 'D': return 1;
          case 'F': return 0;
          default: return 0;
        }
      };
      
      // Calculate combined score with product score weighted more heavily (60/40 split)
      const numericProductScore = letterToNumber(productScore);
      const numericCompanyScore = letterToNumber(companyScore);
      const combinedScore = (numericProductScore * 0.6) + (numericCompanyScore * 0.4);
      
      // Scale to 0-10 and blend with the attribute rating
      const scaledScore = (combinedScore / 4) * 10;
      adjustedRating = (attrRating + scaledScore) / 2;
    }

    // Add weighted score to total
    const weightedScore = adjustedRating * colInfo.rating;
    totalScore += weightedScore;
    totalWeight += colInfo.rating;
  });

  // Normalize the score to a 0-10 scale
  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
};

// Helper function to safely access attribute values
const getAttributeValue = <T extends any>(attr: any): T | undefined => {
  if (attr && typeof attr === 'object' && 'value' in attr) {
    return attr.value as T;
  }
  return undefined;
};

// Helper function to safely check for attribute notes
const hasAttributeNotes = (attr: any): boolean => {
  return attr && typeof attr === 'object' && 'notes' in attr && typeof attr.notes === 'function';
};

// Helper function to safely get attribute flag
const getAttributeFlag = (attr: any): string | undefined => {
  if (attr && typeof attr === 'object' && 'flag' in attr) {
    return attr.flag as string;
  }
  return undefined;
};

// Helper function to format dimensions
const formatDimensions = (value: any): string => {
  const dimensions = getAttributeValue<[number, number, number]>(value);
  if (!dimensions) return '';
  const [d, w, h] = dimensions;
  return `${d}"D x ${w}"W x ${h}"H`;
};

// Helper function to format rating
const formatRating = (value: any): string => {
  const rating = getAttributeValue<[[number, number], [number, number, number, number, number]]>(value);
  if (!rating) return '';
  const [[avg, count], distribution] = rating;
  return `${avg.toFixed(1)} (${count} reviews)`;
};

// Helper function to format fakespot
const formatFakespot = (value: any): string => {
  const fakespot = getAttributeValue<[string, string]>(value);
  if (!fakespot) return '';
  const [product, company] = fakespot;
  return `P: ${product}, C: ${company}`;
};

// Helper function to format pickedBy
const formatPickedBy = (value: any): string => {
  const pickedBy = getAttributeValue<string[]>(value);
  if (!pickedBy) return '';
  return pickedBy.join(', ');
};

// Helper function to format countries
const formatCountries = (value: any): string => {
  const countries = getAttributeValue<string[]>(value);
  if (!countries) return '';
  return countries.join(', ');
};

// Helper function to format age
const formatAge = (value: any): string => {
  const age = getAttributeValue<string>(value);
  if (!age) return '';
  return age;
};

// Helper function to format the final score
const formatFinalScore = (score: number): string => {
  return score.toFixed(1);
};

// Helper function to get cell value
const getCellValue = (row: Product, columnId: string): any => {
  const value = row[columnId as keyof Product];
  return getAttributeValue(value) ?? value;
};

// Helper function to get cell display value
const getCellDisplayValue = (row: Product, columnId: string): string => {
  const value = row[columnId as keyof Product];
  if (!value) return '';
  
  // Handle specific column types
  if (columnId === 'dimensions') {
    return formatDimensions(value);
  } else if (columnId === 'rating') {
    return formatRating(value);
  } else if (columnId === 'fakespot') {
    return formatFakespot(value);
  } else if (columnId === 'pickedBy') {
    return formatPickedBy(value);
  } else if (columnId === 'countries') {
    return formatCountries(value);
  } else if (columnId === 'age') {
    return formatAge(value);
  } else if (columnInfo[columnId]?.dtype === 'boolean') {
    return getAttributeValue<boolean>(value) ? '✓' : '';
  }
  
  // Default handling
  const attributeValue = getAttributeValue(value);
  if (attributeValue !== undefined) {
    return String(attributeValue);
  }
  
  return String(value);
};

// Helper function to get cell style based on flag
const getCellStyle = (row: Product, columnId: string): React.CSSProperties => {
  const value = row[columnId as keyof Product];
  const flag = getAttributeFlag(value);
  
  if (flag === 'green') return { backgroundColor: '#e6ffe6' };
  if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
  if (flag === 'red') return { backgroundColor: '#ffcccc' };
  
  return {};
};

// Header cell component with notes
const HeaderCell = ({
  column,
  info
}: {
  column: any,
  info: ColumnInfo
}) => {
  // Create popover content if notes are available
  const popover = info.notes ? (
    <Popover id={`popover-header-${column.id}`}>
      <Popover.Header as="h3">{info.label}</Popover.Header>
      <Popover.Body>
        {info.notes()}
      </Popover.Body>
    </Popover>
  ) : null;

  return (
    <div style={{ whiteSpace: 'nowrap', maxWidth: '130px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{info.label}</span>
        {column.getIsSorted() && (
          <span style={{ marginLeft: '5px' }}>
            {column.getIsSorted() === 'asc' ? <FaArrowLeft /> : <FaArrowRight />}
          </span>
        )}
      </div>
    </div>
  );
};

// Description component with notes popover
const ColumnDescription = ({
  column,
  info
}: {
  column: any,
  info: ColumnInfo
}) => {
  if (!info.description && !info.notes) return null;
  
  const popover = (
    <Popover id={`popover-desc-${column.id}`}>
      <Popover.Header as="h3">{info.label}</Popover.Header>
      <Popover.Body>
        {info.notes ? info.notes() : <div>{info.description}</div>}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="mt-1">
      <OverlayTrigger trigger={["hover","focus"]} placement="bottom" overlay={popover}>
        <span
          style={{
            fontSize: '0.75rem',
            color: '#6c757d',
            cursor: 'pointer',
            borderBottom: '1px dotted #6c757d'
          }}
        >
          {info.description || 'More info'}
        </span>
      </OverlayTrigger>
    </div>
  );
};

// Cell component with notes
const Cell = ({ 
  value, 
  row, 
  column, 
  info 
}: { 
  value: any, 
  row: Product, 
  column: any, 
  info?: ColumnInfo 
}) => {
  const displayValue = getCellDisplayValue(row, column.id);
  const cellValue = row[column.id as keyof Product];
  
  if (!hasAttributeNotes(cellValue)) {
    return <div style={getCellStyle(row, column.id)}>{displayValue}</div>;
  }
  
  const popover = (
    <Popover id={`popover-cell-${column.id}-${row.make}-${row.model}`}>
      <Popover.Header as="h3">{info?.label || column.id}</Popover.Header>
      <Popover.Body>
        {(cellValue as any).notes()}
      </Popover.Body>
    </Popover>
  );

  return (
    <div style={getCellStyle(row, column.id)}>
      <OverlayTrigger trigger={["hover","focus"]} placement="right" overlay={popover}>
        <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer' }}>
          {displayValue}
        </span>
      </OverlayTrigger>
    </div>
  );
};

// Helper to determine if a column is numeric
const isNumericColumn = (columnId: string): boolean => {
  // Check if the column is one of the known numeric columns
  const numericColumns = ['weight', 'maxWeight', 'maxSpeed', 'horsePower', 'price'];
  if (numericColumns.includes(columnId)) return true;
  
  // Check if the column info indicates it's a number
  return columnInfo[columnId]?.dtype === 'number';
};

// Helper to determine if a column is boolean
const isBooleanColumn = (columnId: string): boolean => {
  // Check if the column info indicates it's a boolean
  return columnInfo[columnId]?.dtype === 'boolean';
};

// Filter component
const Filter = ({ column, table }: { column: any, table: any }) => {
  const columnId = column.id;
  const columnFilterValue = column.getFilterValue();
  
  // Use numeric filter for numeric columns
  if (isNumericColumn(columnId)) {
    return (
      <div style={{ maxWidth: '130px' }}>
        <div className="d-flex gap-1 mb-1">
          <Form.Control
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={e => {
              const val = e.target.value ? parseFloat(e.target.value) : undefined;
              column.setFilterValue((old: [number, number] | undefined) =>
                old ? [val, old[1]] : [val, undefined]
              );
            }}
            placeholder="Min"
            className="border rounded"
            style={{ fontSize: '0.7rem', padding: '1px 3px', width: '50px', height: '24px' }}
          />
          <Form.Control
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={e => {
              const val = e.target.value ? parseFloat(e.target.value) : undefined;
              column.setFilterValue((old: [number, number] | undefined) =>
                old ? [old[0], val] : [undefined, val]
              );
            }}
            placeholder="Max"
            className="border rounded"
            style={{ fontSize: '0.7rem', padding: '1px 3px', width: '50px', height: '24px' }}
          />
        </div>
      </div>
    );
  }
  
  // Use boolean filter for boolean columns
  if (isBooleanColumn(columnId)) {
    return (
      <div style={{ maxWidth: '130px' }}>
        <Form.Select
          size="sm"
          value={columnFilterValue === undefined ? '' : String(columnFilterValue)}
          onChange={e => {
            const value = e.target.value;
            if (value === '') {
              column.setFilterValue(undefined);
            } else if (value === 'true') {
              column.setFilterValue(true);
            } else if (value === 'false') {
              column.setFilterValue(false);
            }
          }}
          className="mb-1"
          style={{ fontSize: '0.7rem', padding: '1px 3px', height: '24px' }}
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
    <div style={{ maxWidth: '130px' }}>
      <Form.Control
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder="Search..."
        className="border rounded mb-1"
        style={{ fontSize: '0.7rem', padding: '1px 3px', height: '24px' }}
      />
    </div>
  );
};

export default function Treadmills() {
  // Initialize sorting state with Rank column in descending order
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'rank', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  
  // Column helper
  const columnHelper = createColumnHelper<Product>();
  
  // Create columns
  const columns = React.useMemo(() => {
    // Base columns with Rank as the first column
    const baseColumns = [
      // Rank column - calculated from product attributes and column weights
      columnHelper.accessor(
        row => calculateFinalScore(row),
        {
          id: 'rank',
          header: ({ column }) => (
            <HeaderCell
              column={column}
              info={{
                label: "Rank",
                dtype: "number",
                description: "Overall score (0-10)",
                rating: 10,
                notes: () => (
                  <div>
                    This score is calculated based on each product's attribute ratings and the importance of each attribute.
                    Higher scores indicate better overall performance. The calculation takes into account:
                    <ul>
                      <li>Each attribute's rating (out of 10)</li>
                      <li>The importance weight of each attribute (defined in columns.tsx)</li>
                      <li>Special handling for complex attributes like star ratings and Fakespot grades</li>
                    </ul>
                  </div>
                )
              }}
            />
          ),
          cell: info => (
            <div style={{ fontWeight: 'bold' }}>
              {formatFinalScore(info.getValue())}
            </div>
          ),
          enableSorting: true,
          enableColumnFilter: true,
          filterFn: (row, columnId, filterValue) => {
            if (Array.isArray(filterValue)) {
              const [min, max] = filterValue;
              const score = calculateFinalScore(row.original);
              
              return (
                (min === undefined || score >= min) &&
                (max === undefined || score <= max)
              );
            }
            return true;
          },
        }
      ),
      columnHelper.accessor('make', {
        header: ({ column }) => (
          <HeaderCell
            column={column}
            info={{
              label: "Make",
              dtype: "string",
              description: "Manufacturer",
              rating: 0
            }}
          />
        ),
        cell: info => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('model', {
        header: ({ column }) => (
          <HeaderCell
            column={column}
            info={{
              label: "Model",
              dtype: "string",
              description: "Product model",
              rating: 0
            }}
          />
        ),
        cell: info => <div>{info.getValue()}</div>,
      }),
    ];
    
    // Info columns
    const infoColumns = Object.entries(columnInfo as Record<string, ColumnInfo>).map(([key, info]) => {
      return columnHelper.accessor(key as keyof Product, {
        header: ({ column }) => <HeaderCell column={column} info={info} />,
        cell: ({ row, column }) => <Cell value={getCellValue(row.original, column.id)} row={row.original} column={column} info={info} />,
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: (row, columnId, filterValue) => {
          const value = getCellValue(row.original, columnId);
          if (typeof value === 'undefined' || value === null) return false;
          
          // Handle numeric range filtering
          if (isNumericColumn(columnId) && Array.isArray(filterValue)) {
            const [min, max] = filterValue;
            const numValue = typeof value === 'number' ? value : parseFloat(String(value));
            
            if (!isNaN(numValue)) {
              return (
                (min === undefined || numValue >= min) &&
                (max === undefined || numValue <= max)
              );
            }
            return false;
          }
          
          // Handle boolean filtering
          if (isBooleanColumn(columnId) && typeof filterValue === 'boolean') {
            // Always use getAttributeValue to get the actual boolean value
            // This ensures we're checking the underlying boolean, not the display value (✓)
            const boolValue = getAttributeValue<boolean>(row.original[columnId as keyof Product]);
            
            // If we have a valid boolean value, compare it with the filter value
            if (typeof boolValue === 'boolean') {
              return boolValue === filterValue;
            }
            
            // If the value itself is a boolean (not wrapped in an object), check that too
            if (typeof value === 'boolean') {
              return value === filterValue;
            }
            
            return false;
          }
          
          // Handle string filtering
          if (typeof filterValue === 'string') {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(filterValue.toLowerCase());
            }
            return String(value).toLowerCase().includes(filterValue.toLowerCase());
          }
          
          return false;
        },
      });
    });
    
    return [...baseColumns, ...infoColumns];
  }, []);
  
  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  
  return (
    <div style={{ width: '100%' }}>
      <h1>Treadmill Comparison</h1>
      
      <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <table className="table table-striped table-bordered">
          {/* Transposed table: columns become rows, rows become columns */}
          <thead>
            <tr>
              <th style={{ whiteSpace: 'nowrap', width: '130px', maxWidth: '130px', minWidth: '130px' }}>Property</th>
              {/* Each product becomes a column header */}
              {table.getRowModel().rows.map(row => (
                <th key={row.id} style={{ whiteSpace: 'nowrap' }}>
                  {/* Display make and model as the column header */}
                  <div>
                    <strong>{row.original.make}</strong>
                    <div>{row.original.model}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Each column becomes a row */}
            {table.getHeaderGroups()[0].headers.map(header => (
              <tr key={header.id}>
                {/* First cell is the column header (now a row header) */}
                <td style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa', width: '130px', maxWidth: '130px', minWidth: '130px' }}>
                  <div>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                        {/* Add description with popover below the filter */}
                        <ColumnDescription
                          column={header.column}
                          info={
                            header.column.id === 'rank'
                              ? {
                                  label: "Rank",
                                  dtype: "number",
                                  description: "Overall score (0-10)",
                                  rating: 10,
                                  notes: () => (
                                    <div>
                                      This score is calculated based on each product's attribute ratings and the importance of each attribute.
                                      Higher scores indicate better overall performance. The calculation takes into account:
                                      <ul>
                                        <li>Each attribute's rating (out of 10)</li>
                                        <li>The importance weight of each attribute (defined in columns.tsx)</li>
                                        <li>Special handling for complex attributes like star ratings and Fakespot grades</li>
                                      </ul>
                                    </div>
                                  )
                                }
                              : header.column.id === 'make'
                                ? {
                                    label: "Make",
                                    dtype: "string",
                                    description: "Manufacturer",
                                    rating: 0
                                  }
                              : header.column.id === 'model'
                                ? {
                                    label: "Model",
                                    dtype: "string",
                                    description: "Product model",
                                    rating: 0
                                  }
                              : columnInfo[header.column.id as keyof typeof columnInfo]
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                </td>
                
                {/* Each cell in this row represents a different product's value for this property */}
                {table.getRowModel().rows.map(row => {
                  // Find the cell that corresponds to this column and row
                  const cell = row.getVisibleCells().find(cell => cell.column.id === header.column.id);
                  
                  return (
                    <td key={`${row.id}-${header.id}`}>
                      {cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}