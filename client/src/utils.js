import {
  useLocation,
} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function IconButton({
  Icon,
  children,
  left=false,
  vr=true,
  size="",
  ...rest
}) {
  const size_ = {"sm": 16, "lg": 20, "": 20}[size]
  return <Button
    variant='outline-dark'
    className={`d-flex align-items-center ${left ? 'justify-content-start' : 'justify-content-center'}`}
    size={size}
    {...rest}
  >
    <span className={`btn-pad-${size} ${vr ? 'border-end' : ''}`}>
      <Icon size={size_} />
    </span>
    <span
      className={left ? '' : ' flex-grow-1'}
    >{children}</span>
  </Button>
}