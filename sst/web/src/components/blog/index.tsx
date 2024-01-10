import React from 'react';
import Container from 'react-bootstrap/Container'
import {Outlet} from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Home() {
  return <Container className="home">
    <Helmet>
      <title>OCDevel Blog</title>
    </Helmet>
    <Outlet />
  </Container>
}