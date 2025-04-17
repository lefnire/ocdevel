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

const iconClass = {className: "me-2"}
const sections = {
  walk: {
    icon: <FaWalking {...iconClass} />,
    header: <Link
      onClick={clickAffiliate('walk')}
      to="/walk"
    >Walking Desk</Link>,
    body: "Stay healthy while I work & study"
  },
  descript: {
    icon: <>
      <FaCode {...iconClass} />
      <FaMicrophone {...iconClass} />
    </>,
    header: <Link
      onClick={clickAffiliate('software')}
      to="/blog/20240111-tylers-setup"
      target="_blank"
    >Software</Link>,
    body: "AI code, AI content-creation",
  },
  ergo: {
    icon: <FaComputerMouse {...iconClass} />,
    header: <Link
      onClick={clickAffiliate('ergo')}
      to="/blog/20240110-ergo-mouse-keyboard"
    >Ergonomics</Link>,
    body: "Ergo mouse & keyboard",
  },
  laptop: {
    icon: <FaLaptop {...iconClass} />,
    header: <Link
      to="/blog/20240108-ml-gaming-laptop"
      onClick={clickAffiliate('laptop')}
    >Laptop</Link>,
    body: "Gaming & machine learning PC"
  }
}

const LinkCard = memo<{id:string}>(({id}) => {
  const section = sections[id]
  return <div className="h-100 m-1 p-1">
    <div>
      <small>
        {section.icon}
        {section.header}
      </small>
    </div>
    <small className="d-none d-md-block">{section.body}</small>
  </div>
})

export function AffiliateAds({ className = "" }: { className?: string }) {
  return <Card className={`border-0 bg-light p-0 ${className}`} body>
    <h5 className="text-center">Tyler's Battlestation</h5>
    <Row>
      <Col xs={6} md={6}>
        <LinkCard id="walk" />
      </Col>
      <Col xs={6} md={6}>
        <LinkCard id="descript" />
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={6}>
        <LinkCard id="ergo" />
      </Col>
      <Col xs={6} md={6}>
        <LinkCard id="laptop" />
      </Col>
    </Row>
  </Card>;
}