import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable, type Header,
} from '@tanstack/react-table';
import type {
  SortingState,
  Row,
  Cell,
  Table,
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/types';
import {columnsArray, columnsObj} from '~/content/treadmills/columns';
import {ProductContext} from "../context";
import {Filter, filterFn, sortingFn} from './filter'
import {HeaderCell, ColumnDescription} from './header'
import {CellContent, CellScore} from './cell'
import {TableContext} from './context'

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
  const dataObj = {} // Object.fromEntries(filteredData.map(d => [d.key, d]))

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
            <HeaderCell
              label={colDef.label}
              isSorted={column.getIsSorted()}
            />
          ),
          cell: ({row, column}) => (
            // <CellContent rowId={row.original.key} columnId={column.id} />
            <CellContent row={row} column={column} />
          ),
          enableSorting: true,
          enableColumnFilter: true,
          filterFn,
          sortingFn
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
  return <TableContext.Provider value={{table, dataObj}}>
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
const TableColumns = (props: TableColumns) => {
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
            <ColumnDescription id={header.column.id} />
          </div>
        ) : null}
      </div>
    </th>
  )
})

type TableRows = {}
const TableRows = (props: TableRows) => {
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