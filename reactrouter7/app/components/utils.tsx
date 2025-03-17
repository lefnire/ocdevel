// import {
//   useLocation,
// } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import React, {Suspense, useCallback} from "react";
import Modal from "react-bootstrap/Modal";

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

interface BackButton {
  to?: string
}
export const BackButton = ({to}: BackButton) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  }, [to])

  return <Button
    className="text-dark mb-2"
    variant="link"
    onClick={onClick}
  >
    <FaArrowLeft /> Back
  </Button>
};

const Modal_ = <Modal show={true} animation={false}>
  <Modal.Header>
    <Modal.Title>Loading...</Modal.Title>
  </Modal.Header>
</Modal>

type Lazy = { c: any, props?: object }
export function Lazy ({c, props={}}: Lazy) {
  const C = React.lazy(c)
  return <Suspense fallback={Modal_}>
    <C {...props} />
  </Suspense>
}

export function usePodcastKey() {
  const location = useLocation();
  const splits = location.pathname.split("/").filter(Boolean)
  return splits[0]
}