import React, {useState} from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Modal, Card} from 'react-bootstrap';
import {Switch, Link, Route, useParams, Redirect} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusComments from 'react-disqus-comments';
import _ from 'lodash';
import {
  FaGithub,
  FaUnlock,
  FaDollarSign,
  FaLightbulb,
  FaBriefcase,
  FaEnvelope,
  FaArrowLeft,
  FaPatreon
} from 'react-icons/all';
import {Helmet} from "react-helmet";


import podcast from '../../content/machine-learning';
const fmt = 'MMM DD, YYYY';
const patreonLink = 'https://www.patreon.com/machinelearningguide'

function BackButton() {
  return <Button className="back-button mb-2 float-right" href="/mlg" variant="outline-secondary" size="sm">
    <FaArrowLeft /> All Episodes
  </Button>

  // TODO using LinkContainer loses the variant syles
  return <LinkContainer to="/mlg">
    <Button variant="outline-secondary" size="sm">&lt; All Episodes</Button>
  </LinkContainer>
}

function Card_({title, children, subtitle=null, footer=null, backButton=true}) {
  return <Card>
    <Card.Body>
      {backButton && <BackButton />}
      <Card.Title>{title}</Card.Title>
      {subtitle && <Card.Subtitle className="mb-2 text-muted">
        {subtitle}
      </Card.Subtitle>}
      <Card.Text>{children}</Card.Text>
    </Card.Body>
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
}

function Recommend() {
  const footer = <ReactDisqusComments
    shortname="ocdevel"
    identifier="machine-learning-recommend"
    title={`Recommend an Episode | ${podcast.title}`}
    url="http://ocdevel.com/mlg/recommend" />
  return <div>
    <Card_ title="Recommend a Future Episode">
      <p>See which episodes are currently planned <a href="https://github.com/lefnire/ocdevel/projects/1" target="_blank">on Github</a>. If you want an episode not on that list, <a href="https://github.com/lefnire/ocdevel/issues/new" target="_blank">submit an issue</a>. I'll tackle recommendations in order of popularity (based on Github thumb-ups).</p>
      <p>Below is a Disqus thread I <em>used</em> to use for episode-recommends, but I'm not using anymore.</p>
    </Card_>
  </div>
}

function FreeAccess() {
  return <div>
    <Card_ title="Get Free MLA Access">
      <a href={patreonLink} target="_blank">Machine Learning Applied</a> is a $1/m exclusive podcast, but you can get free access in the following ways.
      <ol>
        <li>Get 3 months of free access by posting a link to <a href="https://gnothiai.com">Gnothi</a> on your social media, then <a href="mailto:tylerrenelle@gmail.com">email me</a> the link or screenshot.</li>
        <li>Get free access for <strong>life</strong> by contributing to the project. Submit a pull-request to the Github repository (see <a href="https://github.com/lefnire/ocdevel/issues">active issues</a>) and let me know in the PR or via email that you want MLA access.</li>
      </ol>
    </Card_>
  </div>
}

function Episode({children}) {
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
  const footer = <ReactDisqusComments
      shortname="ocdevel"
      identifier={episode.guid}
      title={`${episode.title} | ${podcast.title}`}
      url={`http://ocdevel.com/mlg/${id}`}/>
  return <div>
    <Helmet>
      <title>{episode.title} | Machine Learning Guide</title>
      <meta name="description" content={episode.teaser} />
    </Helmet>
    <Card_ title={episode.title} subtitle={moment(episode.date).format(fmt)} footer={footer}>
      {body? (
        <ReactMarkdown source={body} linkTarget="_blank" />
      ): (
        <p>{episode.teaser}</p>
      )}
      {renderPlayer(podcast, episode)}
    </Card_>
  </div>
}

function Episodes() {
  const episodes = _.sortBy(podcast.episodes, e => -moment(e.date));

  function renderEpisode(e) {
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
    return <div key={e.guid} className='mb-3 episode-teaser'>
      <Card_ backButton={false} title={title} subtitle={moment(e.date).format(fmt)} footer={footer}>
        <p>{e.teaser}</p>
      </Card_>
    </div>
  }

  return <div>
    {episodes.map(renderEpisode)}
  </div>
}

function Series() {
  const [showHire, setShowHire] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const enableHire = false
  const enablePodcastProj = false
  // d75998bd cryptocurrency

  function miscResources() {
    const buttonAttrs = {
      variant: 'outline-dark',
      className: "d-block mb-1 w-100"
    }
    return (
      <div>
        <div>
          {showDonate ? (
            <Card className='mb-1'>
              <Card.Header><Card.Title>Donate</Card.Title></Card.Header>
              <Card.Body>
                <Button bsStyle="primary" block href={patreonLink} target="_blank">Patreon</Button>
                <small>The best way to show your support, as you'll receive perks (like access to an exclusive podcast series on applied ML).</small>
                <hr/>

                Paypal:
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="9A9KRVTQFFLFC" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Button {...buttonAttrs} onClick={() => setShowDonate(true)}>
              <FaDollarSign /> Donate
            </Button>
          )}
          {enableHire && <Button {...buttonAttrs} onClick={() => setShowHire(true)}>
            <FaBriefcase /> Hire Me
          </Button>}
          <LinkContainer to="/mlg/recommend">
            <Button {...buttonAttrs}>
              <FaLightbulb /> Recommend an Episode
            </Button>
          </LinkContainer>
          <OverlayTrigger
            placement="right"
            overlay={(
              <Popover id="popover-positioned-right">
                Get notified of new episodes / announcements
              </Popover>
            )}
          >
            <Button {...buttonAttrs} href="http://eepurl.com/cUUWfD" target="_blank">
              <FaEnvelope /> Mailing List
            </Button>
          </OverlayTrigger>
          {enablePodcastProj && <Button {...buttonAttrs} href="https://github.com/lefnire/gnothi" target='_blank'>
            <FaGithub /> Podcast Project
          </Button>}
        </div>
      </div>
    );
  }

  const renderHireModal = () => (
    <Modal show={showHire} onHide={() => setShowHire(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Hire Me</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="/files/profile_pic.jpeg" style={{float:'left', paddingRight:10, paddingBottom: 5, width: 150}} />
        <h4>Tyler Renelle</h4>
        <p>Machine learning engineer focused on time series & reinforcement (esp. NLP & algo-trading). Background in full-stack JavaScript, 10 years web & mobile. Tech: Python, TensorFlow, React / React Native.</p>
        <p>Creator of HabitRPG, a startup begun on Kickstarter which now has ~2M users. Built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients such as Adidas, BigFix, and UCSF. Obsessed with AI - bonafide Singularitarian and herald for the takeover.</p>
        <p>Looking for remote work, or local to Portland, OR.</p>
        <ul className="list-unstyled">
          <li><a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin d-block">LinkedIn</a></li>
          <li><a target="_blank" href="https://github.com/lefnire" className="zocial github d-block">Github</a></li>
          <li><a href="mailto:tylerrenelle@gmail.com" className="zocial email d-block">Email</a></li>
        </ul>
      </Modal.Body>
    </Modal>
  );

  function sidebar() {
    return <>
      <Card>
        <Card.Body>
          <div className="logo text-center mb-3">
            <img src={podcast.image} />
          </div>
          <div>
            <p><b>Machine Learning Guide</b> {podcast.body}</p>
            <div>
              <a className="zocial itunes d-block mb-1" href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130" target="_blank">iTunes</a>
              <a className="zocial android d-block mb-1" href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw==' target="_blank">Google Podcasts</a>
              <a className="zocial spotify d-block mb-1" href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9" target="_blank">Spotify</a>
              <a className="zocial podcast d-block mb-1" href="http://www.stitcher.com/s?fid=130679&refid=stpr" target="_blank">Stitcher</a>
              <a className="zocial rss d-block mb-1" href="http://machinelearningguide.libsyn.com/rss" target="_blank" rel="nofollow">Custom (RSS)</a>
            </div>
          </div>
          <hr />
          <div>
            <p><b>Machine Learning Applied</b> is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes.</p>
            <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
            <LinkContainer to='/mlg/free-access'>
              <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
            </LinkContainer>
          </div>
          <hr />
          {miscResources()}
        </Card.Body>
      </Card>
    </>
  }

  return <div className="podcasts">
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={podcast.teaser} />
    </Helmet>
    {renderHireModal()}
    <Row>
      <Col xs={12} md={4} className='sidebar'>
        {sidebar()}
      </Col>
      <Col xs={12} md={8}>
        <Switch>
          <Route path="/mlg" exact><Episodes /></Route>
          <Route path="/mlg/recommend" exact><Recommend /></Route>
          <Route path="/mlg/free-access" exact><FreeAccess /></Route>
          <Route path="/mlg/:id"><Episode /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}

export default {Series, Episodes, Episode, Recommend};