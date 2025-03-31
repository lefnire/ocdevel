import React, {useEffect, useRef} from "react";
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
import type { Product } from '~/content/treadmills/rows';
import { columnsArray, columnsObj } from '~/content/treadmills/columns';
import { Form, Button, Badge, Container } from 'react-bootstrap';
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";
import {FaArrowDown} from "@react-icons/all-files/fa/FaArrowDown";
// import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";
import {type ListenerProps} from "./url-listener";
import {useNavigate, useSearchParams} from "react-router";
import { ModalProvider, useModal, clickableStyle } from './modal';

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

// Description component with notes modal
const ColumnDescription: React.FC<{
  column: Column<Product, unknown>;
  info: any;
}> = ({ column, info }) => {
  const { openModal } = useModal();
  
  if (!info.description && !info.notes) return <div>&nbsp;</div>;
  
  const handleClick = () => {
    const content = info.notes ? info.notes() : <div>{info.description}</div>;
    openModal(`desc-${column.id}`, info.label, content);
  };

  return (
    <div className="mt-1">
      <span
        className="small text-secondary"
        style={clickableStyle}
        onClick={handleClick}
      >
        {info.description || 'Details'}
      </span>
    </div>
  );
};



// CellWithModal component has been integrated into the Cell component

// Cell component with notes and rating indicator
const Cell: React.FC<{
  row: Row<Product>;
  column: Column<Product, unknown>;
  info?: any;
}> = ({ row, column, info }) => {
  const { openModal } = useModal();
  const columnId = column.id;
  const columnDef = columnsObj[columnId];
  const product: Product = row.original;
  
  // If no column definition, return empty div
  if (!columnDef) {
    return <div></div>;
  }

  const cellStyle = columnDef.getStyle ? columnDef.getStyle(product) : {};
  
  // Get popover content if available
  const popoverContent = columnDef.renderModal?.(product) ||
                         (typeof product[columnId as keyof Product] === 'object' &&
                          (product[columnId as keyof Product] as any)?.notes?.());
  
  // Create click handler for modal if popover content exists
  const handleClick = popoverContent ? () => {
    const title = (() => {
      if (info?.renderModalTitle) {
        return info.renderModalTitle(product)
      }
      return [
        columnsObj.model.getValue(product),
        (info?.label) || columnId
      ].join(' - ')
    })()
    openModal(`cell-${columnId}-${product.key}`, title, popoverContent);
  } : undefined;

  // Case 1: If render function is provided, use it and pass the click handler
  if (columnDef.render) {
    return <div style={cellStyle}>{columnDef.render(product, handleClick)}</div>;
  }
  
  // Case 2: If format function is provided, use it and attach click handler if needed
  if (columnDef.format) {
    const formattedValue = columnDef.format(product);
    
    if (handleClick) {
      return (
        <div style={cellStyle}>
          <span style={clickableStyle} onClick={handleClick}>
            {formattedValue}
          </span>
        </div>
      );
    }
    
    return <div style={cellStyle}>{formattedValue}</div>;
  }
  
  // Default case: no render or format function
  return <div style={cellStyle}></div>;
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
function ProductTable({
  filteredData,
  columnFilters: urlFilters
}: ListenerProps) {
  // Access URL search parameters
  const navigate = useNavigate()
  
  // Initialize sorting state with Rank column in descending order
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'total', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);



  // Apply filters from URL search parameters
  useEffect(() => {
    // Update column filters
    // if (urlFilters.length > 0) {
      setColumnFilters(urlFilters);
    // }
  }, [urlFilters]);
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
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
         {/* Normal table: columns are attributes, rows are products */}
         <thead>
           <tr>
             {/* Each column header */}
             {table.getHeaderGroups()[0].headers.map(header => {
               const customDef = columnsObj[header.column.id]
               return (
                 <th
                   key={header.id}
                   className="text-nowrap"
                   style={customDef.columnStyle || {minWidth: 80}}
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
                         <Filter column={header.column} table={table}/>
                         {/* Add description with popover below the filter */}
                         <ColumnDescription
                           column={header.column}
                           info={customDef}
                         />
                       </div>
                     ) : null}
                   </div>
                 </th>
               )
             })}
           </tr>
         </thead>
         <tbody>
           {/* Each row is a product */}
           {table.getRowModel().rows.map(row => (
             <tr key={row.id}>
               {/* Each cell in this row represents a different attribute for this product */}
               {row.getVisibleCells().map(cell => {
                 const columnId = cell.column.id as keyof Product;
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

// Export the wrapped component with ModalProvider
export default function WrappedProductTable(props: ListenerProps) {
  return (
    <ModalProvider>
      <ProductTable {...props} />
    </ModalProvider>
  );
}
