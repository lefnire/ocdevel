import {
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import {Link} from 'react-router-dom'
import React from "react";
import ReactMarkdown from "react-markdown";
import {BiChevronDown, BiChevronRight, FiMinusSquare, FiPlusSquare} from "react-icons/all";
import {render} from "@testing-library/react";

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

export const btns = {
  on: {
    size: "sm",
    variant: "outline-dark",
    className: "text-start filter-selected"
  },
  off: {
    size: "sm",
    variant: "outline-secondary",
    className: "text-start"
  },
  iconBtn: {
    variant: 'light',
    size: "sm",
    className: 'icon-btn'
  },
  icon: {
    size: 20
  },
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
  const props_ = {
    ...props,
    renderers: props.renderers? {...renderers, ...props.renderers} : renderers
  }
  return <ReactMarkdown {...props_}/>
}

export const icons = {
  plus: <FiPlusSquare />,
  minus: <FiMinusSquare />,
  down: <BiChevronDown />,
  right: <BiChevronRight />
}