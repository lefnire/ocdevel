import {
  Link, NavLink,
  useNavigate
} from "react-router";
import {Button} from 'react-bootstrap'
import React, {type ReactElement, useCallback} from "react";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft"
import {Popover, OverlayTrigger, Alert} from "react-bootstrap";
import {FiMinusSquare} from "@react-icons/all-files/fi/FiMinusSquare";
import {FiPlusSquare} from "@react-icons/all-files/fi/FiPlusSquare";
import {BiChevronDown} from "@react-icons/all-files/bi/BiChevronDown";
import {BiChevronRight} from "@react-icons/all-files/bi/BiChevronRight";

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
  label?: string
}
export const BackButton = ({to, label="Back"}: BackButton) => {
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
    <FaArrowLeft /> {label}
  </Button>
};

export const dateFmt = 'MMM DD, YYYY';

export function Popover_({children, content, id=null, title=null, opts={}}) {
  opts = {placement: "right", ...opts}

  const popover = <Popover id={id || +new Date}>
    {title && <Popover.Header as={typeof title === "string" ? "h3" : "div"}>
      {title}
    </Popover.Header>}
    <Popover.Body>{content}</Popover.Body>
  </Popover>

  return <OverlayTrigger trigger={["hover", "focus"]} overlay={popover} {...opts}>
    {children}
  </OverlayTrigger>
}

export const icons = {
  plus: <FiPlusSquare />,
  minus: <FiMinusSquare />,
  down: <BiChevronDown />,
  right: <BiChevronRight />
}

export function LinkContainer({children, ...props}) {
  return <NavLink
    role="button"
    className={({ isActive, isPending, isTransitioning }) =>
      [
        isPending ? "pending" : "",
        isActive ? "active" : "",
        isTransitioning ? "transitioning" : "",
        "nav-link"
      ].join(" ").trim()
    }
    {...props}
  >
    {children}
  </NavLink>
}

export function TLDR({children}) {
  return <Alert variant='info'><b>TL;DR</b> {children}</Alert>
}

export function BattleStation() {
  return <p>This is part of my <Link to="/blog/20240111-tylers-setup">battlestation setup</Link>, where I discuss treadmill desks, ergo peripherals, laptops, and more.</p>;
}