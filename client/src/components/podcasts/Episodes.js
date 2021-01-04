import React from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import _ from "lodash";
import {mlg, mla, episodes, episodesObj} from "../../content/podcast";
import {Helmet} from "react-helmet";
import {patreonLink, ReactMarkdown_, dateFmt} from "./utils";
import {Card, Media, Alert, Button} from "react-bootstrap";
import moment from "moment";
import {ResourcesFlat} from "./Resources";
import ReactDisqusComments from "react-disqus-comments";
import {FaPatreon, FaUnlock} from "react-icons/all";
import {useStoreState} from "easy-peasy";
import {BackButton} from "../utils";

import scout from "../../assets/mlg_square.jpg";
import librarian from "../../assets/mla_square.jpg";
import {LinkContainer} from "react-router-bootstrap";

const mlaBanner = <div className='d-flex align-items-center'>
  <img src={librarian} width={90} className='mr-2'/>
  <div>
    <div className='d-flex justify-content-center'>
      <Button size="sm" href={patreonLink} target='_blank' className='patreon-btn mb-1'><FaPatreon /> Get it on Patreon</Button>
    </div>
    <div className='d-flex justify-content-center'>
      <LinkContainer to='/mlg/free-access'>
        <Button size="sm" variant="link" className='patreon-btn-free mb-1'>Get it free</Button>
      </LinkContainer>
    </div>
  </div>
</div>

function Player({e}) {
  return e.mla ? mlaBanner :
    <iframe
      style={{border: "none"}}
      src={`//html5-player.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/90/width/640/theme/custom/autonext/no/thumbnail/yes/autoplay/no/preload/no/no_addthis/no/direction/backward/render-playlist/no/custom-color/87A93A/`}
      height="90"
      width="640"
      scrolling="no"
      allowfullscreen
      webkitallowfullscreen
      mozallowfullscreen
      oallowfullscreen
      msallowfullscreen
    />
}

const teaserRenderers = {
  heading: ({children}) => {
    return <><strong>{children}</strong><br/></>
  }
}

export function Episode({e, teaser}) {
  const num = _.padStart(e.episode, 3, '0');
  const title = `${e.mla ? 'MLA' : 'MLG'} ${num}: ${e.title}`;

  let body
  if (teaser) {
    body = e.body && e.teaser ? `${e.teaser}\n\n${e.body}` :
      e.body || e.teaser
  } else {
    // Turn h2s into h3s (h2s make sense standalone, not inlined the website)
    body = e.body ? e.body.replace(/##/g, '###')
      : e.teaser
  }
  const link = `/mlg/${e.id}`

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
    return <Card className={`episode-teaser mb-3 card-post ${e.archived ? 'episode-archived' : ''}`}>
      <Card.Body>
        <Card.Title>
          <Link to={link}>{title}</Link>
        </Card.Title>
        {renderDate()}
        <Player e={e} />
        {e.archived ? <>
          <div>This episode is archived. As I'm re-doing the podcast, some episodes are outdated or superfluous. <Link to={`/mlg/${e.episode}`}>You can still access it here</Link>.</div>
        </> : e.body ? <>
          <div className='fade-post'>
            <ReactMarkdown_ source={body} renderers={teaserRenderers} />
            <div className='fade-post-bottom' />
          </div>
          <Link to={link}>Read More</Link>
        </> : <ReactMarkdown_ source={body} />}
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
          <Player e={e} />
          <hr />
          <ReactMarkdown_ source={body} />
          {e.resources && <>
            <hr/>
            <Card.Title>Resources</Card.Title>
            <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
            <ResourcesFlat resources={e.resources} />
          </>}
        </Card.Body>
        <Card.Footer>
          <ReactDisqusComments
            shortname="ocdevel"
            identifier={e.guid}
            title={`${e.title} | ${mlg.title}`}
            url={`https://ocdevel.com/mlg/${e.id}`}/>
        </Card.Footer>
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

export function Episodes() {
  const mla = true // useStoreState(state => state.mla)
  const mlg = true // useStoreState(state => state.mlg)

  const episodeOrder = 'new2old' // useStoreState(state => state.episodeOrder);
  let episodes_ = episodeOrder === 'new2old' ? episodes.slice().reverse() : episodes

  episodes_ = _.filter(episodes_, e => {
    if (mla && mlg) {return true}
    return mla ? e.mla : mlg ? e.mlg : false
  })

  // TODO filter episodes
  return <div>
    <div className="mb-3 mlg-update pl-3">
      <Card.Title className='mb-1'>2020-12-19 Update</Card.Title>
      <p>I'm re-doing MLG (2nd edition) to refresh resources & concepts to 2021. Starting now use <Link to="/mlg/resources">Resources</Link>, and ignore the resources discussed in the episodes. Then I can to keep resources updated without editing episodes. I'm removing checkpoints and irrelevant episodes to make room for new ones - so if you see see "holes" that's normal. I'll keep the Bitcoin Trading episode, as it's info-packed, but the podcast project is now <a href='https://gnothiai.com' target='_blank'>Gnothi</a>.</p>
    </div>

    {episodes_.map(e => <Episode key={e.guid} e={e} teaser={true} />)}
  </div>
}