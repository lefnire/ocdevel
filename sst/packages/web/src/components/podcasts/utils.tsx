import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Accordion from 'react-bootstrap/Accordion'
import {Link} from 'react-router-dom'
import React from "react";
import ReactMarkdown from "react-markdown";
import {BiChevronDown} from '@react-icons/all-files/bi/BiChevronDown'
import {BiChevronRight} from '@react-icons/all-files/bi/BiChevronRight'
import {FiMinusSquare} from '@react-icons/all-files/fi/FiMinusSquare'
import {FiPlusSquare} from '@react-icons/all-files/fi/FiPlusSquare'
import compact from 'lodash/compact'

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