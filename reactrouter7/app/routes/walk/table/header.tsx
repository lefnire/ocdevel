import {type FC, memo, useCallback} from "react";
import {
  type SortDirection
} from '@tanstack/react-table';
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";
import {FaArrowDown} from "@react-icons/all-files/fa/FaArrowDown";
import {useModalStore} from "~/components/modal";
import {columnsObj} from "~/content/treadmills/columns";

const faArrowUp = <FaArrowUp />
const faArrowDown = <FaArrowDown />

// Header cell component with notes
export const HeaderCell: FC<{
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
export const ColumnDescription: FC<{
  id: string;
}> = memo(({id}) => {
  const colDef = columnsObj[id]
  if (!colDef.description && !colDef.notes) return <div>&nbsp;</div>;

  const handleClick = useCallback(() => {
    useModalStore.getState().openModal({
      title: colDef.label,
      body: () => colDef.notes?.() || <div>{colDef.description}</div>
    });
  }, []);

  return (
    <div className="mt-1">
      <span
        className="small text-secondary dotted-underline"
        onClick={handleClick}
      >
        {colDef.description || 'Details'}
      </span>
    </div>
  );
});