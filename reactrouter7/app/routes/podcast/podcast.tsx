import Row from 'react-bootstrap/cjs/Row'
import Col from '~/components/col'
import Container from 'react-bootstrap/cjs/Container'
import {Outlet} from 'react-router';
import {About} from "~/routes/podcast/about";

export default function Podcast() {
  return <>
    <Container>
      <Row>
        <Col xs={12} md={5}>
          <div className='d-none d-md-block'>
            <About />
          </div>
        </Col>
        <Col xs={12} md={7}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
}



