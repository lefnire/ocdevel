import Badge from 'react-bootstrap/cjs/Badge';
import Card from 'react-bootstrap/cjs/Card';
import {Link} from "react-router";
import {DateHeader, buildTitle} from '~/routes/podcast/utils'
import {useContext} from "react";
import {ShowContext} from "~/routes/podcast/context";
import {EpisodeContext} from "~/routes/podcast.$id/context";

export type Teaser = {i?: number}
export default function Teaser({i}: Teaser) {
  const {podcastKey} = useContext(ShowContext)
  const {episode: e} = useContext(EpisodeContext)
  const link = `/${podcastKey}/${e.id}`
  const title = buildTitle()

  function renderTitle() {
    const className = e.archived ? 'text-muted text-decoration-line-through' : ''
    return <Card.Title>
      <Link to={link} className={className}>{title}</Link>
    </Card.Title>
  }

  function renderContent() {
    if (e.archived) {
      return <div className='text-muted'>This episode is archived. As I'm re-doing the podcast, some episodes are
        outdated or superfluous. <Link to={link}>You can still access it here</Link>.</div>
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
      {renderTitle()}
      <DateHeader />
      {renderDebugging()}
      {renderContent()}
    </Card.Body>
  </Card>
}