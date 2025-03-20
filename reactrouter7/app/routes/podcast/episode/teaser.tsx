import {Badge, Card} from "react-bootstrap";
import {Link} from "react-router";
import React, {useMemo} from "react";
import {type EpisodeComponent, Player, Markdown_, DateHeader, buildTitle} from './utils'

export default function Teaser(props: EpisodeComponent) {
  const {podcastKey, episode: e, i} = props
  const link = `/${podcastKey}/${e.id}`
  const title = buildTitle(props)

  const player = useMemo(() => <Player {...props} />, [])

  function renderContent() {
    if (e.archived) {
      return <div className='text-muted'>This episode is archived. As I'm re-doing the podcast, some episodes are
        outdated or superfluous. <Link to={`/mlg/${e.episode}`}>You can still access it here</Link>.</div>
    }
    if (e.empty || !e.default) {
      return <Markdown_ Content={e.teaser} teaser />
    }
    return <>
      <div className='fade-post'>
        <Markdown_ Content={e.teaser} teaser/>
        {e.teaser && <hr />}
        <Markdown_ Content={e.default} teaser />
        <div className='fade-post-bottom' />
      </div>
      <Link to={link}>Read More</Link>
    </>
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
      <Card.Title>
        <Link to={link} className={e.archived ? 'text-muted text-decoration-line-through' : ''}>{title}</Link>
      </Card.Title>
      <DateHeader {...props} />
      {player}
      {renderDebugging()}
      {renderContent()}
    </Card.Body>
  </Card>
}