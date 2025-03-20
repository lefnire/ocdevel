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

export * from './meta.js';

// Define the column info type
interface ColumnInfo {
  label: string;
  dtype: string;
  description?: string;
  rating: number;
  notes?: () => React.ReactElement;
}

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
  if (!info.notes) {
    return <div style={{ whiteSpace: 'nowrap', minWidth: '100px' }}>{info.label}</div>;
  }
  
  const popover = (
    <Popover id={`popover-header-${column.id}`}>
      <Popover.Header as="h3">{info.label}</Popover.Header>
      <Popover.Body>
        {info.notes && info.notes()}
      </Popover.Body>
    </Popover>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', minWidth: '100px' }}>
      <span>{info.label}</span>
      <OverlayTrigger trigger={["hover","focus"]} placement="bottom" overlay={popover}>
        <span style={{ marginLeft: '5px', cursor: 'pointer', color: '#007bff' }}>ⓘ</span>
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
      <div className="d-flex gap-2">
        <InputGroup size="sm" className="mb-2">
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
            className="w-24 border shadow rounded"
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
            className="w-24 border shadow rounded"
          />
        </InputGroup>
      </div>
    );
  }
  
  // Use boolean filter for boolean columns
  if (isBooleanColumn(columnId)) {
    return (
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
        className="mb-2"
      >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Form.Select>
    );
  }
  
  // Use text filter for other columns
  return (
    <InputGroup size="sm" className="mb-2">
      <Form.Control
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
      />
    </InputGroup>
  );
};

export default function Treadmills() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  
  // Column helper
  const columnHelper = createColumnHelper<Product>();
  
  // Create columns
  const columns = React.useMemo(() => {
    // Base columns
    const baseColumns = [
      columnHelper.accessor('make', {
        header: 'Make',
        cell: info => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('model', {
        header: 'Model',
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
        <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed', width: 'auto', minWidth: '100%' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} style={{ whiteSpace: 'nowrap', minWidth: '120px' }}>
                    {header.isPlaceholder ? null : (
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
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}