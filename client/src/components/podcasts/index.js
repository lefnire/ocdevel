import React, {useState} from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Modal, Card, Badge, ButtonGroup, Alert} from 'react-bootstrap';
import {Switch, Link, Route, useParams, Redirect} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusComments from 'react-disqus-comments';
import _ from 'lodash';
import {
  FaUnlock,
  BsArrowUpDown, FaExternalLinkAlt, FaLink, FaTags, FaChevronDown, FaChevronUp, FaInfoCircle
} from 'react-icons/all';
import {Helmet} from "react-helmet";

import Sidebar from './Sidebar'
import {BackButton, patreonLink, Popover_} from './utils'
import FreeAccess from './FreeAccess'
import Recommend from './Recommend'
import podcast from '../../content/podcast';
import {filters, resources, filterKeys} from '../../content/podcast/resources'
const fmt = 'MMM DD, YYYY';


function EpisodeFull() {
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
    <Card>
      <Card.Body>
        <BackButton />
        <Card.Title>{episode.title}</Card.Title>
        <Card.Subtitle className='text-muted mb-2'>
          {moment(episode.created).format(fmt)}
          {episode.updated && <>
            <span> (updated {moment(episode.updated).format(fmt)})</span>
          </>}
        </Card.Subtitle>
        <Card.Text>
          {body? (
            <ReactMarkdown source={body} linkTarget="_blank" />
          ): (
            <p>{episode.teaser}</p>
          )}
          {renderPlayer(podcast, episode)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={episode.guid}
          title={`${episode.title} | ${podcast.title}`}
          url={`https://ocdevel.com/mlg/${id}`}/>
      </Card.Footer>
    </Card>
  </div>
}

function Resource({resource}) {
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()

  function toggle() {setShow(!show)}
  function resetHelp() {setShowHelp(null)}
  const helpAttrs = (helpMsg, className=null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  function renderIcon(filterKey) {
    if (!resource || !resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter || !resourceFilter.i) {return null}
    return <span className='mr-2 text-muted'>{resourceFilter.i}</span>
  }

  function renderFilter(filterKey) {
    if (!resource || !resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter) {return null}
    return <>
      <dt {...helpAttrs(filter.d, 'pointer col-sm-3')}>
        {filter.t}
      </dt>
      <dd {...helpAttrs(resourceFilter.d, 'pointer col-sm-9')}>
        {renderIcon(filterKey)}
        {resourceFilter.t || resourceFilter}
      </dd>
    </>
    // <Popover_ /> showing at random pages on page
  }

  function renderLinks() {
    return <>
      <dt {...helpAttrs("Where to get this resource", 'pointer col-sm-3')}>
        Links
      </dt>
      <dd className='col-sm-9'>
        {resource.links.map(l => (
          <a
            {...helpAttrs(filters.price.opts[l.p].d, 'mr-2')}
            href={l.l}
            target="_blank"
          >
            {l.t} ({l.p})
          </a>
        ))}
      </dd>
    </>
  }

  return <li>
    <div onClick={toggle} className='pointer'>
      {show ? <FaChevronUp /> :<FaChevronDown />}
      <span className='mx-2'>{resource.t}</span>
      {filterKeys.map(renderIcon)}
    </div>
    {show && <>
      <div className='small ml-3'>
        <dl className='row'>
          {renderLinks()}
          {filterKeys.map(renderFilter)}
        </dl>
        {showHelp ?
          <Alert variant='info'>{showHelp}</Alert> :
          <Alert variant='info'><FaInfoCircle /> Hover over a key/value for information</Alert>
        }
      </div>
    </>}
  </li>
}

function EpisodeTeaser({e}) {
  let num = _.padStart(e.episode, 3, '0');
  let title = `${e.mla ? 'MLA' : 'MLG'} ${num}: ${e.title}`;
  let footer = null;
  if (e.mla) {
    footer = <>
      <FaUnlock />  $1/m on <a href={patreonLink} target="_blank">Patreon</a> or <Link to="/mlg/free-access">get free access</Link>
    </>
  } else {
    title = <Link to={`/mlg/${e.episode}`}>{title}</Link>
  }
  return <div key={e.guid} className='episode-teaser mb-3'>
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className='text-muted mb-2'>
          {moment(e.created).format(fmt)}
          {e.updated && <>
            <span> (updated {moment(e.updated).format(fmt)})</span>
          </>}
        </Card.Subtitle>
        <p>{e.teaser}</p>
      </Card.Body>
      {e.resources && <Card.Footer className='resources'>
        <Card.Title>Resources</Card.Title>
        <ul className='list-unstyled'>
          {e.resources.map(r => <Resource resource={r} key={r.id} />)}
        </ul>
      </Card.Footer>}
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  </div>
}

function Episodes() {
  const [reverse, setReverse] = useState()
  const episodes = reverse? _.reverse(podcast.episodes) : podcast.episodes

  return <div>
    <Button
      variant='outline-secondary'
      onClick={() => setReverse(!reverse)}
      className='mb-2 ml-auto'
    >
      <BsArrowUpDown /> Reverse
    </Button>
    {episodes.map(e => <EpisodeTeaser key={e.guid} e={e} />)}
  </div>
}

export default function Series() {
  return <div className="podcasts">
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={podcast.teaser} />
    </Helmet>

    <Row>
      <Col xs={12} md={4} className='sidebar'>
        <Sidebar />
      </Col>
      <Col xs={12} md={8}>
        <Switch>
          <Route path="/mlg" exact><Episodes /></Route>
          <Route path="/mlg/recommend" exact><Recommend /></Route>
          <Route path="/mlg/free-access" exact><FreeAccess /></Route>
          <Route path="/mlg/:id"><EpisodeFull /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}