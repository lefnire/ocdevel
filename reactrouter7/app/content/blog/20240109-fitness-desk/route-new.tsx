/*
I have an empty file here. I want to start building a fairly sophisticated React
table, but let's start simple. Create an AG Grid table using the data you can see
in data.tsx. You'll need to peek into the files that it imports to understand.

The individual named imports (egofit, urevo, etc) are each one file with data to
be used as the rows. Their keys should map to the columns/filters found in
filters.tsx. filters.tsx has a lot of comments / information on how this whole
setup should work, so read that file carefully in order to create the AG-table.
If you open one of the data files to understand better, just open one to keep
your context window slim
*/

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import {useState} from "react"; // React Data Grid Component

import {data, columns} from './treadmills/data';

export default function Treadmills() {

  /**
   * Sample code from AG Grid website
   */
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" }
  ]);

  return (
    // Data Grid will fill the size of the parent container
    <div style={{ height: 500 }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
        />
    </div>
)
}