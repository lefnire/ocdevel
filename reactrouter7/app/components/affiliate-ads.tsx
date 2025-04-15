import { Link } from "react-router";
import { FaWalking } from "@react-icons/all-files/fa/FaWalking";
import { FaMicrophone } from "@react-icons/all-files/fa/FaMicrophone";
import Card from 'react-bootstrap/cjs/Card';
import Row from 'react-bootstrap/cjs/Row';
import Col from '~/components/col';
import {clickAffiliate} from "~/components/analytics";

// Assuming /creator is the correct path for the Descript link
const descriptLink = "/creator";


export function AffiliateAds({ className = "" }: { className?: string }) {
  return (
    <Row className={className}>
      <Col xs={12} md={6} className="mb-2 mb-md-0"> {/* Stack on xs, side-by-side md+ */}
        <Card className="border-0 bg-light h-100" body> {/* Use h-100 for equal height cards */}
          <div>
            <FaWalking className="me-2" />
            <Link
              onClick={clickAffiliate('walk')}
              to="/walk"
            >
              Try a walking desk
            </Link>
          </div>
          <div>
            <small>
              Stay healthy & sharp while you learn & code
            </small>
          </div>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="border-0 bg-light h-100" body>
          <div>
            <small>
              <FaMicrophone className="me-2" />
              <a
                onClick={clickAffiliate('descript')}
                href={descriptLink}
                target="_blank"
                rel="noopener noreferrer"
              >Try Descript</a>
            </small>
          </div>
          <small>
            Audio/video editing with AI power-tools
          </small>
        </Card>
      </Col>
    </Row>
  );
}