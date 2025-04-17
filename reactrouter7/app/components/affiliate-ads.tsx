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

const iconClass = {className: "me-2"}
const sections = {
  walk: {
    icon: <FaWalking {...iconClass} />,
    header: <Link
      onClick={clickAffiliate('walk')}
      to="/walk"
    >Walking desk</Link>,
    body: "Stay healthy while I work & study"
  },
  descript: {
    icon: <FaMicrophone {...iconClass} />,
    header: <a
      onClick={clickAffiliate('descript')}
      href="/creator"
      target="_blank"
      rel="noopener noreferrer"
    >Podcast Software</a>,
    body: "AI audio/video editing",
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
  return <Card className="border-0 bg-light h-100" body>
    <div>
      <small>
        {section.icon}
        {section.header}
      </small>
    </div>
    <small>{section.body}</small>
  </Card>
})

export function AffiliateAds({ className = "" }: { className?: string }) {
  return <div className={className}>
    <h5 className="text-center">Tyler's Battlestation</h5>
    <Row>
      <Col xs={12} md={6} className="mb-2 mb-md-0">
        <LinkCard id="walk" />
      </Col>
      <Col xs={12} md={6}>
        <LinkCard id="descript" />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} className="mb-2 mb-md-0">
        <LinkCard id="ergo" />
      </Col>
      <Col xs={12} md={6}>
        <LinkCard id="laptop" />
      </Col>
    </Row>
  </div>;
}