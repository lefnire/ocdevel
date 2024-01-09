import React from 'react';
import Container from 'react-bootstrap/Container'
import {Route, Switch} from 'react-router-dom'
import {Helmet} from "react-helmet";
import {Lazy} from '../utils'
const Posts = () => import('./Posts')
const Post = () => import('./Post')

export default function Home() {
  return <Container className="home">
    <Helmet>
      <title>OCDevel Blog</title>
    </Helmet>
    <Switch>
      <Route path="/blog" exact><Lazy c={Posts} /></Route>
      <Route path="/blog/:id"><Lazy c={Post} /></Route>
    </Switch>
  </Container>
}