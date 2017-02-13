import React, { Component } from 'react';
import {PageHeader, Panel} from 'react-bootstrap';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import ReactDisqusThread from 'react-disqus-thread';
import _ from 'lodash';

import _machineLearning from '../content/machine-learning';
import _webDevelopment from '../content/web-development';

import './podcasts.css';

const podcasts = {
  'machine-learning': _machineLearning,
  'web-development': _webDevelopment,
};
const fmt = 'MMM, MM/DD/YYYY';

class Episode extends Component {
  render() {
    let {series, id} = this.props.params;
    let podcast = podcasts[series],
      e = podcast.episodes[id-1];
    return (
      <div>
        <Link to={`podcasts/${series}`}>&lt; Back</Link>
        <Panel header={<h3>{e.title}</h3>}>
          <span className="pull-right">{moment(e.date).format(fmt)}</span>
          {e.body? (
            <ReactMarkdown source={e.body}
              renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}
            />
          ): <p>{e.teaser}</p>}
          <audio controls style={{width:'100%'}}>
            <source src={e.file.url} type={e.file.type}/>
            Your browser does not support the audio element.
          </audio>
        </Panel>
        <ReactDisqusThread
          shortname="ocdevel"
          identifier={e.guid}
          title={`${e.title} | ${podcast.title}`}
          url={`http://ocdevel.com/podcasts/${series}/${id}`}/>
      </div>
    );
  }
}

class Episodes extends Component {
  render() {
    let {series} = this.props.params;
    return (
      <div>
        {podcasts[series].episodes.map((e,i) => (
          <Panel key={e.file.url} header={<h3><Link to={`/podcasts/${series}/${i+1}`}>{e.title}</Link></h3>}>
            <span className="pull-right">{moment(e.date).format(fmt)}</span>
            <p>{e.teaser}</p>
          </Panel>
        ))}
      </div>
    );
  }
}

class Series extends Component {
  render() {
    let {series} = this.props.params;
    if (!_.includes(['machine-learning', 'web-development'], series))
      return window.location.href = '/podcasts/machine-learning';

    let podcast = podcasts[series];
    let buttons = {
      'web-development': null,
      'machine-learning': (
        <div className="sub-button-container">
          <a className="zocial android sub-button" href='https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/I6qthwgrz7b5tclqk4ruvipibtu?t%3DMachine_Learning_Guide%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16' rel='nofollow'>Listen on Google Play Music</a>
          <a className="zocial appstore sub-button" href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">Subscribe in iTunes</a>
        </div>
      )
    }[series];
    let extra = {
      'web-development': (<p>Original work was <a href="https://itunes.apple.com/us/podcast/ocdevel-web-development-podcast/id269893594?mt=2" target="_blank">OCDevel Web Development Podcast</a>, which is broadly still relevant, but vastly out-dated. Might I recommend <a href="http://starthere.fm/category/webdev" target="_blank">Start Here FM</a>.</p>),
      'machine-learning': null
    }[series];

    return (
      <div>
        <PageHeader>{podcast.title}</PageHeader>
        <div>
          <div className="logo-and-sub">
            <div className="logo"><img src={podcast.image} style={{height: 140, width: 140}}/></div>
            {buttons}
          </div>
          <div className="clearfix"/>
          {extra}
          <p>{podcast.body || podcast.teaser}</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}

class App extends Component {
  renderHeader = () => {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/podcasts/machine-learning">
              <NavItem eventKey={1}>Machine Learning & AI</NavItem>
            </LinkContainer>
            <LinkContainer to="/podcasts/web-development">
              <NavItem eventKey={2}>Web Development</NavItem>
            </LinkContainer>
            {/*<LinkContainer to="/blog">
              <NavItem eventKey={4}>Blog</NavItem>
            </LinkContainer>*/}
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/contact">
              <NavItem eventKey={1}>Contact</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default {App, Series, Episodes, Episode};