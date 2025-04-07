import Row from 'react-bootstrap/cjs/Row';
import Col_ from 'react-bootstrap/cjs/Col';
const Col = Col_.default || Col_
import Container from 'react-bootstrap/cjs/Container';
import {Link} from 'react-router';
import Filters from "./tree/filters";
import {Tree} from './resources';
import type {Route} from './+types/route.tsx'
import Navbar from '../podcast/navbar'
import {mlgShow} from '~/content/podcast/metas.js'
import {transform} from '~/content/workflowy/mlg-resources'

export async function loader(props: Route.LoaderArgs) {
  const resources = await transform()
  return {
    show: mlgShow,
    resources,
  }
}

export default function Resources({loaderData}: Route.ComponentProps) {
  return <div className="podcasts">
    <Navbar />
    <Container fluid className="resources">
      <div className='mb-3 mlg-update ps-3 small'>
        [Updated 2020-10-28] These are resources to learn machine learning & data science. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>. <Link to="/walk">Try a walking desk</Link> to stay healthy while you study or work!
      </div>
      <Row>
        <Col xs={12} md={4} className='sidebar'>
          <Row>
            <Filters />
          </Row>
        </Col>
        <Col xs={12} md={8}>
          <Tree {...loaderData.resources} />
        </Col>
      </Row>
    </Container>
  </div>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `Machine Learning Guide Resources`},
    {name: "description", content: "A syllabus of the best resources to learning machine learning from beginning ot end, with filters for selecting your preferred learning formats (video, audio, book) and difficulty (easy, medium, hard)"}
  ]
}