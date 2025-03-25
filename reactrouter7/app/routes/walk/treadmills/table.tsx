import React from "react";
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
import data, { dataObj, type Product } from './rows';
import columnInfo, { columnsArray, isNumericColumn, isBooleanColumn } from './columns';
import {OverlayTrigger, Popover, Form, Button, Badge, Container} from 'react-bootstrap';
import {FaArrowUp, FaArrowDown, FaArrowLeft} from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router';
import {FaX} from "react-icons/fa6";

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
  const columnDef = columnInfo[columnId];
  const product: Product = row.original || row;
  
  if (!columnDef || !columnDef.render) {
    return <div>{String(row.getValue ? row.getValue(columnId) : product[columnId as keyof Product]) || ''}</div>;
  }

  const displayValue = columnDef.render(product);
  const cellStyle = columnDef.getStyle ? columnDef.getStyle(product) : {};
  // Check if the attribute has notes
  const attr = product[columnId as keyof Product];

  const popoverContent = columnDef.renderPopover?.(product) || (attr as any)?.notes?.();
  // For columns with notes but no renderPopover
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
  if (isNumericColumn(columnId)) {
    const columnDef = columnInfo[columnId];
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
  if (isBooleanColumn(columnId)) {
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
  
  const bgColorClass = score >= 7 ? 'bg-success' :
                       score >= 4 ? 'bg-warning' :
                       'bg-danger';
  
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

export default function Treadmills() {
  // Initialize sorting state with Rank column in descending order
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'total', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  
  // URL parameters for comparison
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get comparison keys from URL
  const compareParam = searchParams.get('compare');
  const compareKeys = React.useMemo(() => 
    compareParam ? compareParam.split(',') : []
  , [compareParam]);
  const isCompareMode = compareKeys.length > 0;
  
  // Filter data based on comparison keys
  const filteredData = React.useMemo(() => {
    if (!isCompareMode) return data;
    return data.filter(product => compareKeys.includes(product.key));
  }, [compareKeys, isCompareMode]);
  
  // Handle "Show All" button click
  const handleShowAll = () => {
    // Remove the compare parameter from the URL
    searchParams.delete('compare');
    setSearchParams(searchParams);
  };
  
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
            // For numeric columns with range filtering
            if (isNumericColumn(columnId) && Array.isArray(filterValue)) {
              const [min, max] = filterValue;
              const columnDef = columnInfo[columnId];
              const value = columnDef?.getValue ? columnDef.getValue(row.original) : row.getValue(columnId);
              
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
              const value = columnDef?.getValue ? columnDef.getValue(row.original) : row.getValue(columnId);
              
              if (typeof value === 'boolean') {
                return value === filterValue;
              }
              
              return false;
            }
            
            // For string columns
            if (typeof filterValue === 'string') {
              const columnDef = columnInfo[columnId];
              const value = columnDef?.getValue ? columnDef.getValue(row.original) : row.getValue(columnId);
              
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
            if (columnDef?.getValue) {
              const valueA = columnDef.getValue(rowA.original);
              const valueB = columnDef.getValue(rowB.original);
              
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
    data: filteredData,
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
      {isCompareMode && <>
        <Container>
          <h3 className='text-center'>{dataObj[compareKeys[0]].brand.name} vs {dataObj[compareKeys[1]].brand.name} (Compared)</h3>
        </Container>
        <div className="mb-1">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleShowAll}
          >
            <FaArrowLeft /> Show All
          </Button>
        </div>
      </>}
      
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
                 const score = (
                   [
                     'total',
                     'model',
                     'brand',
                   ].includes(columnId) ? 0
                   : (row.original?.[columnId]?.score || 0)
                 )
                 
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
