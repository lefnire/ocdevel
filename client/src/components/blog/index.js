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
  const renderProfile = () => {
    return <>
      <Card className='mb-3'>
        <Card.Body>
          <div className="logo text-center mb-3">
            <img src={avatar} className='rounded' />
          </div>
          <Card.Title>Tyler Renelle</Card.Title>
          <Card.Text>
            <p>ML engineer focused on NLP, with experience in computer vision, time series, and RL. I work with Keras, Pytorch, hugginface/transformers, XGBoost, SciPy (sklearn, Pandas, numpy), hyperparameter optimization, etc. Devops with AWS & Docker. Full-stack with Python/FastAPI, Postgres, and React / React Native. I offer NLP services using robust tooling I maintain at <a href="https://github.com/lefnire/ml-tools" target="_blank">lefnire/ml-tools</a>.</p>
            <div>
              <ul className="list-unstyled">
                <li><a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin d-block mb-1">LinkedIn</a></li>
                <li><a target="_blank" href="https://github.com/lefnire" className="zocial github d-block mb-1">Github</a></li>
                <li><a href="mailto:tylerrenelle@gmail.com" className="zocial email d-block mb-1">Email</a></li>
              </ul>
            </div>
          </Card.Text>

          <hr />

          <Card.Title>Projects</Card.Title>
          <Card.Subtitle><FaCouch /> <a href="https://gnothiai.com" target="_blank">Gnothi</a></Card.Subtitle>
          <Card.Text>An personal journal that uses AI to provide insights & resources. I created and maintain this open source project.</Card.Text>
          <Card.Subtitle><FaDragon /> <a href="https://habitica.com" target="_blank">Habitica</a></Card.Subtitle>
          <Card.Text>A gamified habit tracker. I created Habitica, but am no longer with the company.</Card.Text>
          <Card.Subtitle><FaMicrophone /> <Link to="/mlg">Machine Learning Guide</Link></Card.Subtitle>
          <Card.Text>I teach the fundamentals of machine learning and artificial intelligence over a podcast.</Card.Text>
          <Card.Subtitle><FaGithub /> More</Card.Subtitle>
          <Card.Text>See my Github and LinkedIn profiles for more projects.</Card.Text>
        </Card.Body>
      </Card>
    </>
  }

  return <div className="home">
    <Helmet>
      <title>OCDevel</title>
    </Helmet>
    <Row>
      <Col xs={12} sm={5} lg={3} xl={3} className='sidebar sidebar-profile'>
        {renderProfile()}
      </Col>
      <Col xs={12} sm={7} lg={9} xl={9}>
        <Switch>
          <Route path="/" exact><Posts /></Route>
          <Route path="/blog/:id"><Post /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}