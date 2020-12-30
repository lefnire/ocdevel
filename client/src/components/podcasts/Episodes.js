import React from "react";
import {Link, useParams} from "react-router-dom";
import _ from "lodash";
import {mlg, mla, episodes} from "../../content/podcast";
import {Helmet} from "react-helmet";
import {patreonLink, ReactMarkdown_, dateFmt} from "./utils";
import {Card, Media, Alert} from "react-bootstrap";
import moment from "moment";
import {ResourcesFlat} from "./Resources";
import ReactDisqusComments from "react-disqus-comments";
import {FaUnlock} from "react-icons/all";
import {useStoreState} from "easy-peasy";
import {BackButton} from "../utils";

function Player({episode}) {
  // html5 custom player
  const embedCode = `<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/${episode.libsynEpisode}/height/90/width/640/theme/custom/autonext/no/thumbnail/yes/autoplay/no/preload/no/no_addthis/no/direction/backward/render-playlist/no/custom-color/87A93A/" height="90" width="640" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`;
  return <div dangerouslySetInnerHTML={{__html: embedCode}} />;
}

export function EpisodeFull() {
  const {id} = useParams()

  const episode = _.find(episodes, {episode: parseInt(id)});
  // Turn h2s into h3s (h2s make sense standalone, not inlined the website)
  const body = episode.body && episode.body.replace(/##/g, '###');
  return <div>
    <Helmet>
      <title>{episode.title} | Machine Learning Guide</title>
      <meta name="description" content={episode.teaser} />
    </Helmet>
    <BackButton />
    <Card>
      <Card.Body>
        <Card.Title>{episode.title}</Card.Title>
        <Card.Subtitle className='text-muted mb-0'>
          {moment(episode.created).format(dateFmt)}
          {episode.updated && <>
            <span> (updated {moment(episode.updated).format(dateFmt)})</span>
          </>}
        </Card.Subtitle>
        {!episode.mla && <Player podcast={mlg} episode={episode} />}
        <hr />
        {body? (
          <ReactMarkdown_ source={body} />
        ): (
          <p>{episode.teaser}</p>
        )}
        {episode.resources && <>
          <hr/>
          <Card.Title>Resources</Card.Title>
          <Alert variant='warning' className='p-2 my-1'>Note! Resources best viewed <Link to='/mlg/resources'>here</Link>, keeping this list for posterity</Alert>
          <ResourcesFlat resources={episode.resources} />
        </>}
      </Card.Body>
      <Card.Footer>
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={episode.guid}
          title={`${episode.title} | ${mlg.title}`}
          url={`https://ocdevel.com/mlg/${id}`}/>
      </Card.Footer>
    </Card>
  </div>
}

function EpisodeTeaser({e}) {
  let num = _.padStart(e.episode, 3, '0');
  let title = `${e.mla ? 'MLA' : 'MLG'} ${num}: ${e.title}`;
  let footer = null;
  if (e.mla) {
    footer = <>
      <FaUnlock />  $5/m on <a href={patreonLink} target="_blank">Patreon</a> or <Link to="/mlg/free-access">get free access</Link>
    </>
  } else {
    title = <Link to={`/mlg/${e.episode}`}>{title}</Link>
  }
  const body = e.body && e.teaser ? `${e.teaser}\n\n${e.body}` :
    e.body || e.teaser
  return <Card key={e.guid} className='episode-teaser mb-3 card-post'>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className='text-muted mb-2'>
        {moment(e.created).format(dateFmt)}
        {e.updated && <>
          <span> (updated {moment(e.updated).format(dateFmt)})</span>
        </>}
      </Card.Subtitle>
      {!e.mla && <Player episode={e} />}
      <div className='fade-post'>
        <ReactMarkdown_ source={body} />
        <div className='fade-post-bottom' />
      </div>
      {!e.mla && <Link to={`/mlg/${e.episode}`}>Read More</Link>}
    </Card.Body>
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
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

    {episodes_.map(e => <EpisodeTeaser key={e.guid} e={e} />)}
  </div>
}