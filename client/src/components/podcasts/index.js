import React, {useState} from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Modal, Card, Badge, ButtonGroup} from 'react-bootstrap';
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
  FaPatreon,
  FaShareAlt,
  FaExternalLinkAlt,
  FaRegEnvelope,
  FaItunes,
  SiItunes,
  SiSpotify,
  FaSpotify,
  RiSpotifyLine,
  RiGooglePlayLine, SiStitcher, FaItunesNote, SiRss
} from 'react-icons/all';
import {Helmet} from "react-helmet";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";


import podcast from '../../content/machine-learning.js';
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

function Recommend() {
  return <Card>
    <Card.Body>
      <BackButton />
      <Card.Title>Recommend a Future Episode</Card.Title>
      <Card.Text>
        <p>See which episodes are currently planned <a href="https://github.com/lefnire/ocdevel/projects/1" target="_blank">on Github</a>. If you want an episode not on that list, <a href="https://github.com/lefnire/ocdevel/issues/new" target="_blank">submit an issue</a>. I'll tackle recommendations in order of popularity (based on Github thumb-ups).</p>
        <p>Below is a Disqus thread I <em>used</em> to use for episode-recommends, but I'm not using anymore.</p>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <ReactDisqusComments
        shortname="ocdevel"
        identifier="machine-learning-recommend"
        title={`Recommend an Episode | ${podcast.title}`}
        url="http://ocdevel.com/mlg/recommend" />
    </Card.Footer>
  </Card>
}

function FreeAccess() {
  const url = {url: "https://gnothiai.com"}
  const shareText = "Gnothi - a journal that uses AI to provide insights & resources"
  const shareImg = "https://gnothiai.com/logo192.png"
  function shareButtons() {
    return <>
      <FacebookShareButton
        {...url}
        quote={shareText}
        className='mr-2'
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        {...url}
        title={shareText}
        className='mr-2'
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        {...url}
        className='mr-2'
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <PinterestShareButton
        {...url}
        description={shareText}
        media={shareImg}
        className='mr-2'
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>

      <RedditShareButton
        {...url}
        title={shareText}
        className='mr-2'
      >
        <RedditIcon size={32} round />
      </RedditShareButton>

      <EmailShareButton
        {...url}
        subject={shareText}
        body=""
        className='mr-2'
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </>
  }
  return <div>
    <BackButton />
    <h3 className='h4'>Get Free MLA Access</h3>
    <p>
      <em>Machine Learning Applied</em> is a $1/m exclusive podcast. <Button size='sm' href={patreonLink} target='_blank' className='patreon-btn'><FaPatreon /> Subscribe on Patreon</Button> for access, or get it for free below.
    </p>

    <Card className='mb-3 shadow-sm free-mla-card'>
      <Card.Body>
        <Card.Title>Share | 3 Months Free</Card.Title>
        <Card.Text>
          <p>Get 3 months of free access by posting a link to <a href="https://gnothiai.com">Gnothi <FaExternalLinkAlt /></a> on your social media, then <a href="mailto:tylerrenelle@gmail.com">email me <FaRegEnvelope /></a> the link or screenshot. Helper buttons below, but post wherever you want.</p>
          {shareButtons()}
        </Card.Text>
      </Card.Body>
    </Card>

    <Card className='shadow-sm free-mla-card'>
      <Card.Body>
        <Card.Title>Contribute | Lifetime Free</Card.Title>
        <Card.Text>
          <p>Get free access for life by contributing to Gnothi. Submit a Pull Request on Github (see <a href="https://github.com/lefnire/ocdevel/issues" target='_blank'>active issues</a>) and ping me in the PR or email that you want MLA access.</p>
          <a className='zocial github' href="https://github.com/lefnire/gnothi" target='_blank'>Github</a>
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
}

function Episode() {
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
  // const body = typeof episode.body === "string" ?
  //   episode.body.replace(/##/g, '###') : episode.body
  const body = episode.body
  console.log(typeof body, !body)
  const components = {
    a: ({children, props}) => <a target="_blank" {...props}>{children}</a>
  }
  return <div>
    <Helmet>
      <title>{episode.title} | Machine Learning Guide</title>
      <meta name="description" content={episode.teaser} />
    </Helmet>
    <Card>
      <Card.Body>
        <BackButton />
        <Card.Title>{episode.title}</Card.Title>
        <Card.Subtitle className='text-muted mb-2'>{moment(episode.date).format(fmt)}</Card.Subtitle>
        <Card.Text>
          {typeof body === "string"
            ? <ReactMarkdown source={body} linkTarget="_blank" />
            : !body ? <p>{episode.teaser}</p>
            : React.createElement(body, {components})
          }
          {renderPlayer(podcast, episode)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={episode.guid}
          title={`${episode.title} | ${podcast.title}`}
          url={`http://ocdevel.com/mlg/${id}`}/>
      </Card.Footer>
    </Card>
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
    return <div key={e.guid} className='episode-teaser mb-3'>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{moment(e.date).format(fmt)}</Card.Subtitle>
          <Card.Text>
            <p>{e.teaser}</p>
          </Card.Text>
        </Card.Body>
        {footer && <Card.Footer>{footer}</Card.Footer>}
      </Card>
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
  // d75998bd cryptocurrency

  function miscResources() {
    const buttonAttrs = {
      variant: 'light',
      className: 'icon-btn'
    }
    return <div>
      {showDonate && (
        <Card className='mb-2'>
          <Card.Header>Donate</Card.Header>
          <Card.Body>
            <p>The best way to show support is via Patreon (above), plus you'll receive perks like access to an exclusive podcast series on applied ML.</p>
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
      )}

      <ButtonGroup className='d-block' vertical>
        <Button {...buttonAttrs} onClick={() => setShowDonate(true)}>
          <FaDollarSign /> Donate
        </Button>
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
        <Button {...buttonAttrs} href="https://github.com/lefnire/gnothi" target='_blank'>
          <FaGithub /> Podcast Project: Gnothi
        </Button>
      </ButtonGroup>

    </div>
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
    const btnOpts = {
      variant: 'light',
      className: 'icon-btn',
      target: '_blank'
    }
    return <>
      <Card className='mb-3'>
        <Card.Body>
          <div className="logo text-center mb-3">
            <img src={podcast.image} />
          </div>
          <Card.Title>Machine Learning Guide</Card.Title>
          <p>{podcast.body}</p>

          <ButtonGroup className='d-block' vertical>
            <Button {...btnOpts} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
              <FaItunesNote size={24}/> iTunes
            </Button>
            <Button {...btnOpts} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
              <RiSpotifyLine size={24}/> Spotify
            </Button>
            <Button {...btnOpts} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
              <RiGooglePlayLine size={24} /> Google Podcasts
            </Button>
            <Button {...btnOpts} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
              <SiStitcher size={24} /> Stitcher
            </Button>
            <Button {...btnOpts} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
              <SiRss size={24} /> Custom (RSS)
            </Button>
          </ButtonGroup>
          <hr />
          <Card.Title>Machine Learning Applied</Card.Title>
          <p>Is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes.</p>
          <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
          <LinkContainer to='/mlg/free-access'>
            <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
          </LinkContainer>
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