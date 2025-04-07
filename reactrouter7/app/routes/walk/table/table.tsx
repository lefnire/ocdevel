import {createContext, type FC, memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable, type Header,
  type SortDirection
} from '@tanstack/react-table';
import type {
  SortingState,
  Column,
  Row,
  Cell,
  Table,
  ColumnDef
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/computed';
import {NA} from "~/content/treadmills/data/utils";
import {columnsArray, columnsObj} from '~/content/treadmills/columns';
import {ProductContext} from "../context";
import {Filter} from './filter'
import {HeaderCell, ColumnDescription} from './header'
import {CellContent, CellScore} from './cell'


type TableContext = { table: Table<Product> }
// @ts-ignore
const TableContext = createContext<TableContext>({table: {}})

export default function Default() {
  // Initialize sorting state with Rank column in descending order
  const [sorting, setSorting] = useState<SortingState>([
    {id: 'total', desc: true}
  ]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);

  // Apply filters from URL search parameters
  const {filteredData, urlFilters} = useContext(ProductContext)
  useEffect(() => {
    // Update column filters
    // if (urlFilters.length > 0) {
    setColumnFilters(urlFilters);
    // }
  }, [urlFilters]);

  // Column helper
  const columnHelper = createColumnHelper<Product>();

  // Create columns
  const columns = useMemo(() => {
    return columnsArray.map(colDef => {
      return columnHelper.accessor(
        // Use the calculate function if available, otherwise use the key directly
        row => colDef.getValue ? colDef.getValue(row) : row[colDef.key as keyof Product],
        {
          id: colDef.key,
          header: ({column}) => (
            <HeaderCell label={colDef.label} isSorted={column.getIsSorted()} />
          ),
          cell: ({row, column}) => (
            <CellContent
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
          },
          sortingFn: (rowA, rowB, columnId) => {
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
  return <TableContext.Provider value={{table}}>
    <div className="w-100">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          {/* Normal table: columns are attributes, rows are products */}
          <thead>
          <tr>
            <TableColumns />
          </tr>
          </thead>
          <tbody>
            <TableRows />
          </tbody>
        </table>
      </div>
    </div>
  </TableContext.Provider>
}

type TableColumns = {}
const TableColumns = () => {
  const {table} = useContext(TableContext)
  if (!table) { return null; }
  const headers = table.getHeaderGroups()[0].headers
  return headers.map(header => <TableColumn
    key={header.id}
    header={header}
  />)
}

type TableColumn = { header: Header<Product, unknown> }
const TableColumn = (({header}: TableColumn) => {
  const {table} = useContext(TableContext)
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
            <Filter column={header.column} />
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
})

type TableRows = {}
const TableRows = () => {
  const {table} = useContext(TableContext)
  if (!table) { return null; }
  const rows = table.getRowModel().rows;
  return rows.map(row => <TableRow key={row.id} row={row}/>)
}

type TableRow = { row: Row<Product> }
const TableRow = memo(({row}: TableRow) => {
  const cells = row.getVisibleCells()
  return <tr>
    {/* Each cell in this row represents a different attribute for this product */}
    {cells.map((cell) => <TableCell row={row} cell={cell} key={cell.id}/>)}
  </tr>
})

type TableCell = TableRow & { cell: Cell<Product, unknown> }
const TableCell = memo(({cell, row}: TableCell) => {
  const columnId = cell.column.id as keyof Product;
  const columnDef = columnsObj[columnId];

  const score = useMemo(() => {
    // Only show score if hideScore is not true and the attribute has a score
    const score = columnDef.hideScore ? 0 : (row.original.c[columnId] || 0);
    return <CellScore score={score} />
  }, [])

  return (
    <td key={cell.id} className="position-relative">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
      {score}
    </td>
  );
})