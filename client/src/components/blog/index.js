import React, {useState} from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Modal, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link, Route, Switch, useParams} from 'react-router-dom'

import avatar from "../../assets/avatar.jfif"
import {FaArrowLeft, FaCouch, FaDragon, FaGithub, FaMicrophone, FaUnlock} from "react-icons/all";
import blog from '../../content/blog'
import {LinkContainer} from "react-router-bootstrap";
import ReactDisqusComments from "react-disqus-comments";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import _ from 'lodash'
import {Helmet} from "react-helmet";


const fmt = 'MMM DD, YYYY';

function BackButton() {
  return <Button className="back-button mb-2 float-right" href="/" variant="outline-secondary" size="sm">
    <FaArrowLeft /> All Posts
  </Button>
}

function Post() {
  const {id} = useParams()

  const p = _.find(blog, {id});
  return <div>
    <Helmet>
      <title>{p.title} | OCDevel</title>
      {/* Should use teaser here */}
      {/*<meta name="description" content="Helmet application" />*/}
    </Helmet>
    <Card>
      <Card.Body>
        <BackButton />
        <Card.Title>{p.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(p.date).format(fmt)}
        </Card.Subtitle>
        <Card.Text>
          {typeof(p.body) === 'string'
            ? <ReactMarkdown source={p.body} linkTarget="_blank" />
            : p.body
          }
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={id}
          title={`${p.title} | OCDevel`}
          url={`http://ocdevel.com/blog/${id}`}/>
      </Card.Footer>
    </Card>
  </div>
}

function Posts() {
  // const posts = _.sortBy(blog, e => -moment(e.date));
  const posts = blog;

  function renderPost(p) {
    return <Card key={p.id} className='mb-3 card-post'>
      <Card.Body>
        <Card.Title><Link to={'/blog/' + p.id}>{p.title}</Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(p.date).format(fmt)}
        </Card.Subtitle>
        <div className='fade-post'>
          {typeof(p.body) === 'string'
            ? <ReactMarkdown source={p.body} linkTarget="_blank" />
            : p.body
          }
          <div className='fade-post-bottom'></div>
        </div>
        <Link to={'/blog/' + p.id}>Read More</Link>
      </Card.Body>
    </Card>
  }

  return <div>
    {posts.map(renderPost)}
  </div>
}

export default function Home() {
  return <div className="home">
    <Helmet>
      <title>OCDevel Blog</title>
    </Helmet>
    <Switch>
      <Route path="/blog" exact><Posts /></Route>
      <Route path="/blog/:id"><Post /></Route>
    </Switch>
  </div>
}