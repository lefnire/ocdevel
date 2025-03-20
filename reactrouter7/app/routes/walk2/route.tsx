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
import columnInfo, { columnsArray } from './treadmills/columns';
import brands from './treadmills/brands';
import { OverlayTrigger, Popover, Form, InputGroup } from 'react-bootstrap';
import type { Product } from './treadmills/types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
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

// Define reusable column info objects for special columns
const rankColumnInfo: ColumnInfo = {
  label: "Rank",
  dtype: "number",
  description: "Calculation",
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
};

const modelColumnInfo: ColumnInfo = {
  label: "Model",
  dtype: "string",
  rating: 0
};

const brandColumnInfo: ColumnInfo = {
  label: "Brand",
  dtype: "string",
  rating: 0
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
           {column.getIsSorted() === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
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

// Helper function to get column rating
const getColumnRating = (columnId: string, info?: ColumnInfo): number => {
  if (info && typeof info.rating === 'number') {
    return info.rating;
  } else if (columnId === 'rank') {
    return rankColumnInfo.rating;
  } else if (columnId === 'model') {
    return modelColumnInfo.rating;
  } else if (columnId === 'make') {
    return brandColumnInfo.rating;
  }
  return 0;
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
  
  // Get the rating for this cell using the helper function
  const rating = getColumnRating(column.id, info);
  
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
            info={rankColumnInfo}
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
        sortingFn: (rowA, rowB, columnId) => {
          // For rank column, we can use the actual value since it's already a score
          const valueA = rowA.getValue(columnId) as number;
          const valueB = rowB.getValue(columnId) as number;
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        }
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
            info={modelColumnInfo}
          />
        ),
        cell: info => <div>{info.getValue()}</div>,
        enableSorting: true,
        enableColumnFilter: true,
        // Model doesn't have a rating, so we'll use a default of 0
        sortingFn: (rowA, rowB, columnId) => {
          return 0; // No sorting by rating for model column
        }
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
            info={brandColumnInfo}
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
        // Use brand rating from brands.tsx for sorting
        sortingFn: (rowA, rowB, columnId) => {
          const makeA = rowA.original.make;
          const makeB = rowB.original.make;
          
          const brandA = brands[makeA];
          const brandB = brands[makeB];
          
          const ratingA = brandA?.rating || 0;
          const ratingB = brandB?.rating || 0;
          
          return ratingA > ratingB ? 1 : ratingA < ratingB ? -1 : 0;
        }
      }
    ),
    ];
    
    // Info columns - using columnsArray to maintain order
    const infoColumns = columnsArray.map((info) => {
      return columnHelper.accessor(info.key as keyof Product, {
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
        // Use rating-based sorting for all info columns
        sortingFn: (rowA, rowB, columnId) => {
          const originalA = rowA.original;
          const originalB = rowB.original;
          
          // Get the attribute from the row
          const attrA = originalA[columnId as keyof Product];
          const attrB = originalB[columnId as keyof Product];
          
          // Extract ratings
          let ratingA = 0;
          let ratingB = 0;
          
          if (attrA && typeof attrA === 'object' && 'rating' in attrA) {
            ratingA = (attrA as any).rating || 0;
          }
          
          if (attrB && typeof attrB === 'object' && 'rating' in attrB) {
            ratingB = (attrB as any).rating || 0;
          }
          
          return ratingA > ratingB ? 1 : ratingA < ratingB ? -1 : 0;
        }
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
         {/* Normal table: columns are attributes, rows are products */}
         <thead>
           <tr>
             {/* Each column header */}
             {table.getHeaderGroups()[0].headers.map(header => (
               <th key={header.id} style={{ whiteSpace: 'nowrap', minWidth: header.id === 'model' || header.id === 'make' ? '130px' : '100px' }}>
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
                             ? rankColumnInfo
                             : header.column.id === 'model'
                               ? modelColumnInfo
                             : header.column.id === 'make'
                               ? brandColumnInfo
                             : columnsArray.find(col => col.key === header.column.id) || columnInfo[header.column.id as keyof typeof columnInfo]
                         }
                       />
                     </div>
                   ) : null}
                 </div>
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {/* Each row is a product */}
           {table.getRowModel().rows.map(row => (
             <tr key={row.id}>
               {/* Each cell in this row represents a different attribute for this product */}
               {row.getVisibleCells().map(cell => {
                 const columnId = cell.column.id;
                 
                 // Helper function to get cell-specific rating
                 const getCellRating = (row: any, columnId: string): number => {
                   // Skip rating indicators for certain columns
                   const skipRatingColumns = ['rank', 'model', 'countries'];
                   if (skipRatingColumns.includes(columnId)) {
                     return 0;
                   }
                   
                   // Special handling for Brand column
                   if (columnId === 'make') {
                     const make = row.original.make;
                     const brand = brands[make];
                     if (brand && typeof brand.rating === 'number') {
                       return brand.rating;
                     }
                   } else {
                     // Get the original cell value directly from the row data
                     const originalValue = row.original[columnId as keyof Product];
                     
                     // Check if the original value is an object with a rating property
                     if (originalValue && typeof originalValue === 'object' && 'rating' in originalValue) {
                       return (originalValue as any).rating;
                     }
                   }
                   return 0;
                 };
                 
                 // Get the rating for this cell
                 const rating = getCellRating(row, columnId);
                 
                 return (
                   <td key={cell.id} style={{ position: 'relative' }}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     
                     {/* Rating indicator - only show if rating exists */}
                     {rating > 0 && (
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