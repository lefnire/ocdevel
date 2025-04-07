import {type FC} from "react";
import type {
  Column,
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/computed';
import {columnsObj} from '~/content/treadmills/columns';
import Form from 'react-bootstrap/cjs/Form';

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
export const Filter: FC<{
  column: Column<Product, unknown>;
}> = ({column}) => {
  // const {table} = useContext(TableContext)
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