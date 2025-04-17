import Container from 'react-bootstrap/cjs/Container';
import {Outlet} from "react-router";
import Row from "react-bootstrap/cjs/Row";
import Col from "~/components/col"
import {Battlestation} from "~/components/battlestation";

export default function Blog() {
  return <Container>
      <Row>
        <Col xs={12} md={3}>
          <div className="d-none d-md-block sticky-top mt-3">
            <Battlestation left />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
}