import {Badge, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router";
import React, {useMemo} from "react";
import {type EpisodeComponent, Player, Markdown_, DateHeader, buildTitle} from '~/components/podcast.tsx'
import {FaCirclePlay} from "react-icons/fa6";

export default function Teaser(props: EpisodeComponent) {
  const {podcastKey, episode: e, i} = props
  const link = `/${podcastKey}/${e.id}`
  const title = buildTitle(props)

  function renderContent() {
    if (e.archived) {
      return <div className='text-muted'>This episode is archived. As I'm re-doing the podcast, some episodes are
        outdated or superfluous. <Link to={`/mlg/${e.episode}`}>You can still access it here</Link>.</div>
    }
    return <p className='mt-2'>{e.teaser}</p>
    // git-blame for faded body render
  }

  function renderDebugging() {
    if (import.meta.env.PROD) {return null;}
    return <div>
      {e.episode && <Badge className='me-2'>Original {e.episode}</Badge>}
      {e.mergeEpisode && <Badge className='me-2'>Merge {e.mergeEpisode}</Badge>}
      <Badge className='me-2'>i {i+1}</Badge>
    </div>
  }

  return <Card className={`mb-3 card-post`}>
    <Card.Body>
      <Row className="align-items-center">
        <Col>
          <Card.Title>
            <Link to={link} className={e.archived ? 'text-muted text-decoration-line-through' : ''}>{title}</Link>
          </Card.Title>
          <DateHeader {...props} />
          {renderDebugging()}
          {renderContent()}
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Link to={link} className="ms-auto">
            <FaCirclePlay
              size={75}
              className="text-black"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </Col>
      </Row>
    </Card.Body>
  </Card>
}