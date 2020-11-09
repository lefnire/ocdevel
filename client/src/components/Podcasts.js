import React, { Component } from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Alert,
  FormGroup, InputGroup, FormControl, Modal, Card} from 'react-bootstrap';
import {Switch, Link, Route, useParams, Redirect} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusComments from 'react-disqus-comments';
import _ from 'lodash';
import {FaGithub, FaUnlock, FaDollarSign, FaLightbulb, FaBriefcase, FaEnvelope} from 'react-icons/all';

import podcast from '../content/machine-learning';
import './podcasts.css';
const fmt = 'MMM DD, YYYY';
const patreonLink = 'https://www.patreon.com/machinelearningguide'

function BackButton() {
  return <Button className="back-button" href="/mlg" variant="outline-secondary" size="sm">&lt; All Episodes</Button>
  // TODO using LinkContainer loses the variant syles
  return <LinkContainer to="/mlg">
    <Button variant="outline-secondary" size="sm">&lt; All Episodes</Button>
  </LinkContainer>
}

function Card_({title, children, subtitle=null, mla=false}) {
  return <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      {subtitle && <Card.Subtitle className="mb-2 text-muted">
        {subtitle}
      </Card.Subtitle>}
      <Card.Text>{children}</Card.Text>
    </Card.Body>
    {mla && <Card.Footer>
      <FaUnlock />  $1/m on <a href={patreonLink} target="_blank">Patreon</a> or <Link to="/mlg/free-access">get free access</Link>
    </Card.Footer>}
  </Card>
}

function Recommend() {
  return <div>
    <BackButton />
    <Card_ title="Recommend a Future Episode">
      <p>Comment (using Disqus) any future episode you'd like to see, or upvote another's recommendation if it's already in the comments. When I'm done with my game-plan, I hope to tackle recommendations in order of popularity.</p>
      <ReactDisqusComments
        shortname="ocdevel"
        identifier="machine-learning-recommend"
        title={`Recommend an Episode | ${podcast.title}`}
        url="http://ocdevel.com/mlg/recommend" />
    </Card_>
  </div>
}

function FreeAccess() {
  return <div>
    <BackButton />
    <Card_ title="Get Free MLA Access">
      <a href={patreonLink} target="_blank">Machine Learning Applied</a> is a $1/m exclusive podcast, but you can get free access in the following ways.
      <ol>
        <li>Get 3 months of free access by posting a link to <a href="https://gnothiai.com">Gnothi</a> on your social media, then <a href="mailto:tylerrenelle@gmail.com">email the</a> link or screenshot.</li>
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

  const markdownRenderers = {
    // Ensure all episode links are target=_blank
    Link: props => (<a href={props.href} target="_blank">{children}</a>)
  };

  const episode = _.find(podcast.episodes, {episode: parseInt(id)});
  // Turn h2s into h3s (h2s make sense standalone, not inlined the website)
  const body = episode.body && episode.body.replace(/##/g, '###');
  return <div>
    <BackButton />
    <Card_ title={episode.title} subtitle={moment(episode.date).format(fmt)}>
      {body? (
        <ReactMarkdown source={body} renderers={markdownRenderers} />
      ): (
        <p>{episode.teaser}</p>
      )}
      {renderPlayer(podcast, episode)}
      <ReactDisqusComments
        shortname="ocdevel"
        identifier={episode.guid}
        title={`${episode.title} | ${podcast.title}`}
        url={`http://ocdevel.com/mlg/${id}`}/>
    </Card_>
  </div>
}

function Episodes() {
  const episodes = _.sortBy(podcast.episodes, e => -moment(e.date));

  function renderEpisode(e) {
    let num = _.padStart(e.episode, 3, '0');
    let title = `${e.mla ? 'MLA' : 'MLG'} ${num}: ${e.title}`;

    title = e.mla ? <a href={patreonLink} target="_blank">{title}</a>
      : <Link to={`/mlg/${e.episode}`}>{title}</Link>
    return <div key={e.guid} style={{marginBottom: 10}}>
      <Card_ title={title} subtitle={moment(e.date).format(fmt)} mla={e.mla}>
        <p>{e.teaser}</p>
      </Card_>
    </div>
  }

  return <div>
    {episodes.map(renderEpisode)}
  </div>
}

class Series extends Component {
  constructor() {
    super();
    this.state = {
      showHireModal: false,
      showDonate: false,
      showCrypto: false
    };
  }

  sidebar = () => {
    const {showDonate, showCrypto} = this.state;
    return (
      <div>
        <div className="sub-button-container">
          <a className="zocial itunes sub-button" href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130" target="_blank" rel="nofollow">iTunes</a>
          <a className="zocial android sub-button" href='https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/I6qthwgrz7b5tclqk4ruvipibtu?t%3DMachine_Learning_Guide%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16' rel='nofollow' target="_blank">Google Play</a>
          <a className="zocial podcast sub-button" href="http://www.stitcher.com/s?fid=130679&refid=stpr" target="_blank" rel="nofollow">Stitcher</a>
          <a className="zocial rss sub-button" href="http://machinelearningguide.libsyn.com/rss" target="_blank" rel="nofollow">Custom (RSS)</a>
        </div>

        <hr/>

        <div className='sidebar-resources' style={{margin: 5}}>
          {showDonate ? (
            <Card>
              <Card.Header><Card.Title>Donate</Card.Title></Card.Header>
              <Card.Body>
                <Button bsStyle="primary" block href={patreonLink} target="_blank">Patreon</Button>
                <small>The best way to show your support, as you'll receive perks (like access to an exclusive podcast series on applied ML).</small>
                <hr/>

                {showCrypto ? (
                  <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>BTC</InputGroup.Addon>
                        <FormControl type="text" value="1Mgi64qWNYAcUhjvyoc8oYDNN6oKPzpaWs" />
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Addon>BCH</InputGroup.Addon>
                        <FormControl type="text" value="17VMYyAHFZSfy8EzLcy69Sie9sw5qe8nyP" />
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Addon>ETH</InputGroup.Addon>
                        <FormControl type="text" value="0x250092887eC61E75f0F82edcBC741fF428D5c8d5" />
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Addon>LTC</InputGroup.Addon>
                        <FormControl type="text" value="LfVo7VR1fWPcaG7GhC4LLSrGNQynPsMdSL"/>
                      </InputGroup>
                  </FormGroup>

                ) : (
                  <Button bsStyle="primary" block onClick={this.showCrypto}>Cryptocurrency</Button>
                )}
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
              <a href='#' style={{display: 'block'}} onClick={this.showDonate}>
                <FaDollarSign /> Donate
              </a>
          )}
          {/*<a style={{display: 'block'}} href='#' onClick={this.showHireModal}>
            <FaBriefcase /> Hire Me
          </a>*/}
          <Link to="/mlg/recommend" style={{display: 'block'}} >
            <FaLightbulb /> Recommend an Episode
          </Link>
          <OverlayTrigger
            placement="right"
            overlay={(
              <Popover id="popover-positioned-right">
                Get notified of new episodes / announcements
              </Popover>
            )}
          >
            <a style={{display: 'block'}} href="http://eepurl.com/cUUWfD" target="_blank">
              <FaEnvelope /> Mailing List
            </a>
          </OverlayTrigger>
          <a style={{display: 'block'}} href="https://github.com/lefnire/gnothi" target='_blank'>
            <FaGithub /> Podcast Project
          </a>
        </div>
      </div>
    );
  };

  renderHireModal = () => (
    <Modal show={this.state.showHireModal} onHide={this.closeHireModal}>
      <Modal.Header closeButton>
        <Modal.Title>Hire Me</Modal.Title>
      </Modal.Header>
      <Modal.Body className='hire-me'>
        <img src="/files/profile_pic.jpeg" style={{float:'left', paddingRight:10, paddingBottom: 5, width: 150}} />
        <h4>Tyler Renelle</h4>
        <p>Machine learning engineer focused on time series & reinforcement (esp. NLP & algo-trading). Background in full-stack JavaScript, 10 years web & mobile. Tech: Python, TensorFlow, React / React Native.</p>
        <p>Creator of HabitRPG, a startup begun on Kickstarter which now has ~2M users. Built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients such as Adidas, BigFix, and UCSF. Obsessed with AI - bonafide Singularitarian and herald for the takeover.</p>
        <p>Looking for remote work, or local to Portland, OR.</p>
        <div>
          <ul className="list-unstyled">
            <li><a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin">LinkedIn</a></li>
            <li><a target="_blank" href="https://github.com/lefnire" className="zocial github">Github</a></li>
            <li><a href="mailto:tylerrenelle@gmail.com" className="zocial email">Email</a></li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.closeHireModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  showHireModal = () => this.setState({showHireModal: true});
  closeHireModal = () => this.setState({showHireModal: false});

  showDonate = () => this.setState({showDonate: true});
  showCrypto = () => this.setState({showCrypto: true});

  render() {
    return (
      <div className="container">
        <div className="Series">
          {this.renderHireModal()}
          <h1 className="page-header">{podcast.title}</h1>
          <Row>
            <Col xs={12} md={4}>
              <div className="logo"><img src={podcast.image} style={{height: 140, width: 140}}/></div>
              <div>
                <p><b>Machine Learning Guide</b> {podcast.body}</p>
                <p><b>Machine Learning Applied</b> is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes. See <a href={patreonLink} target="_blank">Patreon</a> to access this series.</p>
              </div>
              {this.sidebar()}
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
      </div>
    );
  }
}

export default {Series, Episodes, Episode, Recommend};