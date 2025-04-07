import {type FC, memo} from "react";
import {
  type SortDirection
} from '@tanstack/react-table';
import type {
  Column,
} from '@tanstack/react-table';
import type {Row as Product} from '~/content/treadmills/computed';
import {FaArrowUp} from "@react-icons/all-files/fa/FaArrowUp";
import {FaArrowDown} from "@react-icons/all-files/fa/FaArrowDown";
import {useModalStore} from "~/components/modal";

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