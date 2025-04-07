import {createContext, type FC, memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable, type Header, type SortDirection
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
import Form from 'react-bootstrap/cjs/Form';
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";
import {FaArrowDown} from "@react-icons/all-files/fa/FaArrowDown";
import {ProductContext} from "./context";
import {useModalStore} from "~/components/modal";

const faArrowUp = <FaArrowUp />
const faArrowDown = <FaArrowDown />

// Header cell component with notes
const HeaderCell: FC<{
  label: string
  isSorted?: false | SortDirection
}> = memo(({label, isSorted}) => (
  <div className="text-nowrap" style={{maxWidth: '130px'}}>
    <div className="d-flex align-items-center">
      <span>{label}</span>
      {isSorted && (
        <span className="ms-1">
          {isSorted === 'asc' ? faArrowUp : faArrowDown}
        </span>
      )}
    </div>
  </div>
));

// Description component with notes modal
const ColumnDescription: FC<{
  column: Column<Product, unknown>;
  info: any;
}> = ({column, info}) => {

  if (!info.description && !info.notes) return <div>&nbsp;</div>;

  const handleClick = () => {
    useModalStore.getState().openModal({
      title: info.label,
      body: () => info.notes?.() || <div>{info.description}</div>
    });
  };

  return (
    <div className="mt-1">
      <span
        className="small text-secondary dotted-underline"
        onClick={handleClick}
      >
        {info.description || 'Details'}
      </span>
    </div>
  );
};


// CellWithModal component has been integrated into the Cell component

// Cell component with notes and rating indicator
const Cell: FC<{
  row: Row<Product>;
  column: Column<Product, unknown>;
  info?: any;
}> = ({row, column, info}) => {
  const columnId = column.id;
  const columnDef = columnsObj[columnId];
  const product: Product = row.original;

  // If no column definition, return empty div
  if (!columnDef) {
    return <div></div>;
  }

  const cellStyle = columnDef.getStyle ? columnDef.getStyle(product) : {};
  const rawValue = columnDef.getValue(product); // Get the raw value

  // --- Modal Logic (Run this *before* NA check) ---
  // Get popover content if available
  const bodyFn = (
    columnDef.renderModal ||
    (product as any)[columnId]?.notes
  )

  // Create click handler for modal if popover content exists
  const handleClick = bodyFn ? () => {
    const title = (() => {
      if (info?.renderModalTitle) {
        return info.renderModalTitle(product)
      }
      return [
        columnsObj.model.getValue(product),
        (info?.label) || columnId
      ].join(' - ')
    })()
    useModalStore.getState().openModal({
      title,
      body: () => bodyFn(product)
    });
  } : undefined;
  // --- End Modal Logic ---


  // --- Centralized NA Display Handling (with Modal Click) ---
  if (rawValue === NA) {
    if (handleClick) {
      return (
        <div style={cellStyle}>
          <span className="dotted-underline" onClick={handleClick}>
            N/A
          </span>
        </div>
      );
    }
    return <div style={cellStyle}>N/A</div>; // Render N/A without click handler
  }
  // --- End Centralized NA Display Handling ---


  // --- Original Rendering Logic (for non-NA values) ---

  // Case 1: If render function is provided, use it and pass the click handler
  if (columnDef.render) {
    return <div style={cellStyle}>{columnDef.render(product, handleClick)}</div>;
  }

  // Case 2: If format function is provided, use it and attach click handler if needed
  if (columnDef.format) {
    // Pass the non-NA rawValue to format if needed, or let format recalculate
    const formattedValue = columnDef.format(product); // Assuming format uses product directly

    if (handleClick) {
      return (
        <div style={cellStyle}>
          <span className="dotted-underline" onClick={handleClick}>
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
const NumericFilter: FC<{
  column: Column<Product, unknown>;
  columnFilterValue: [number, number] | undefined;
  filterOptions: { min?: boolean; max?: boolean };
}> = ({column, columnFilterValue, filterOptions}) => (
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
const BooleanFilter: FC<{
  column: Column<Product, unknown>;
  columnFilterValue: boolean | undefined;
}> = ({column, columnFilterValue}) => (
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
const TextFilter: FC<{
  column: Column<Product, unknown>;
  columnFilterValue: string | undefined;
}> = ({column, columnFilterValue}) => (
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
const Filter: FC<{
  column: Column<Product, unknown>;
  table: Table<Product>
}> = ({column, table}) => {
  const columnId = column.id;
  const columnFilterValue = column.getFilterValue();

  // Use numeric filter for numeric columns
  if (columnsObj[columnId].dtype === "number") {
    const columnDef = columnsObj[columnId];
    const filterOptions = columnDef?.filterOptions || {min: true, max: true};

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
    if (score <= 0) return null;

    // Determine color based on score
    const bgColorClass = score >= 7 ? 'bg-success' : score >= 4 ? 'bg-warning' : 'bg-danger';
    const textColorClass = score >= 4 ? 'text-dark' : 'text-white';

    return (
      <div
        className={`position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded opacity-85 ${bgColorClass} ${textColorClass} fw-bold`}
        style={{width: '18px', height: '18px', fontSize: '11px'}}
        title={`This attribute's score: ${score.toFixed(0)}/10`}
      >
        {score.toFixed(0)}
      </div>
    );
  }, [])

  return (
    <td key={cell.id} className="position-relative">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
      {score}
    </td>
  );
})