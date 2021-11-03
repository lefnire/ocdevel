import {
  useLocation,
} from "react-router-dom";
import {Button} from 'react-bootstrap'

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function IconButton(props) {
  const {Icon, children, ...rest} = props;
  return <Button
    className='d-flex align-items-center'
    variant='outline-dark'
    {...rest}
  >
    <span>
      <Icon size={20} />
    </span>
    <span className='flex-grow-1'>{children}</span>
  </Button>
}