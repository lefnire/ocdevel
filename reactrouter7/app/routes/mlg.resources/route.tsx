import React from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import {Link} from 'react-router';
import Filters from "./filters"
import Tree from './tree'
import type {Route} from './+types/route.tsx'
import Navbar from '../podcast/navbar'
import {mlgShow} from '~/content/podcast/metas.js'

export function loader(props: Route.LoaderArgs) {
  return { show: mlgShow }
}

export default function Resources({loaderData}: Route.ComponentProps) {
  return <>
    <Navbar />
    <Container fluid className="resources">
      <div className='mb-3 mlg-update ps-3 small'>
        These are resources to learn machine learning & data science. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>. Support this show by trying a <Link to="/walk">walking desk</Link>!. [Updated 2020-10-28]
      </div>
      <Row>
        <Col xs={12} md={4} className='sidebar'>
          <Row>
            <Filters />
          </Row>
        </Col>
        <Col xs={12} md={8}>
          <Tree />
        </Col>
      </Row>
    </Container>
  </>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `Machine Learning Guide Resources`},
    {name: "description", content: "A syllabus of the best resources to learning machine learning from beginning ot end, with filters for selecting your preferred learning formats (video, audio, book) and difficulty (easy, medium, hard)"}
  ]
}