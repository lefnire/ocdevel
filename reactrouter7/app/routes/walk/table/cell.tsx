import {type FC, memo} from "react";
import type {
  Column,
  Row,
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/computed';
import {NA} from "~/content/treadmills/data/utils";
import {columnsObj} from '~/content/treadmills/columns';
import {useModalStore} from "~/components/modal";

// Cell component with notes and rating indicator
export const CellContent: FC<{
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

type CellScore = {score: number}
export const CellScore = memo(({score}: CellScore) => {
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
})