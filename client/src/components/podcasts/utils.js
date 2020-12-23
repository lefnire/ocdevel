import {
  Button,
  Popover,
  OverlayTrigger,
  ButtonGroup,
  Nav
} from "react-bootstrap";
import {useLocation} from 'react-router-dom'
import {FaArrowLeft} from "react-icons/all";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";
import ReactMarkdown from "react-markdown";

export const dateFmt = 'MMM DD, YYYY';

export function BackButton() {
  return <LinkContainer to='/mlg'>
    <Button className="text-dark mb-2" variant="link">
      <FaArrowLeft /> All Episodes
    </Button>
  </LinkContainer>
}

export const patreonLink = 'https://www.patreon.com/machinelearningguide'

export function Popover_({children, content, id=null, title=null, opts={}}) {
  const popover = (
    <Popover id={id || +new Date}>
      {title && <Popover.Title as="h3">Popover right</Popover.Title>}
      <Popover.Content>
        {content}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger={["hover", "focus"]} overlay={popover} {...opts}>
      {children}
    </OverlayTrigger>
  );
}

export const btns = {
  on: {size: "sm", variant: "outline-dark", className: "font-weight-bold"},
  off: {size: "sm", variant: "outline-secondary"},
  iconBtn: {
    variant: 'light',
    size: "sm",
    className: 'icon-btn'
  },
  icon: {
    size: 20
  },

  tabs: (tab, setTab, buttons) => {
    const className = 'pointer list-inline-item mr-3 '
    return <ul className='text-center list-inline mb-0'>
      {buttons.map(b => (
        <li
          className={className + (tab === b.k ? 'text-dark text-underline' : 'text-muted')}
          onClick={() => setTab(b.k)}
        ><h5>{b.v}</h5></li>
      ))}
    </ul>
  }
}

export function ReactMarkdown_({source}) {
  // TODO turn h2s into h3s
  return <ReactMarkdown
    source={source}
    linkTarget="_blank"
  />
}