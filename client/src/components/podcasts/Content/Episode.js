import React, {useState, useEffect} from "react";
import {Alert, Button, Card} from "react-bootstrap";
import {dateFmt, ReactMarkdown_} from "../utils";
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


// 8d7997de switched from component to returning memoized JSX, since iframe being
// re-rendered slowly each time. This trick doesn't seem to work either, figure out later
const players = {}
function player(e) {
  // if (e.mla) {return <div>TODO move to MLG</div>}
  const id = e.libsynEpisode
  if (players[id]) {return players[id]}
  players[id] = <iframe
    style={{border: "none"}}
    src={`//html5-player.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/90/width/640/theme/custom/autonext/no/thumbnail/yes/autoplay/no/preload/no/no_addthis/no/direction/backward/render-playlist/no/custom-color/87A93A/`}
    height="90"
    width="640"
    scrolling="no"
    allowFullScreen
    webkitallowfullscreen
    mozallowfullscreen
    oallowfullscreen
    msallowfullscreen
  />
  return players[id]
}

const teaserRenderers = {
  heading: ({children}) => {
    return <><strong>{children}</strong><br/></>
  }
}

function ShowHide({title, children, show=false}) {
  const [show_, setShow] = useState(show);

  // display:none for SEO (don't exclude from html)
  const style = show_ ? {} : {display: 'none'};
  return <div>
    <Card.Title
      className='pointer'
      onClick={() => setShow(!show_)}
    >
      {show_ ? <BiChevronDown /> : <BiChevronRight />}
      <span className='mr-2'>{title}</span>
    </Card.Title>
    <div style={style}>
      {children}
    </div>
  </div>
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
    const combined = e.body && e.teaser ? `${e.teaser}\n\n---\n\n${e.body}` :
      e.body || e.teaser
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
            <ReactMarkdown_ source={combined} renderers={teaserRenderers} />
            <div className='fade-post-bottom' />
          </div>
          <Link to={link}>Read More</Link>
        </> : <ReactMarkdown_ source={combined} />}
      </Card.Body>
    </Card>
  }

  function renderFull() {
    return <div>
      <Helmet>
        <title>{e.title} | Machine Learning Guide</title>
        {e.teaser && <meta name="description" content={e.teaser} />}
      </Helmet>
      <BackButton />
      <Card>
        <Card.Body>

          <Card.Title>{title}</Card.Title>
          {renderDate()}
          {player(e)}

          {e.teaser && <>
            <ReactMarkdown_ source={e.teaser} />
          </>}

          {e.teaser && e.body && <hr />}

          {e.body && <ShowHide title="Show Notes" show={true}>
            <ReactMarkdown_ source={e.body} />
          </ShowHide>}

          {e.transcript?.length && <>
            <hr />
            <ShowHide title="Transcript">
              <ReactMarkdown_ source={e.transcript} />
            </ShowHide>
          </>}

          {e.resources && <>
            <hr />
            <ShowHide title="Resources">
              <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
              <ResourcesFlat resources={e.resources} />
            </ShowHide>
          </>}

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