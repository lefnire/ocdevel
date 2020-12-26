import React from "react";
import {Link, useParams} from "react-router-dom";
import _ from "lodash";
import podcast from "../../content/podcast";
import {Helmet} from "react-helmet";
import {BackButton, patreonLink, ReactMarkdown_, dateFmt} from "./utils";
import {Card, Media} from "react-bootstrap";
import moment from "moment";
import {ResourcesFlat} from "./Resources";
import ReactDisqusComments from "react-disqus-comments";
import {FaUnlock} from "react-icons/all";
import {useStoreState} from "easy-peasy";
import Banner from './Banner'

export function EpisodeFull() {
  const {id} = useParams()

  function renderPlayer(podcast, episode) {
    if (podcast.useLibsynPlayer) {
      const embedCode = `<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/${episode.libsynEpisode}/height/90/width/640/theme/custom/autonext/no/thumbnail/yes/autoplay/no/preload/no/no_addthis/no/direction/backward/render-playlist/no/custom-color/87A93A/" height="90" width="640" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`;
      return <div dangerouslySetInnerHTML={{__html: embedCode}} />;
      // Tried massaging the embed-code to React-compliant props, but still getting `Unknown prop __` - so using dangerouslySetInnerHTML instead
      // return <iframe src={`//html5-player.libsyn.com/embed/episode/id/${e.libsynEpisode}/height/90/width/640/theme/custom/autonext/no/thumbnail/no/autoplay/no/preload/no/no_addthis/no/direction/backward/render-playlist/no/custom-color/87A93A/`} style={{border: "none"}} height="90" width="640" scrolling="no" allowFullScreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
    }
    return (
      <audio controls style={{width:'100%'}}>
        <source src={episode.file.url} type={episode.file.type}/>
        Your browser does not support the audio element.
      </audio>
    );
  };

  const episode = _.find(podcast.episodes, {episode: parseInt(id)});
  // Turn h2s into h3s (h2s make sense standalone, not inlined the website)
  const body = episode.body && episode.body.replace(/##/g, '###');
  return <div>
    <Helmet>
      <title>{episode.title} | Machine Learning Guide</title>
      <meta name="description" content={episode.teaser} />
    </Helmet>
    <BackButton />
    <Card>
      <Card.Header>
        <Card.Title>{episode.title}</Card.Title>
        <Card.Subtitle className='text-muted mb-2'>
          {moment(episode.created).format(dateFmt)}
          {episode.updated && <>
            <span> (updated {moment(episode.updated).format(dateFmt)})</span>
          </>}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {renderPlayer(podcast, episode)}
        {episode.resources && <>
          <Card.Title>Resources</Card.Title>
          <ResourcesFlat resources={episode.resources} />
        </>}
      </Card.Body>
      <Card.Footer>
        {body? (
          <ReactMarkdown_ source={body} />
        ): (
          <p>{episode.teaser}</p>
        )}
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={episode.guid}
          title={`${episode.title} | ${podcast.title}`}
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
      <div className='fade-post'>
        <ReactMarkdown_ source={body} />
        <div className='fade-post-bottom' />
      </div>
      {!e.mla && <Link to={`/mlg/${e.episode}`}>Read More</Link>}
    </Card.Body>
    {e.resources && <>
      <Card.Footer>
        <Card.Title>Resources</Card.Title>
        <ResourcesFlat resources={e.resources} />
      </Card.Footer>
    </>}
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
}

export function Episodes() {
  const mla = true // useStoreState(state => state.mla)
  const mlg = true // useStoreState(state => state.mlg)

  const episodeOrder = 'new2old' // useStoreState(state => state.episodeOrder);
  let episodes = episodeOrder === 'new2old' ? podcast.episodes.slice().reverse() : podcast.episodes

  episodes = _.filter(episodes, e => {
    if (mla && mlg) {return true}
    return mla ? e.mla : mlg ? e.mlg : false
  })

  // TODO filter episodes
  return <div>
    <Banner />
    {episodes.map(e => <EpisodeTeaser key={e.guid} e={e} />)}
  </div>
}