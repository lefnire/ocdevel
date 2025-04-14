import Row from 'react-bootstrap/cjs/Row'
import Col from '~/components/col'
import Container from 'react-bootstrap/cjs/Container'
import {Outlet} from 'react-router';
import {About} from "~/routes/podcast/about";
import {ShowContext} from "~/routes/podcast/context";
import type {Route} from './+types/route_mlg';

type Props = Route.ComponentProps & {img: string}

export default function Podcast({loaderData, matches, img}: Props) {
  const route = matches[matches.length - 1].id
  const isIndex = ['mlg._index', 'llh._index'].includes(route)
  const hideSidebarOnMobile = isIndex ? "" : "d-none d-md-block"

  return <ShowContext.Provider value={{...loaderData, img}}>
    <Container>
      <Row>
        <Col xs={12} md={5}>
          <div className={`${hideSidebarOnMobile} sticky-top`}>
            <About />
          </div>
        </Col>
        <Col xs={12} md={7}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </ShowContext.Provider>
}



