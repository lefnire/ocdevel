import React, { Component } from 'react';
import {PageHeader, Panel} from 'react-bootstrap';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import _machineLearning from '../content/machine-learning';
import _webDevelopment from '../content/web-development';

const episodes = {
  'machine-learning': _machineLearning,
  'web-development': _webDevelopment,
};

class Episode extends Component {
  render() {
    let {series, id} = this.props.params;
    let e = episodes[series][id-1];
    return (
      <div>
        <Link to={`podcasts/${series}`}>&lt; Back</Link>
        <Panel header={<h3>{e.title}</h3>}>
          <span className="pull-right">{e.date}</span>
          <p>{e.teaser}</p>
          {e.body}
          <audio controls>
            <source src={e.file} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Panel>
      </div>
    );
  }
}

class Episodes extends Component {
  render() {
    let {series} = this.props.params;
    return (
      <div>
        {episodes[series].map((e,i) => (
          <Panel header={<h3><Link to={`/podcasts/${series}/${i+1}`}>{e.title}</Link></h3>}>
            <span className="pull-right">{e.date}</span>
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
    let content = {
      'machine-learning': <PageHeader>Machine Learning & Artificial Intelligence</PageHeader>,
      'web-development': (
        <div>
          <PageHeader>Web Development</PageHeader>
          <p>Original work was <a href="https://itunes.apple.com/us/podcast/ocdevel-web-development-podcast/id269893594?mt=2" target="_blank">OCDevel Web Development Podcast</a>, which is broadly still relevant, but vastly out-dated. Might I recommend <a href="http://starthere.fm/category/webdev" target="_blank">Start Here FM</a>.</p>
        </div>
      )
    }[series];
    return (
      <div>
        {content}
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