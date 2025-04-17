import Container from 'react-bootstrap/cjs/Container';
import {Outlet} from "react-router";
import Row from "react-bootstrap/cjs/Row";
import Col from "~/components/col"
import type {Route} from './+types/route'
import {Battlestation} from "~/components/battlestation";

export default function Blog({matches}: Route.ComponentProps) {
  const route = matches[matches.length - 1].id
  const isIndex = 'blog._index' === route
  const hideSidebarOnMobile = isIndex ? "" : "d-none d-md-block"

  return <Container>
      <Row>
        <Col xs={12} md={3}>
          <div className={`${hideSidebarOnMobile} sticky-top mt-3`}>
            <Battlestation left />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
}