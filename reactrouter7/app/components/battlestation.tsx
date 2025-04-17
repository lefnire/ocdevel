import { Link } from "react-router";
import { FaWalking } from "@react-icons/all-files/fa/FaWalking";
import { FaMicrophone } from "@react-icons/all-files/fa/FaMicrophone";
import Card from 'react-bootstrap/cjs/Card';
import Row from 'react-bootstrap/cjs/Row';
import Col from '~/components/col';
import {clickAffiliate} from "~/components/analytics";
import {memo, type ReactElement} from "react";
import {FaComputerMouse} from "react-icons/fa6";
import {FaLaptop} from "@react-icons/all-files/fa/FaLaptop";
import {FaCode} from "@react-icons/all-files/fa/FaCode";
import type {ColProps} from "react-bootstrap/cjs/Col";

const iconClass = {className: "ms-2"}
const sections = {
  walk: {
    icon: <FaWalking {...iconClass} />,
    header: <Link
      onClick={clickAffiliate('walk')}
      to="/walk"
      reloadDocument
    >Walking Desk</Link>,
    body: "Stay healthy while I work & study"
  },
  software: {
    icon: <>
      <FaCode {...iconClass} />
      <FaMicrophone {...iconClass} />
    </>,
    header: <Link
      onClick={clickAffiliate('software')}
      to="/blog/20240111-tylers-setup"
      reloadDocument
    >Software</Link>,
    body: "AI code, AI content-creation",
  },
  ergo: {
    icon: <FaComputerMouse {...iconClass} />,
    header: <Link
      onClick={clickAffiliate('ergo')}
      to="/blog/20240110-ergo-mouse-keyboard"
      reloadDocument
    >Ergonomics</Link>,
    body: "Ergo mouse & keyboard",
  },
  laptop: {
    icon: <FaLaptop {...iconClass} />,
    header: <Link
      to="/blog/20240108-ml-gaming-laptop"
      onClick={clickAffiliate('laptop')}
      reloadDocument
    >Laptop</Link>,
    body: "Gaming & machine learning PC"
  }
}

type LinkCard = {id: string, left?: boolean}
const LinkCard = memo<LinkCard>(({id, left}) => {
  const section = sections[id]
  return <div className="h-100 m-1 p-1 d-flex flex-column align-items-start">
    <div>
      <small className="card-title">
        {section.header}
        {section.icon}
      </small>
    </div>
    <small className="d-none d-md-block">{section.body}</small>
  </div>
})

type Battlestation = {
  className?: string
  left?: boolean
}
export function Battlestation({
  className="",
  left=false,
}: Battlestation) {
  const colProps: ColProps = left ? {xs: 12} : {xs: 6}
  return <div data-nosnippet="true">
    <Card className={`border-0 bg-light p-0 ${className}`} body>
      <h5 className={left ? "" : "text-center"}>Tyler's Battlestation</h5>
      <Row>
        <Col {...colProps}>
          <LinkCard id="walk" />
        </Col>
        <Col {...colProps}>
          <LinkCard id="software" />
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <LinkCard id="ergo" />
        </Col>
        <Col {...colProps}>
          <LinkCard id="laptop" />
        </Col>
      </Row>
    </Card>
  </div>
}