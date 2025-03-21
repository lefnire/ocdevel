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
import { data } from './data';
import columnInfo, { columnsArray, isNumericColumn, isBooleanColumn } from './columns';
// columnInfo is an object version of columnsArray for direct access by key
import brands from './brands';
import { OverlayTrigger, Popover, Form } from 'react-bootstrap';
import type { Product } from './types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Header cell component with notes
const HeaderCell = ({
  column,
  info
}: {
  column: any,
  info: any
}) => {
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
  info: any
}) => {
  if (!info.description && !info.notes) return <div>&nbsp;</div>;
  
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
          {info.description || 'Info (?)'}
        </span>
      </OverlayTrigger>
    </div>
  );
};

// Cell component with notes and rating indicator
const Cell = ({
  row,
  column,
  info
}: {
  row: any, // Using any to accommodate both Product and Row<Product>
  column: any,
  info?: any
}) => {
  const columnId = column.id;
  const columnDef = columnInfo[columnId];
  
  // Get the actual product data
  const product: Product = row.original || row;
  
  // Special case for make/brand column
  if (columnId === 'make') {
    const make = product.make;
    const brand = brands[make];
    const brandName = brand?.name || make;
    
    if (brand && brand.notes) {
      return (
        <div>
          <OverlayTrigger
            trigger={["hover","focus"]}
            placement="right"
            overlay={
              <Popover id={`popover-brand-${row.id || `${product.make}-${product.model}`}`}>
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
  }
  
  // For other columns, use the render function from columnDef
  if (columnDef && columnDef.render) {
    const displayValue = columnDef.render(product);
    const cellStyle = columnDef.getStyle ? columnDef.getStyle(product) : {};
    
    // Check if the attribute has notes
    const attr = product[columnId as keyof Product];
    const hasNotes = attr && typeof attr === 'object' && 'notes' in attr && typeof (attr as any).notes === 'function';
    
    if (hasNotes) {
      const popover = (
        <Popover id={`popover-cell-${columnId}-${product.make}-${product.model}`}>
          <Popover.Header as="h3">{info?.label || columnId}</Popover.Header>
          <Popover.Body>
            {(attr as any).notes()}
          </Popover.Body>
        </Popover>
      );
      
      return (
        <div style={cellStyle}>
          <OverlayTrigger trigger={["hover","focus"]} placement="right" overlay={popover}>
            <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer' }}>
              {displayValue}
            </span>
          </OverlayTrigger>
        </div>
      );
    }
    
    // Special case for combinedRating - always show popover with details
    if (columnId === 'combinedRating') {
      const combinedRatingColumn = columnInfo.combinedRating;
      if (combinedRatingColumn && combinedRatingColumn.notes) {
        const popover = (
          <Popover id={`popover-cell-${columnId}-${product.make}-${product.model}`}>
            <Popover.Header as="h3">{info?.label || columnId}</Popover.Header>
            <Popover.Body>
              {/* Generate combined rating details */}
              <div>
                {/* Star Rating */}
                {product.rating && typeof product.rating === 'object' && 'value' in product.rating && product.rating.value && (
                  <div>
                    <strong>Star Rating:</strong> {product.rating.value[0] && product.rating.value[0][0] ? product.rating.value[0][0].toFixed(1) : '0'}/5
                    ({product.rating.value[0] && product.rating.value[0][1] ? product.rating.value[0][1] : 0} reviews)
                  </div>
                )}
                
                {/* Rating Distribution */}
                {product.rating && typeof product.rating === 'object' && 'value' in product.rating && product.rating.value && product.rating.value[1] && (
                  <div className="mt-2">
                    <strong>Rating Distribution:</strong>
                    <div>
                      5★: {product.rating.value[1][0] || 0},
                      4★: {product.rating.value[1][1] || 0},
                      3★: {product.rating.value[1][2] || 0},
                      2★: {product.rating.value[1][3] || 0},
                      1★: {product.rating.value[1][4] || 0}
                    </div>
                  </div>
                )}
                
                {/* Fakespot Grades */}
                {product.fakespot && typeof product.fakespot === 'object' && 'value' in product.fakespot && product.fakespot.value && (
                  <div className="mt-2">
                    <strong>Fakespot Grades:</strong> Product: {product.fakespot.value[0] || 'B'}, Company: {product.fakespot.value[1] || 'B'}
                  </div>
                )}
              </div>
            </Popover.Body>
          </Popover>
        );
        
        return (
          <div style={cellStyle}>
            <OverlayTrigger trigger={["hover","focus"]} placement="right" overlay={popover}>
              <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer', fontWeight: 'bold' }}>
                {displayValue}
              </span>
            </OverlayTrigger>
          </div>
        );
      }
    }
    
    // Default rendering without popover
    return (
      <div style={cellStyle}>
        {displayValue}
      </div>
    );
  }
  
  // Fallback if no render function is defined
  return <div>{String(row.getValue ? row.getValue(columnId) : product[columnId as keyof Product]) || ''}</div>;
};

// Filter component
const Filter = ({ column, table }: { column: any, table: any }) => {
  const columnId = column.id;
  const columnFilterValue = column.getFilterValue();
  
  // Use numeric filter for numeric columns
  if (isNumericColumn(columnId)) {
    // Get filter options from column definition
    const columnDef = columnInfo[columnId];
    const filterOptions = columnDef?.filterOptions || { min: true, max: true };
    
    return (
      <div style={{ maxWidth: '130px' }}>
        <div className="d-flex gap-1 mb-1">
          {filterOptions.min && (
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
          )}
          {filterOptions.max && (
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
          )}
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
    <div
      style={{ maxWidth: 100 }}
    >
      <Form.Control
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder="Search"
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
    // Filter columns to only include those marked for display in the table
    const visibleColumns = columnsArray.filter(col => col.showInTable !== false);
    
    return visibleColumns.map(colDef => {
      return columnHelper.accessor(
        // Use the calculate function if available, otherwise use the key directly
        row => colDef.calculate ? colDef.calculate(row) : row[colDef.key as keyof Product],
        {
          id: colDef.key,
          header: ({ column }) => (
            <HeaderCell
              column={column}
              info={colDef}
            />
          ),
          cell: ({ row, column }) => (
            <Cell
              row={row}
              column={column}
              info={colDef}
            />
          ),
          enableSorting: true,
          enableColumnFilter: true,
          filterFn: (row, columnId, filterValue) => {
            // For numeric columns with range filtering
            if (isNumericColumn(columnId) && Array.isArray(filterValue)) {
              const [min, max] = filterValue;
              const columnDef = columnInfo[columnId];
              const value = columnDef?.calculate ? columnDef.calculate(row.original) : row.getValue(columnId);
              
              if (value === undefined || value === null) return false;
              
              const numValue = typeof value === 'number' ? value : parseFloat(String(value));
              if (isNaN(numValue)) return false;
              
              // Get filter options from column definition
              const filterOptions = columnDef?.filterOptions || { min: true, max: true };
              
              // Only apply min/max filters based on filterOptions
              let passesFilter = true;
              
              if (filterOptions.min && min !== undefined) {
                passesFilter = passesFilter && numValue >= min;
              }
              
              if (filterOptions.max && max !== undefined) {
                passesFilter = passesFilter && numValue <= max;
              }
              
              return passesFilter;
            }
            
            // For boolean columns
            if (isBooleanColumn(columnId) && typeof filterValue === 'boolean') {
              const columnDef = columnInfo[columnId];
              const value = columnDef?.calculate ? columnDef.calculate(row.original) : row.getValue(columnId);
              
              if (typeof value === 'boolean') {
                return value === filterValue;
              }
              
              return false;
            }
            
            // For string columns
            if (typeof filterValue === 'string') {
              const columnDef = columnInfo[columnId];
              const value = columnDef?.calculate ? columnDef.calculate(row.original) : row.getValue(columnId);
              
              if (value === undefined || value === null) return false;
              
              if (typeof value === 'string') {
                return value.toLowerCase().includes(filterValue.toLowerCase());
              }
              
              return String(value).toLowerCase().includes(filterValue.toLowerCase());
            }
            
            return true;
          },
          sortingFn: (rowA, rowB, columnId) => {
            const columnDef = columnInfo[columnId];
            
            // Special case for make/brand column
            if (columnId === 'make') {
              const makeA = rowA.original.make;
              const makeB = rowB.original.make;
              
              const brandA = brands[makeA];
              const brandB = brands[makeB];
              
              const ratingA = brandA?.rating || 0;
              const ratingB = brandB?.rating || 0;
              
              return ratingA > ratingB ? 1 : ratingA < ratingB ? -1 : 0;
            }
            
            // Use getSortValue if available
            if (columnDef?.getSortValue) {
              const valueA = columnDef.getSortValue(rowA.original);
              const valueB = columnDef.getSortValue(rowB.original);
              
              if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
              }
              
              // String comparison
              return String(valueA).localeCompare(String(valueB));
            }
            
            // Use calculate if available
            if (columnDef?.calculate) {
              const valueA = columnDef.calculate(rowA.original);
              const valueB = columnDef.calculate(rowB.original);
              
              if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
              }
              
              // String comparison
              return String(valueA).localeCompare(String(valueB));
            }
            
            // Default sorting
            const valueA = rowA.getValue(columnId);
            const valueB = rowB.getValue(columnId);
            
            if (typeof valueA === 'number' && typeof valueB === 'number') {
              return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            }
            
            return String(valueA).localeCompare(String(valueB));
          }
        }
      );
    });
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
      <div className="table-responsive" style={{ overflowX: 'auto' }}>
       <table className="table table-striped table-bordered">
         {/* Normal table: columns are attributes, rows are products */}
         <thead>
           <tr>
             {/* Each column header */}
             {table.getHeaderGroups()[0].headers.map(header => (
               <th
                 key={header.id}
                 style={{
                   whiteSpace: 'nowrap',
                   // minWidth: header.id === 'model' || header.id === 'make' ? '130px' : '100px'
                   minWidth: 90
                }}
               >
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
                         info={columnInfo[header.column.id as keyof typeof columnInfo]}
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
                   const skipRatingColumns = ['rank', 'model', 'countries', 'combinedRating'];
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
                         title={`This attribute's rating: ${rating}/10`}
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