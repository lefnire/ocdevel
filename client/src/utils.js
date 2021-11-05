import {
  useLocation,
} from "react-router-dom";
import Button from 'react-bootstrap/Button'

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function IconButton({Icon, children, left=false, vr=false, size="lg", ...rest}) {
  const size_ = {"sm": 16, "lg": 20}[size]
  const spanClass = "me-2 " +
    (vr ? 'border-end ' : '') +
    (size === "sm" ? "btn-pad-sm" : "btn-pad-lg")
  return <Button
    variant='outline-dark'
    className={`p-0 d-flex align-items-center ${left ? 'justify-content-start' : 'justify-content-center'}`}
    {...rest}
  >
    <span className={spanClass}>
      <Icon size={size_} />
    </span>
    <span
      className={left ? 'ms-2' : 'flex-grow-1'}
    >{children}</span>
  </Button>
}