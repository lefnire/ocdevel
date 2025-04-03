import {FiPlusSquare} from "@react-icons/all-files/fi/FiPlusSquare";
import {FiMinusSquare} from "@react-icons/all-files/fi/FiMinusSquare";
import {BiChevronDown} from "@react-icons/all-files/bi/BiChevronDown";
import {BiChevronRight} from "@react-icons/all-files/bi/BiChevronRight";

/**
 * Memoize these once, so they're not re-rendered; but isolate them to a file,
 * so they're only included by routes that need them
 */
export const icons = {
  plus: <FiPlusSquare />,
  minus: <FiMinusSquare />,
  down: <BiChevronDown />,
  right: <BiChevronRight />
}