import {
  Link, NavLink,
  useLocation,
  useNavigate
} from "react-router";
import Button from 'react-bootstrap/Button'
import React, {Suspense, useCallback} from "react";
import Modal from "react-bootstrap/Modal";
import {FaArrowLeft} from "react-icons/fa"
import {Popover, OverlayTrigger, Accordion, Alert} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import {FiMinusSquare, FiPlusSquare} from "react-icons/fi";
import {BiChevronDown, BiChevronRight} from "react-icons/bi";
import compact from 'lodash/compact'

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


export function usePodcastKey() {
  const location = useLocation();
  const splits = location.pathname.split("/").filter(Boolean)
  return splits[0]
}

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

const renderers = {
  // TODO convert h2 to h3
  // heading: (props) => {
  //   return createElement(`h${props.level}`, getCoreProps(props), props.children)
  // },
  link: ({href, children}) => {
    if (href[0] === '/') {
      return <Link to={href}>{children}</Link>
    }
    return <a href={href} target='_blank'>{children}</a>
  }
}

export function ReactMarkdown_(props) {
  const {children, source, ...rest} = props

  const props_ = {
    ...rest,
    children: children || source,
    components: props.renderers? {...renderers, ...props.renderers} : renderers
  }
  return <ReactMarkdown {...props_}/>
}

export const icons = {
  plus: <FiPlusSquare />,
  minus: <FiMinusSquare />,
  down: <BiChevronDown />,
  right: <BiChevronRight />
}

export function Accordion_({items}) {
  if (!items?.length) {return null}
  return <Accordion defaultActiveKey="0">
    {compact(items).map((item, i) => <Accordion.Item key={""+i} eventKey={""+i}>
      <Accordion.Header>{item.title}</Accordion.Header>
      <Accordion.Body>{item.body}</Accordion.Body>
    </Accordion.Item>)}
  </Accordion>
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
  return <p>This is part of my <Link to="/blog/20240111-tylers-setup">battlestation setup</Link>, where I discuss fitness desks, ergo peripherals, laptops, and more.</p>;
}