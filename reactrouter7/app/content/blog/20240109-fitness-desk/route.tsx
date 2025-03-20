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
import brands from './treadmills/brands';
import { OverlayTrigger, Popover, Form, InputGroup } from 'react-bootstrap';
import type { Product } from './treadmills/types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { calculateFinalScore } from './treadmills/calculator';
import {
  formatFinalScore,
  getCellValue,
  getCellDisplayValue,
  getCellStyle,
  hasAttributeNotes,
  isNumericColumn,
  isBooleanColumn
} from './treadmills/formatters';

export * from './meta.js';

// Define the column info type
interface ColumnInfo {
  label: string;
  dtype: string;
  description?: string;
  rating: number;
  notes?: () => React.ReactElement;
}

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

// Cell component with notes and rating indicator
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
  
  // Get the rating for this cell
  let rating = 0;
  if (info && typeof info.rating === 'number') {
    rating = info.rating;
  } else if (column.id === 'rank') {
    // Rank column has a fixed rating of 10
    rating = 10;
  } else if (column.id === 'model' || column.id === 'make') {
    // Model and Make columns have a fixed rating of 0
    rating = 0;
  }
  
  // Create a color based on the rating (0-10)
  // 0 = light gray, 10 = dark green
  const ratingColor = rating === 0
    ? '#e0e0e0'
    : `rgba(0, ${Math.min(200, rating * 20)}, 0, ${Math.min(0.8, rating * 0.08)})`;
  
  // We'll handle the rating indicator in the table rendering
  
  if (!hasAttributeNotes(cellValue)) {
    return (
      <div style={getCellStyle(row, column.id)}>
        {displayValue}
      </div>
    );
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
    // Model column
    columnHelper.accessor(
      'model',
      {
        id: 'model',
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
        enableSorting: true,
        enableColumnFilter: true,
      }
    ),
    // Make column (using brand name from brands.tsx)
    columnHelper.accessor(
      'make',
      {
        id: 'make',
        header: ({ column }) => (
          <HeaderCell
            column={column}
            info={{
              label: "Brand",
              dtype: "string",
              description: "Product manufacturer",
              rating: 0
            }}
          />
        ),
        cell: ({ row }) => {
          const make = row.original.make;
          const brand = brands[make];
          const brandName = brand?.name || make;
          
          if (brand && brand.notes) {
            return (
              <div>
                <OverlayTrigger
                  trigger={["hover","focus"]}
                  placement="right"
                  overlay={
                    <Popover id={`popover-brand-${row.id}`}>
                      <Popover.Header as="h3">{brandName}</Popover.Header>
                      <Popover.Body>
                        {brand.notes()}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer' }}>
                    {brandName}
                  </span>
                </OverlayTrigger>
              </div>
            );
          }
          
          return <div>{brandName}</div>;
        },
        enableSorting: true,
        enableColumnFilter: true,
      }
    ),
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
            const boolValue = getCellValue(row.original, columnId);
            
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
          <thead style={{ display: 'none' }}>
            <tr>
              <th style={{ whiteSpace: 'nowrap', width: '130px', maxWidth: '130px', minWidth: '130px' }}>Property</th>
              {/* Each product becomes a column header */}
              {table.getRowModel().rows.map(row => (
                <th key={row.id} style={{ whiteSpace: 'nowrap' }}>
                  {/* Display model and brand separately as the column header */}
                  <div>
                    <strong>
                      {row.original.model} - {
                        (() => {
                          const brand = brands[row.original.make];
                          const brandName = brand?.name || row.original.make;
                          
                          if (brand && brand.notes) {
                            return (
                              <OverlayTrigger
                                trigger={["hover","focus"]}
                                placement="right"
                                overlay={
                                  <Popover id={`popover-brand-${row.id}`}>
                                    <Popover.Header as="h3">{brandName}</Popover.Header>
                                    <Popover.Body>
                                      {brand.notes()}
                                    </Popover.Body>
                                  </Popover>
                                }
                              >
                                <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer' }}>
                                  {brandName}
                                </span>
                              </OverlayTrigger>
                            );
                          }
                          
                          return brandName;
                        })()
                      }
                    </strong>
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
                              : header.column.id === 'model'
                                ? {
                                    label: "Model",
                                    dtype: "string",
                                    description: "Product model",
                                    rating: 0
                                  }
                              : header.column.id === 'make'
                                ? {
                                    label: "Brand",
                                    dtype: "string",
                                    description: "Product manufacturer",
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
                  
                  // Skip rating indicators for certain columns
                  const skipRatingColumns = ['rank', 'model', 'make', 'countries'];
                  const showRating = !skipRatingColumns.includes(header.column.id);
                  
                  // Debug which columns are being skipped
                  console.log(`Column: ${header.column.id}, Skip Rating: ${skipRatingColumns.includes(header.column.id)}`);
                  
                  // Get the data-specific rating for this cell
                  let rating = 0;
                  if (showRating) {
                    // Get the original cell value directly from the row data
                    const originalValue = row.original[header.column.id as keyof Product];
                    
                    // Check if the original value is an object with a rating property
                    if (originalValue && typeof originalValue === 'object' && 'rating' in originalValue) {
                      rating = (originalValue as any).rating;
                      // Add console log for debugging
                      console.log(`Column: ${header.column.id}, Rating: ${rating}, Value:`, originalValue);
                    }
                  }
                  
                  return (
                    <td key={`${row.id}-${header.id}`} style={{ position: 'relative' }}>
                      {cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
                      
                      {/* Rating indicator - only show for applicable columns and if rating exists */}
                      {showRating && rating > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '18px',
                            height: '18px',
                            backgroundColor: rating >= 7 ? '#28a745' : // Bootstrap success
                                             rating >= 4 ? '#ffc107' : // Bootstrap warning
                                             '#dc3545',                // Bootstrap danger
                            borderRadius: '3px',
                            fontSize: '11px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: rating >= 4 ? 'black' : 'white',
                            fontWeight: 'bold',
                            opacity: 0.85
                          }}
                          title={`Rating: ${rating}/10`}
                        >
                          {rating}
                        </div>
                      )}
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