import React, {useState} from 'react';
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Card,
  Badge,
  ButtonGroup,
  Alert,
  Table, Form
} from 'react-bootstrap';
import {Switch, Link, Route, useParams, Redirect} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusComments from 'react-disqus-comments';
import _ from 'lodash';
import {
  FaUnlock,
  BsArrowUpDown,
  FaExternalLinkAlt,
  FaLink,
  FaTags,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle, FaAngleRight
} from 'react-icons/all';
import {Helmet} from "react-helmet";

import Sidebar from './Sidebar'
import {BackButton, patreonLink, Popover_} from './utils'
import FreeAccess from './FreeAccess'
import Recommend from './Recommend'
import podcast from '../../content/podcast';
import {filters, resources, filterKeys, eitherOr} from '../../content/podcast/resources'

import {useStoreState, useStoreActions, useStore} from "easy-peasy";

const fmt = 'MMM DD, YYYY';

function ReactMarkdown_({source}) {
  // TODO turn h2s into h3s
  return <ReactMarkdown
    source={source}
    linkTarget="_blank"
  />
}

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
      <Card.Header>
        <BackButton />
        <Card.Title>{episode.title}</Card.Title>
        <Card.Subtitle className='text-muted mb-2'>
          {moment(episode.created).format(fmt)}
          {episode.updated && <>
            <span> (updated {moment(episode.updated).format(fmt)})</span>
          </>}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {renderPlayer(podcast, episode)}
        <Card.Title>Resources</Card.Title>
        <Resources resources={episode.resources} />
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

function Resource({resource}) {
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()

  if (!resource) {return null} // FIXME

  function toggle() {setShow(!show)}
  function resetHelp() {setShowHelp(null)}
  const helpAttrs = (helpMsg, className=null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  function renderIcon(filterKey) {
    // if (!resource[filterKey]) {return null} // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter || !resourceFilter.i) {return null}
    return <span key={filterKey} className='mr-2 text-muted'>{resourceFilter.i}</span>
  }

  function renderFilter(filterKey) {
    // if (!resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter) {return null}
    return <tr key={filterKey}>
      <td {...helpAttrs(filter.d, 'pointer')}>
        {filter.t}
      </td>
      <td {...helpAttrs(resourceFilter.d, 'pointer')}>
        {renderIcon(filterKey)}
        {resourceFilter.t || resourceFilter}

        {/*TODO put this in resources.js somewhere */}
        {filterKey === 'video2audio' && resourceFilter && <>
          <span className='ml-2'>
            <Link to='/blog/20201213-video2audio'>How to do this?</Link>
          </span>
        </>}

      </td>
    </tr>
    // <Popover_ /> showing at random pages on page
  }

  function renderLinks() {
    return <tr>
      <td {...helpAttrs("Where to get this resource", 'pointer')}>
        Links
      </td>
      <td>
        {resource.links.map(l => (
          <a
            {...helpAttrs(filters.price.opts[l.p].d)}
            className='d-block'
            href={l.l}
            key={l.l}
            target="_blank"
          >
            {l.t} ({l.p})
          </a>
        ))}
        {resource.tgc && <Link to='/blog/20201213-tgc' className='d-block'>Get it cheaper</Link>}
      </td>
    </tr>
  }

  const fontWeight = {
    essential: 600,
    supplementary: 400
  }[resource.importance] || 500
  return <li>
    <div onClick={toggle} className='pointer'>
      {show ? <FaChevronUp /> :<FaChevronDown />}
      <span className="mx-2" style={{fontWeight}}>
        {resource.t}
      </span>
      {filterKeys.map(renderIcon)}
    </div>
    {show && <>
      {resource.d && <div className='small text-muted my-2'>
        <ReactMarkdown_ source={resource.d} />
      </div>}
      <div className='mb-2 small'>
        <Table striped size='sm mb-0 filters-table'>
          <colgroup>
            <col className='ft-col1' />
            <col className='ft-col2' />
	        </colgroup>
          <tbody>
            {renderLinks()}
            {filterKeys.map(renderFilter)}
          </tbody>
        </Table>
        {showHelp ?
          <Alert variant='info mt-0'>{showHelp}</Alert> :
          <Alert variant='info mt-0'><FaInfoCircle /> Hover over a key/value for information</Alert>
        }
      </div>
    </>}
  </li>
}

function Resources({resources}) {
  const filtered = useStoreState(state => state.filteredResources)
  if (!resources) {return null}

  const either = {}
  resources = _.reduce(resources, (m, r) => {
    if (!filtered[r.id]) {return m}
    if (r.eitherOr) {
      if (either[r.eitherOr]) { return m}
      either[r.eitherOr] = true
      r = _.filter(eitherOr[r.eitherOr], r_ => {
        // are the other eitherOrs listed here too?
        // are they filtered out?
        return ~resources.indexOf(r_) && filtered[r_.id]
      })
      if (r.length === 0) { return m }
      if (r.length === 1) { r = r[0] }
    }
    m.push(r)
    return m
  }, [])

  function renderResource(r){
    if (!_.isArray(r)) {
      return <Resource resource={r} key={r.id}/>
    }
    return <Alert className='pick-one-resource' key={r.id}>
      <h6>Pick One</h6>
      {r.map(r_ => <Resource resource={r_} key={r_.id}/>)}
    </Alert>
  }

  return <ul className='list-unstyled'>
    {resources.map(renderResource)}
  </ul>
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
  const body = e.body && e.teaser ? `${e.teaser}\n\n${e.body}` :
    e.body || e.teaser
  return <Card key={e.guid} className='episode-teaser mb-3 card-post'>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className='text-muted mb-2'>
        {moment(e.created).format(fmt)}
        {e.updated && <>
          <span> (updated {moment(e.updated).format(fmt)})</span>
        </>}
      </Card.Subtitle>
      <div className='fade-post'>
        <ReactMarkdown_ source={body} />
        <div className='fade-post-bottom' />
      </div>
      {!e.mla && <Link to={`/mlg/${e.episode}`}>Read More</Link>}
    </Card.Body>
    <Card.Footer className='resources'>
      <Card.Title>Resources</Card.Title>
      <Resources resources={e.resources} />
    </Card.Footer>
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
}

function Episodes() {
  const mla = useStoreState(state => state.mla)
  const mlg = useStoreState(state => state.mlg)

  const episodeOrder = useStoreState(state => state.episodeOrder);
  let episodes = episodeOrder === 'new2old' ? podcast.episodes.slice().reverse() : podcast.episodes

  episodes = _.filter(episodes, e => {
    if (mla && mlg) {return true}
    return mla ? e.mla : mlg ? e.mlg : false
  })

  // TODO filter episodes
  return <div>
    {episodes.map(e => <EpisodeTeaser key={e.guid} e={e} />)}
  </div>
}

function ResourcesTab() {
  const filtered = useStoreState(state => state.filteredResources)
  const r = _.values(filtered)
  return <Card>
    <Card.Body>
      <Resources resources={r} />
    </Card.Body>
  </Card>
}

function MainTab() {
  const viewAs = useStoreState(state => state.viewAs)
  return {
    episodes: <Episodes />,
    resources: <ResourcesTab />
  }[viewAs]
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
          <Route path="/mlg" exact><MainTab /></Route>
          <Route path="/mlg/recommend" exact><Recommend /></Route>
          <Route path="/mlg/free-access" exact><FreeAccess /></Route>
          <Route path="/mlg/:id"><EpisodeFull /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}