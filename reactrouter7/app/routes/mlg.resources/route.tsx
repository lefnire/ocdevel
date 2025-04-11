import Row from 'react-bootstrap/cjs/Row';
import Col from '~/components/col';
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

const about = "Best machine learning resources. A curated syllabus of learning resources for machine learning, artificial intelligence, and data science."

export default function Resources({loaderData}: Route.ComponentProps) {
  return <div className="podcasts">
    <Navbar />
    <Container fluid className="resources">
      <p className='mlg-update ps-3 small'>
        {about} Organized in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. {/*To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>*/}
        Updated 2025-04-08.
      </p>
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
    {title: `Learn Machine Learning & Artificial Intelligence`},
    {name: "description", content: `${about} With filters for your preferred learning formats (video, audio, book) and difficulty (easy, medium, hard).`}
  ]
}