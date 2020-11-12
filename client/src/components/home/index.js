import React, {useState} from 'react';
import {Row, Col, Button, OverlayTrigger, Popover, Modal, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link, Route, Switch, useParams} from 'react-router-dom'

import avatar from "../../assets/avatar.jfif"
import {FaCouch, FaDragon, FaGithub, FaMicrophone, FaUnlock} from "react-icons/all";
import blog from '../../content/blog'
import {LinkContainer} from "react-router-bootstrap";
import ReactDisqusComments from "react-disqus-comments";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import _ from 'lodash'
import {Helmet} from "react-helmet";


const fmt = 'MMM DD, YYYY';

function BackButton() {
  return <Button className="back-button" href="/" variant="outline-secondary" size="sm">&lt; All Posts</Button>
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
    <BackButton />
    <Card>
      <Card.Body>
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
        {/*<ReactDisqusComments
        shortname="ocdevel"
        identifier={episode.guid}
        title={`${episode.title} | ${podcast.title}`}
        url={`http://ocdevel.com/mlg/${id}`}/>*/}
      </Card.Body>
    </Card>
  </div>
}

function Posts() {
  const posts = _.sortBy(blog, e => -moment(e.date));

  function renderPost(p) {
    return <div key={p.id} className='blog-posts-post'>
      <Card>
        <Card.Body>
          <Card.Title><Link to={'/blog/' + p.id}>{p.title}</Link></Card.Title>
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
      </Card>
      <div className='blog-post-fade'></div>
    </div>
  }

  return <div>
    {posts.map(renderPost)}
  </div>
}

export default function Home() {
  const renderProfile = () => {
    return <>
      <Card className='profile-card'>
        <Card.Img variant="top" src={avatar}/>
        <Card.Body>
          <Card.Title>Tyler Renelle</Card.Title>
          <Card.Text>
            <p>ML engineer focused on NLP, with experience in computer vision, time series, and RL. I work with Keras, Pytorch, hugginface/transformers, XGBoost, SciPy (sklearn, Pandas, numpy), hyperparameter optimization, etc. Devops with AWS & Docker. Full-stack with Python/FastAPI, Postgres, and React / React Native. I offer NLP services using robust tooling I maintain at <a href="https://github.com/lefnire/ml-tools" target="_blank">lefnire/ml-tools</a>.</p>
            <div>
              <ul className="list-unstyled block-items">
                <li><a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin">LinkedIn</a></li>
                <li><a target="_blank" href="https://github.com/lefnire" className="zocial github">Github</a></li>
                <li><a href="mailto:tylerrenelle@gmail.com" className="zocial email">Email</a></li>
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

  return <div className="Home">
    <Helmet>
      <title>OCDevel</title>
    </Helmet>
    <Row>
      <Col xs={12} sm={5} lg={3} xl={2}>
        {renderProfile()}
      </Col>
      <Col xs={12} sm={7} lg={9} xl={10}>
        <Switch>
          <Route path="/" exact><Posts /></Route>
          <Route path="/blog/:id"><Post /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}