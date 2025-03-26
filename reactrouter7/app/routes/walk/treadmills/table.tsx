import React, { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import type {
  SortingState,
  Column,
  Row,
  Cell,
  Table,
  ColumnDef
} from '@tanstack/react-table';
import type { Product } from './rows';
import { columnsArray, columnsObj } from './columns';
import {OverlayTrigger, Popover, Form, Button, Badge, Container} from 'react-bootstrap';
import {FaArrowUp, FaArrowDown, FaArrowLeft} from 'react-icons/fa';
import type {CompareProps} from "./compare";
import { useSearchParams } from "react-router";

// Custom styles
const dottedBorderStyle: React.CSSProperties = {
  borderBottom: '1px dotted #6c757d', // Gray dotted border
  cursor: 'pointer'
};

// Header cell component with notes
const HeaderCell: React.FC<{
  column: Column<Product, unknown>;
  info: any;
}> = ({ column, info }) => (
  <div className="text-nowrap" style={{ maxWidth: '130px' }}>
    <div className="d-flex align-items-center">
      <span>{info.label}</span>
      {column.getIsSorted() && (
        <span className="ms-1">
          {column.getIsSorted() === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      )}
    </div>
  </div>
);

// Description component with notes popover
const ColumnDescription: React.FC<{
  column: Column<Product, unknown>;
  info: any;
}> = ({ column, info }) => {
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
        <span className="small text-secondary" style={dottedBorderStyle}>
          {info.description || 'Info (?)'}
        </span>
      </OverlayTrigger>
    </div>
  );
};



// Cell with popover component
const CellWithPopover: React.FC<{
  product: Product;
  columnId: string;
  displayValue: React.ReactNode;
  cellStyle: React.CSSProperties;
  info?: any;
  popoverContent: React.ReactNode;
  isBold?: boolean;
}> = ({ product, columnId, displayValue, cellStyle, info, popoverContent, isBold = false }) => {
  const popover = (
    <Popover id={`popover-cell-${columnId}-${product.key}`}>
      <Popover.Header as="h3">{info?.label || columnId}</Popover.Header>
      <Popover.Body>
        {popoverContent}
      </Popover.Body>
    </Popover>
  );
  
  return (
    <div style={cellStyle}>
      <OverlayTrigger trigger={["hover","focus"]} placement="bottom" overlay={popover}>
        <span className={isBold ? "fw-bold" : ""} style={dottedBorderStyle}>
          {displayValue}
        </span>
      </OverlayTrigger>
    </div>
  );
};

// Cell component with notes and rating indicator
const Cell: React.FC<{
  row: Row<Product>;
  column: Column<Product, unknown>;
  info?: any;
}> = ({ row, column, info }) => {
  const columnId = column.id;
  const columnDef = columnsObj[columnId];
  const product: Product = row.original;
  
  // If no column definition or render function, return empty div
  if (!columnDef || !columnDef.render) {
    return <div></div>;
  }

  const displayValue = columnDef.render(product);
  const cellStyle = columnDef.getStyle ? columnDef.getStyle(product) : {};
  
  // Get popover content if available
  const popoverContent = columnDef.renderPopover?.(product) ||
                         (typeof product[columnId as keyof Product] === 'object' &&
                          (product[columnId as keyof Product] as any)?.notes?.());
  
  // For columns with popover content
  if (popoverContent) {
    return <CellWithPopover
      product={product}
      columnId={columnId}
      displayValue={displayValue}
      cellStyle={cellStyle}
      info={info}
      popoverContent={popoverContent}
    />;
  }
  
  // Default rendering without popover
  return <div style={cellStyle}>{displayValue}</div>;
};

// Numeric filter component
const NumericFilter: React.FC<{
  column: Column<Product, unknown>;
  columnFilterValue: [number, number] | undefined;
  filterOptions: { min?: boolean; max?: boolean };
}> = ({ column, columnFilterValue, filterOptions }) => (
  <div className="w-100 max-w-130px">
    <div className="d-flex gap-1 mb-1">
      {filterOptions.min && (
        <Form.Control
          type="number"
          value={columnFilterValue?.[0] ?? ''}
          onChange={e => {
            const val = e.target.value ? parseFloat(e.target.value) : undefined;
            column.setFilterValue((old: [number, number] | undefined) =>
              old ? [val, old[1]] : [val, undefined]
            );
          }}
          placeholder="Min"
          className="border rounded fs-7 p-1 w-50px h-24px"
        />
      )}
      {filterOptions.max && (
        <Form.Control
          type="number"
          value={columnFilterValue?.[1] ?? ''}
          onChange={e => {
            const val = e.target.value ? parseFloat(e.target.value) : undefined;
            column.setFilterValue((old: [number, number] | undefined) =>
              old ? [old[0], val] : [undefined, val]
            );
          }}
          placeholder="Max"
          className="border rounded fs-7 p-1 w-50px h-24px"
        />
      )}
    </div>
  </div>
);

// Boolean filter component
const BooleanFilter: React.FC<{
  column: Column<Product, unknown>;
  columnFilterValue: boolean | undefined;
}> = ({ column, columnFilterValue }) => (
  <div className="w-100 max-w-130px">
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
      className="mb-1 fs-7 p-1 h-24px"
    >
      <option value="">All</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </Form.Select>
  </div>
);

// Text filter component
const TextFilter: React.FC<{
  column: Column<Product, unknown>;
  columnFilterValue: string | undefined;
}> = ({ column, columnFilterValue }) => (
  <div className="max-w-100px">
    <Form.Control
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder="Search"
      className="border rounded mb-1 fs-7 p-1 h-24px"
    />
  </div>
);
// Filter component
const Filter: React.FC<{
  column: Column<Product, unknown>;
  table: Table<Product>
}> = ({ column, table }) => {
  const columnId = column.id;
  const columnFilterValue = column.getFilterValue();
  
  // Use numeric filter for numeric columns
  if (columnsObj[columnId].dtype === "number") {
    const columnDef = columnsObj[columnId];
    const filterOptions = columnDef?.filterOptions || { min: true, max: true };
    
    return (
      <NumericFilter
        column={column}
        columnFilterValue={columnFilterValue as [number, number] | undefined}
        filterOptions={filterOptions}
      />
    );
  }
  
  // Use boolean filter for boolean columns
  if (columnsObj[columnId].dtype === "boolean") {
    return (
      <BooleanFilter
        column={column}
        columnFilterValue={columnFilterValue as boolean | undefined}
      />
    );
  }
  
  // Use text filter for other columns
  return (
    <TextFilter
      column={column}
      columnFilterValue={columnFilterValue as string | undefined}
    />
  );
};

// Rating indicator component
const Score: React.FC<{ score: number }> = ({ score }) => {
  if (score <= 0) return null;
  
  // Determine color based on score
  const bgColorClass = score >= 7 ? 'bg-success' : score >= 4 ? 'bg-warning' : 'bg-danger';
  const textColorClass = score >= 4 ? 'text-dark' : 'text-white';
  
  return (
    <div
      className={`position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded opacity-85 ${bgColorClass} ${textColorClass} fw-bold`}
      style={{ width: '18px', height: '18px', fontSize: '11px' }}
      title={`This attribute's score: ${score.toFixed(0)}/10`}
    >
      {score.toFixed(0)}
    </div>
  );
};
export default function ProductTable({
  isCompareMode,
  filteredData,
  handleShowAll,
}: CompareProps) {
  // Access URL search parameters
  const [searchParams] = useSearchParams();
  
  // Initialize sorting state with Rank column in descending order
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'total', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);

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
      setColumnFilters(newFilters);
    }
  }, [searchParams]);
  // Column helper
  const columnHelper = createColumnHelper<Product>();
  
  // Create columns
  const columns = React.useMemo(() => {
    return columnsArray.map(colDef => {
      return columnHelper.accessor(
        // Use the calculate function if available, otherwise use the key directly
        row => colDef.getValue ? colDef.getValue(row) : row[colDef.key as keyof Product],
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
            const columnDef = columnsObj[columnId];
            const value = columnDef.getValue(row.original);
            
            if (value === undefined || value === null) return false;
            
            // For numeric columns with range filtering
            if (columnDef.dtype === "number" && Array.isArray(filterValue)) {
              const [min, max] = filterValue;
              const numValue = typeof value === 'number' ? value : parseFloat(String(value));
              if (isNaN(numValue)) return false;
              
              const filterOptions = columnDef.filterOptions || { min: true, max: true };
              
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
          },
          sortingFn: (rowA, rowB, columnId) => {
            const columnDef = columnsObj[columnId];
            
            // Use getSortValue if available, otherwise use getValue
            const getValueFn = columnDef.getSortValue || columnDef.getValue;
            const valueA = getValueFn(rowA.original);
            const valueB = getValueFn(rowB.original);
            
            // Compare based on data type
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
  const table = useReactTable<Product>({
    data: filteredData as Product[],
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
    <div className="w-100">
      {/* Show All button when in comparison mode */}
      {isCompareMode && <div className='mb-1'>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={handleShowAll}
        >
          <FaArrowLeft /> Show All
        </Button>
      </div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
         {/* Normal table: columns are attributes, rows are products */}
         <thead>
           <tr>
             {/* Each column header */}
             {table.getHeaderGroups()[0].headers.map(header => (
               <th
                 key={header.id}
                 className="text-nowrap"
                 style={{ minWidth: 90 }}
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
                         info={columnsObj[header.column.id as keyof typeof columnsObj]}
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
                 const columnDef = columnsObj[columnId];
                 // Only show score if hideScore is not true and the attribute has a score
                 const score = columnDef.hideScore ? 0 : (row.original[columnId]?.score || 0);
                 
                 return (
                   <td key={cell.id} className="position-relative">
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     <Score score={score} />
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
