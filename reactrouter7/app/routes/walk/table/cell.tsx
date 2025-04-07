import {type FC, memo, useCallback, useMemo} from "react";
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
}> = memo(({row, column}) => {
  const columnId = column.id;
  const colDef = columnsObj[columnId];
  const product: Product = row.original;

  // If no column definition, return empty div
  if (!colDef) {
    return <div></div>;
  }

  const cellStyle = colDef.getStyle ? colDef.getStyle(product) : {};
  const rawValue = colDef.getValue(product); // Get the raw value

  // --- Modal Logic (Run this *before* NA check) ---
  // Get popover content if available

  // Create click handler for modal if popover content exists
  const handleClick = useMemo(() => {
    const modalFn = (
      colDef.renderModal ||
      (product as any)[columnId]?.notes
    )
    if (!modalFn) { return undefined; }
    const title = (() => {
      if (colDef.renderModalTitle) {
        return colDef.renderModalTitle(product)
      }
      return [
        columnsObj.model.getValue(product),
        (colDef.label) || columnId
      ].join(' - ')
    })()
    return () => useModalStore.getState().openModal({
      title,
      body: () => modalFn(product)
    });

  }, [])
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
  if (colDef.render) {
    return <div style={cellStyle}>{colDef.render(product, handleClick)}</div>;
  }

  // Case 2: If format function is provided, use it and attach click handler if needed
  if (colDef.format) {
    // Pass the non-NA rawValue to format if needed, or let format recalculate
    const formattedValue = colDef.format(product); // Assuming format uses product directly

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
});

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