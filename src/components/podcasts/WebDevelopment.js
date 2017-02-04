import React, { Component } from 'react';
import {PageHeader, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import episodes from '../../content/webdevelopment';
import _ from 'lodash';

class List extends Component {
  render() {
    return (
      <div>
        {episodes.map((e,i) => (
          <Panel header={<h3><Link to={'/podcasts/web-development/' + i}>{e.title}</Link></h3>}>
            <span className="pull-right">{e.date}</span>
            <p>{e.teaser}</p>
          </Panel>
        ))}
      </div>
    );
  }
}

class Episode extends Component {
  render() {
    let e = episodes[this.props.params.id];
    return (
      <div>
        <Link to='podcasts/web-development'>&lt; Back</Link>
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

class Series extends Component {
  render() {
    return (
      <div>
        <PageHeader>Web Development</PageHeader>
        <p>Original work was <a href="https://itunes.apple.com/us/podcast/ocdevel-web-development-podcast/id269893594?mt=2" target="_blank">OCDevel Web Development Podcast</a>, which is broadly still relevant, but vastly out-dated. Might I recommend <a href="http://starthere.fm/category/webdev" target="_blank">Start Here FM</a>.</p>
        {this.props.children}
    </div>
    );
  }
}

export default {List, Episode, Series};