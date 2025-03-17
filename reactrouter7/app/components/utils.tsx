// import {
//   useLocation,
// } from "react-router-dom";
import Button from 'react-bootstrap/Button'

// export function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

export function IconButton({
  Icon,
  children,
  Icon2=null,
  left=false,
  vr=true,
  size="",
  className="",
  ...rest
}) {
  // Can pass Icon/Icon2 as either un-rendered component or rendered component (for performance). Currently
  // testing if is-rendered via $$typeof; is that right?
  size = size || "";
  const size_ = {"sm": 16, "lg": 20, "": 20}[size]
  return <Button
    variant='outline-dark'
    className={`d-flex align-items-center ${left ? 'justify-content-start' : 'justify-content-center'} ${className}`}
    size={size}
    {...rest}
  >
    <span className={`btn-pad-${size} ps-0 ${vr ? 'border-end' : ''}`}>
      {Icon.$$typeof ? Icon : <Icon size={size_} />}
    </span>
    {Icon2 && <span className={`btn-pad-${size}`}>
      {Icon2.$$typeof ? Icon2 : <Icon2 size={size_} />}
    </span>}
    <span
      className={`btn-pad-${size} ${left ? '' : 'flex-grow-1'}`}
    >{children}</span>
  </Button>
}