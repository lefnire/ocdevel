import React from "react";
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import {Accordion_, dateFmt, ReactMarkdown_} from "../utils";
import padStart from "lodash/padStart";
import moment from "dayjs";
import {Link, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {BackButton, usePodcastKey} from "../../utils";
// import ReactDisqusComments from "react-disqus-comments";
import {ResourceNode} from './Resources'
import {episodesObj, llhEpisodesObj, mlg} from "../../../content/podcast";
import {episodes as episodeResources, flat} from '../../../content/podcast/resources'
import Badge from "react-bootstrap/Badge";
import {Comments} from "../../utils/Comments.tsx";

function ResourcesFlat({nids}) {
  let seen = {}
  function render(id) {
    const full = flat[id]
    if (!full) { return null }
    if (!full.pick) {
      if (seen[id]) {return null}
      seen[id] = true
      return <ResourceNode node={{id}} key={id} />
    }
    // using full.v instead of node.v, since we don't want filters
    return full.v.map(render)
  }
  return <div className='resources'>
    {nids.map(render)}
  </div>
}

// 8d7997de switched from component to returning memoized JSX, since iframe being
// re-rendered slowly each time. This trick doesn't seem to work either, figure out later
const players = {}
function player(e) {
  // if (e.mla) {return <div>TODO move to MLG</div>}
  const id = e.libsynEpisode
  if (!id) {return null}
  const color = e.archived ? '6c757d' : '111111';
  if (players[id]) {return players[id]}
  players[id] = <iframe
    title="Embed Player"
    src={`//play.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/128/theme/modern/size/standard/thumbnail/no/custom-color/${color}/time-start/00:00:00/download/no/hide-show/no/direction/backward/hide-playlist/no/hide-subscribe/no/hide-share/no`}
    height="128"
    width="100%"
    scrolling="no"
    allowFullScreen=""
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    oallowfullscreen="true"
    msallowfullscreen="true"
    style={{border: "none"}}
  />
  return players[id]
}

const teaserRenderers = {
  heading: ({children}) => {
    return <><strong>{children}</strong><br/></>
  }
}

const teaserMDX = {
  components: {
    h1: props => <><strong {...props} /><br/></>
  }
}

function Markdown_({Content, teaser=false}) {
  if (!Content) {return null}
  // Switching to new MDX setup, away from ReactMarkdown
  const isMdx = typeof Content !== "string";
  const opts = teaser ? (isMdx ? teaserMDX : teaserRenderers) : {}
  return typeof Content === "string" ?
    <ReactMarkdown_ source={Content} {...opts} />
    : <Content {...opts} />;
}

export function Episode({e, teaser, i=null}) {
  const podcastKey = usePodcastKey()
  const num = padStart(e.episode, 3, '0');
  const titleStart = podcastKey === "llh" ? "LLH" : e.mla ? "MLA" : "MLG"
  const title = `${titleStart} ${num} ${e.title}`;

  function renderDate() {
    if (!(e.created || e.date)) {
      return <Card.Subtitle className='mb-2 text-danger'>
        Podcast episode not yet released
      </Card.Subtitle>
    }
    return <Card.Subtitle className='text-muted mb-2'>
      {moment(e.created).format(dateFmt)}
      {e.updated && <>
        <span> (updated {moment(e.updated).format(dateFmt)})</span>
      </>}
    </Card.Subtitle>
  }

  function renderTeaser() {
    const link = `/${podcastKey}/${e.id}`

    return <Card className={`mb-3 card-post`}>
      <Card.Body>
        <Card.Title>
          <Link to={link} className={e.archived ? 'text-muted text-decoration-line-through' : ''}>{title}</Link>
        </Card.Title>
        {renderDate()}
        {player(e)}
        {import.meta.env.DEV && <div>
          {e.episode && <Badge className='me-2'>Original {e.episode}</Badge>}
          {e.mergeEpisode && <Badge className='me-2'>Merge {e.mergeEpisode}</Badge>}
          <Badge className='me-2'>i {i+1}</Badge>
        </div>}
        {e.archived ? <>
          <div className='text-muted'>This episode is archived. As I'm re-doing the podcast, some episodes are outdated or superfluous. <Link to={`/mlg/${e.episode}`}>You can still access it here</Link>.</div>
        </> : e.body ? <>
          <div className='fade-post'>
            <Markdown_ Content={e.teaser} teaser/>
            {e.teaser && <hr />}
            <Markdown_ Content={e.body} teaser />
            <div className='fade-post-bottom' />
          </div>
          <Link to={link}>Read More</Link>
        </> : <>
          <Markdown_ Content={e.teaser} teaser />
        </>}
      </Card.Body>
    </Card>
  }

  function renderFull() {
    const resources = (
        podcastKey === "llh" ? null
        : episodeResources[e.mla ? 'mla' : 'mlg']?.[e.episode]
    )
    const items = [
      (e.body && {
        title: "Show Notes",
        body: <>
          {podcastKey !== "llh" && <Alert variant="success">
            Support this show by trying a <Link to="/blog/20240109-fitness-desk">walking desk</Link>!
          </Alert>}
          <Markdown_ Content={e.body} />
        </>
      }),
      (resources && {
        title: "Resources",
        body: <>
          <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
          <ResourcesFlat nids={resources} />
        </>
      }),
      (e.transcript && {
        title: "Transcript",
        body: <Markdown_ Content={e.transcript} />
      }),
    ]

    return <div>
      <Helmet>
        <title>{e.title} | Machine Learning Guide</title>
        {e.teaser && <meta name="description" Content={e.teaser} />}
      </Helmet>
      <BackButton to={podcastKey === "llh" ? "/llh" : "/mlg"} />
      <Card>
        <Card.Body>

          <Card.Title>{title}</Card.Title>
          {renderDate()}
          {player(e)}

          <Markdown_ Content={e.teaser} />
          <Accordion_ items={items} />

        </Card.Body>
        {e.guid && <Card.Footer>
          <Comments
            shortname="ocdevel"
            identifier={e.guid}
            title={`${e.title} | ${mlg.title}`}
            url={`https://ocdevel.com/mlg/${e.id}`}/>
        </Card.Footer>}
      </Card>
    </div>
  }
  return teaser ? renderTeaser() : renderFull()
}

export default function EpisodeRoute() {
  const {id} = useParams()
  const podcastKey = usePodcastKey()
  const e = podcastKey === "llh" ? llhEpisodesObj[id] : episodesObj[id]
  return <Episode e={e} teaser={false} />
}