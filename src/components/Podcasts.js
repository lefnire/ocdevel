import React, { Component } from 'react';
import {PageHeader, Panel, Grid, Row, Col, Button, OverlayTrigger, Popover, Glyphicon, Alert,
  FormGroup, InputGroup, FormControl, Modal} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusThread from 'react-disqus-thread';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { faUnlock } from '@fortawesome/fontawesome-free-solid'

import _machineLearning from '../content/machine-learning';
import _webDevelopment from '../content/web-development';

import './podcasts.css';

const podcasts = {
  'machine-learning': _machineLearning,
  'web-development': _webDevelopment,
};
const fmt = 'MMM, MM/DD/YYYY';

class Recommend extends Component {
  render() {
    let {series, id} = this.props.params;
    const podcast = podcasts[series];
    return (
      <div>
        <Button href={`/podcasts/${series}`}>&lt; All Episodes</Button>
        <h2>Recommend a Future Episode</h2>
        <p>Comment (using Disqus) any future episode you'd like to see, or upvote another's recommendation if it's already in the comments. When I'm done with my game-plan, I hope to tackle recommendations in order of popularity.</p>
        <ReactDisqusThread
          shortname="ocdevel"
          identifier={series + '-recommend'}
          title={`Recommend an Episode | ${podcast.title}`}
          url={`http://ocdevel.com/podcasts/${series}/recommend`}/>
      </div>
    );
  }
}

class Episode extends Component {
  renderPlayer = (podcast, episode) => {
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

  markdownRenderers = {
    // Ensure all episode links are target=_blank
    Link: props => (<a href={props.href} target="_blank">{props.children}</a>)
  };

  render() {
    const {series, id} = this.props.params;
    const podcast = podcasts[series],
      episode = podcast.episodes[id-1];
    // Turn h2s into h3s (h2s make sense standalone, not inlined the website)
    const body = episode.body && episode.body.replace(/##/g, '###');
    return (
      <div>
        <Button href={`/podcasts/${series}`}>&lt; All Episodes</Button>
        <div>
          <h2>{episode.title}</h2>
          <i>{moment(episode.date).format(fmt)}</i>
          {body? (
            <ReactMarkdown source={body} renderers={this.markdownRenderers} />
          ): (
            <p>{episode.teaser}</p>
          )}
        </div>
        {this.renderPlayer(podcast, episode)}
        <ReactDisqusThread
          shortname="ocdevel"
          identifier={episode.guid}
          title={`${episode.title} | ${podcast.title}`}
          url={`http://ocdevel.com/podcasts/${series}/${id}`}/>
      </div>
    );
  }
}

class Episodes extends Component {
  render() {
    const {series} = this.props.params;
    const episodes = podcasts[series].episodes;
    return (
      <div>
        {episodes.slice().reverse().map((e, i) => (
          <div key={e.guid}>

            <h3>
              {e.mla? (
                <a href='https://www.patreon.com/machinelearningguide' target="_blank">{e.title}</a>
              ) : (
                <Link to={`/podcasts/${series}/${episodes.length - i}`}>{e.title}</Link>
              )}
            </h3>
            {e.mla && (
              <span className='label label-info' style={{marginRight: 10}}><FontAwesomeIcon icon={faUnlock} />  $1/m on Patreon</span>
            )}
            <i>{moment(e.date).format(fmt)}</i>
            <p>{e.teaser}</p>
          </div>
        ))}
      </div>
    );
  }
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

  'sidebar-web-development' = () => {
    const {series} = this.props.params;
    return (
      <div>
        <div className="sub-button-container">
          <a className="zocial itunes sub-button" href="https://itunes.apple.com/us/podcast/ocdevel-web-development-podcast/id269893594?mt=2" target="_blank" rel="nofollow">iTunes</a>
        </div>
        <div>
          <h4 className="alert alert-warning">This podcast is broadly still relevant, but vastly out-dated. Might I recommend <a href="http://starthere.fm/category/webdev" target="_blank">Start Here FM</a> instead.</h4>
        </div>
      </div>
    );
  };

  'sidebar-machine-learning' = () => {
    // const {series} = this.props.params;
    const {showDonate, showCrypto} = this.state;
    return (
      <div>
        {showDonate ? (
          <Panel header="Donate">
            <Button bsStyle="primary" block href="https://www.patreon.com/machinelearningguide" target="_blank">Patreon</Button>
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
          </Panel>
        ) : (
            <Button bsSize="large" bsStyle="primary" block onClick={this.showDonate}>
              <Glyphicon glyph="heart-empty"/> Donate
            </Button>
        )}
        {/*<Button bsSize="large" block onClick={this.showHireModal}>
          <Glyphicon glyph="briefcase"/> Hire Me
        </Button>*/}
        <Button bsSize="large" block onClick={this.goToRecommend}>
          <Glyphicon glyph="exclamation-sign"/> Recommend an Episode
        </Button>
        <OverlayTrigger
          placement="right"
          overlay={(
            <Popover id="popover-positioned-right">
              Get notified of new episodes / announcements
            </Popover>
          )}
        >
          <Button bsSize="large" block href="http://eepurl.com/cUUWfD" target="_blank">
            <Glyphicon glyph="envelope"/> Mailing List
          </Button>
        </OverlayTrigger>
        <Button bsSize="large" block href="https://github.com/lefnire/tforce_btc_trader">
          <FontAwesomeIcon icon={faGithub} /> Podcast Project
        </Button>

        <h4>Subscribe</h4>
        <div className="sub-button-container">
          <a className="zocial itunes sub-button" href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130" target="_blank" rel="nofollow">iTunes</a>
          <a className="zocial android sub-button" href='https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/I6qthwgrz7b5tclqk4ruvipibtu?t%3DMachine_Learning_Guide%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16' rel='nofollow' target="_blank">Google Play</a>
          <a className="zocial podcast sub-button" href="http://www.stitcher.com/s?fid=130679&refid=stpr" target="_blank" rel="nofollow">Stitcher</a>
          <a className="zocial rss sub-button" href="http://machinelearningguide.libsyn.com/rss" target="_blank" rel="nofollow">Custom (RSS)</a>
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
        <img src="https://media-exp1.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/113/2f5/2579111.jpg" style={{float:'left', paddingRight:10, paddingBottom: 5, width: 150}} />
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

  goToRecommend = () => browserHistory.push(`/podcasts/${this.props.params.series}/recommend`);

  render() {
    let {series} = this.props.params;
    if (!_.includes(['machine-learning', 'web-development'], series))
      return window.location.href = '/podcasts/machine-learning';

    let podcast = podcasts[series];

    return (
      <div className="Series">
        {this.renderHireModal()}
        <PageHeader>{podcast.title}</PageHeader>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <div className="logo"><img src={podcast.image} style={{height: 140, width: 140}}/></div>
              {this['sidebar-' + series]()}
              <div>
                <h4>About</h4>
                {podcast.body || podcast.teaser}
              </div>
            </Col>
            <Col xs={12} md={8}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class App extends Component {
  render() {
    let {series} = this.props.params;
    if (!_.includes(['machine-learning', 'web-development'], series))
      return window.location.href = '/podcasts/machine-learning';

    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default {App, Series, Episodes, Episode, Recommend};