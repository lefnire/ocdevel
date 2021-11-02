import React, {useState, useEffect} from "react";
import {Accordion, Alert, Button, Card} from "react-bootstrap";
import {Accordion_, dateFmt, ReactMarkdown_} from "../utils";
import {LinkContainer} from "react-router-bootstrap";
import _ from "lodash";
import moment from "moment";
import {Link, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {BackButton} from "../../utils";
import {ResourcesFlat} from "./Resources";
import ReactDisqusComments from "react-disqus-comments";
import {episodesObj, mlg} from "../../../content/podcast";
import {BiChevronDown, BiChevronRight} from "react-icons/all";
import {episodes as episodeResources} from '../../../content/podcast/resources'


// 8d7997de switched from component to returning memoized JSX, since iframe being
// re-rendered slowly each time. This trick doesn't seem to work either, figure out later
const players = {}
function player(e) {
  // if (e.mla) {return <div>TODO move to MLG</div>}
  const id = e.libsynEpisode
  if (players[id]) {return players[id]}
  players[id] = <iframe
    title="Embed Player"
    src={`//play.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/128/theme/modern/size/standard/thumbnail/yes/custom-color/111111/time-start/00:00:00/download/no/hide-show/no/direction/backward/hide-playlist/no/hide-subscribe/no/hide-share/no`}
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

export function Episode({e, teaser}) {
  const num = _.padStart(e.episode, 3, '0');
  const title = `${e.mla ? 'MLA' : 'MLG'} ${num} ${e.title}`;

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
    const link = `/mlg/${e.id}`

    return <Card className={`episode-teaser mb-3 card-post ${e.archived ? 'episode-archived' : ''}`}>
      <Card.Body>
        <Card.Title>
          <Link to={link}>{title}</Link>
        </Card.Title>
        {renderDate()}
        {player(e)}
        {e.archived ? <>
          <div>This episode is archived. As I'm re-doing the podcast, some episodes are outdated or superfluous. <Link to={`/mlg/${e.episode}`}>You can still access it here</Link>.</div>
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
    const resources = episodeResources[e.mla ? 'mla' : 'mlg']?.[e.episode]
    const items = [
      (e.body && {
        title: "Show Notes",
        body: <Markdown_ Content={e.body} />
      }),
      (e.transcript && {
        title: "Transcript",
        body: <Markdown_ Content={e.transcript} />
      }),
      (resources && {
        title: "Resources",
        body: <>
          <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
          <ResourcesFlat nids={resources} />
        </>
      })
    ]

    return <div>
      <Helmet>
        <title>{e.title} | Machine Learning Guide</title>
        {e.teaser && <meta name="description" Content={e.teaser} />}
      </Helmet>
      <BackButton />
      <Card>
        <Card.Body>

          <Card.Title>{title}</Card.Title>
          {renderDate()}
          {player(e)}

          <Markdown_ Content={e.teaser} />
          <Accordion_ items={items} />

        </Card.Body>
        {e.guid && <Card.Footer>
          <ReactDisqusComments
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

export function EpisodeRoute() {
  const {id} = useParams()
  const e = episodesObj[id];
  return <Episode e={e} teaser={false} />
}