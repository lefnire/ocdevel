import React, { useState, useMemo, useRef, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { data } from './treadmills/data';
import columnInfo from './treadmills/columns';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// Define the Product interface inline to avoid import issues
interface Attribute {
  value?: number;
  rating?: number;
  flag?: "red" | "yellow" | "green";
  notes?: () => React.ReactElement;
}

type BoolVal = Omit<Attribute, 'value'> & { value?: boolean };
type StringVal = Omit<Attribute, 'value'> & { value?: string };

interface Product {
  make: string;
  model: string;
  description: string | React.ReactElement;
  link: string;

  dimensions: Attribute | {
    value?: [number, number, number],
  };
  weight: Attribute;
  maxWeight: Attribute;
  maxSpeed: Attribute;
  horsePower: Attribute;
  age: StringVal;
  rating: Omit<Attribute, 'value'> & {
    value?: [[number, number], [number, number, number, number, number]];
  };
  fakespot: Omit<Attribute, 'value'> & {
    value?: [string, string];
  };
  price: Attribute & {
    sale?: number;
  };
  pickedBy: Omit<Attribute, 'value'> & {
    value?: Array<"me" | "trusted" | "public" | "websites">;
  };
  incline: Attribute;
  shock: BoolVal;
  quiet: BoolVal;
  sturdy: BoolVal;
  app: BoolVal;
  easyLube: BoolVal;
  amazon: BoolVal;
  countries: Omit<Attribute, 'value'> & {
    value?: string[];
  };
  pros?: Attribute[];
  cons?: Attribute[];
}

// Define the column info type
interface ColumnInfo {
  label: string;
  dtype: string;
  description?: string;
  rating: number;
  notes?: () => React.ReactElement;
}

// Function to create a header component with notes
const createHeaderComponent = (info: ColumnInfo) => {
  if (!info.notes) return undefined;
  
  return (params: any) => {
    const popover = (
      <Popover id={`popover-header-${params.column.getColId()}`}>
        <Popover.Header as="h3">{info.label}</Popover.Header>
        <Popover.Body>
          {info.notes && info.notes()}
        </Popover.Body>
      </Popover>
    );

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{params.displayName}</span>
        <OverlayTrigger trigger={["hover","focus"]} placement="bottom" overlay={popover}>
          <span style={{ marginLeft: '5px', cursor: 'pointer', color: '#007bff' }}>ⓘ</span>
        </OverlayTrigger>
      </div>
    );
  };
};

// Function to create a cell renderer with notes
const createCellRenderer = (field: string) => {
  return (params: any) => {
    // Safely convert value to string
    const displayValue = (() => {
      if (params.valueFormatted) return params.valueFormatted;
      if (params.value === null || params.value === undefined) return '';
      if (typeof params.value === 'object') {
        if (params.value.value !== undefined) return String(params.value.value);
        return JSON.stringify(params.value);
      }
      return String(params.value);
    })();
    
    if (!params.data[field] || !params.data[field].notes) {
      return displayValue;
    }

    const popover = (
      <Popover id={`popover-cell-${field}-${params.data.make}-${params.data.model}`}>
        <Popover.Header as="h3">{params.colDef.headerName}</Popover.Header>
        <Popover.Body>
          {params.data[field].notes()}
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger trigger={["hover","focus"]} placement="right" overlay={popover}>
        <span style={{ borderBottom: '1px dotted #007bff', cursor: 'pointer' }}>
          {displayValue}
        </span>
      </OverlayTrigger>
    );
  };
};

export default function Treadmills() {
  // Use the actual treadmill data
  const [rowData] = useState(data);

  // Format the dimensions as a string (e.g., "41.5"D x 22.8"W x 7"H")
  const formatDimensions = (params: any) => {
    if (!params.value || !params.value.value) return '';
    const [d, w, h] = params.value.value;
    return `${d}"D x ${w}"W x ${h}"H`;
  };

  // Format the rating as a string (e.g., "4.7 (567 reviews)")
  const formatRating = (params: any) => {
    if (!params.value || !params.value.value) return '';
    const [[avg, count], distribution] = params.value.value;
    return `${avg.toFixed(1)} (${count} reviews)`;
  };

  // Format the fakespot rating
  const formatFakespot = (params: any) => {
    if (!params.value || !params.value.value) return '';
    const [product, company] = params.value.value;
    return `P: ${product}, C: ${company}`;
  };

  // Format the pickedBy field
  const formatPickedBy = (params: any) => {
    if (!params.value || !params.value.value) return '';
    return params.value.value.join(', ');
  };

  // Format the countries field
  const formatCountries = (params: any) => {
    if (!params.value || !params.value.value) return '';
    return params.value.value.join(', ');
  };

  // Format the age field
  const formatAge = (params: any) => {
    if (!params.value || !params.value.value) return '';
    return params.value.value;
  };

  // Get the value for a field
  const valueGetter = (params: any) => {
    const field = params.colDef.field;
    if (!params.data[field]) return '';
    return params.data[field].value;
  };

  // Default formatter for any object type
  const defaultFormatter = (params: any) => {
    if (!params.value) return '';
    if (typeof params.value === 'object' && params.value.value !== undefined) {
      return params.value.value;
    }
    return params.value;
  };

  // Cell style based on flag
  const cellStyle = (params: any) => {
    const field = params.colDef.field;
    if (!params.data[field] || !params.data[field].flag) return null;
    
    const flag = params.data[field].flag;
    if (flag === 'green') return { backgroundColor: '#e6ffe6' };
    if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
    if (flag === 'red') return { backgroundColor: '#ffcccc' };
    return null;
  };

  // Generate column definitions based on the column info
  const columnDefs = useMemo<ColDef<Product>[]>(() => {
    const baseColumns: ColDef<Product>[] = [
      {
        headerName: 'Make',
        field: 'make',
        filter: true,
        sortable: true
      },
      {
        headerName: 'Model',
        field: 'model',
        filter: true,
        sortable: true
      }
    ];

    // Add columns from columnInfo
    const infoColumns = Object.entries(columnInfo as Record<string, ColumnInfo>).map(([key, info]) => {
      const column: ColDef<Product> = {
        headerName: info.label,
        field: key as any, // Type assertion to handle dynamic field names
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        tooltipValueGetter: (params: any) => {
          return info.description || '';
        },
        headerComponentParams: {
          template: info.label
        }
      };

      // Add header component if notes exist
      if (info.notes) {
        column.headerComponent = createHeaderComponent(info);
      }

      // Add specific formatters based on data type
      if (key === 'dimensions') {
        column.valueFormatter = formatDimensions;
      } else if (key === 'rating') {
        column.valueFormatter = formatRating;
      } else if (key === 'fakespot') {
        column.valueFormatter = formatFakespot;
      } else if (key === 'pickedBy') {
        column.valueFormatter = formatPickedBy;
      } else if (key === 'countries') {
        column.valueFormatter = formatCountries;
      } else if (key === 'age') {
        column.valueFormatter = formatAge;
      } else if (info.dtype === 'boolean') {
        column.cellRenderer = (params: any) => {
          return params.value && params.value.value ? '✓' : '';
        };
      } else if (info.dtype === 'number' || key === 'price') {
        column.valueGetter = valueGetter;
      }

      // Add cell renderer if notes exist in any data for this field
      const hasNotes = data.some(item => item[key] && item[key].notes);
      if (hasNotes) {
        column.cellRenderer = createCellRenderer(key);
      }

      return column;
    });

    return [...baseColumns, ...infoColumns];
  }, []);

  // Default column definitions
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    filter: true,
    sortable: true,
    valueFormatter: defaultFormatter,
  }), []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <h1>Treadmill Comparison</h1>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        theme="legacy"
      />
    </div>
  );
}