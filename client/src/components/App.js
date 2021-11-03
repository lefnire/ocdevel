import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {LinkContainer} from 'react-router-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import Home from "./home"
import Blog from "./blog"
import Podcasts from "./podcasts";
import Contact from "./contact"
import './App.scss'

export default function App() {
  return <div>
    <CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>

    <Navbar bg='light' variant='light' className="border-bottom justify-content-center">
      <LinkContainer to="/" exact>
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog" exact>
          <Nav.Link>Blog</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/mlg" exact>
          <Nav.Link>Podcast</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/contact' exact>
          <Nav.Link>Contact</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>

    <Switch>
      <Route path="/" exact><Home /></Route>
      <Route path="/blog"><Blog /></Route>
      <Route path="/mlg"><Podcasts /></Route>
      <Route path="/contact"><Contact /></Route>
      <Redirect from="/podcasts(.*)" to="/mlg"/>
    </Switch>

    <footer className='footer text-center mt-auto shadow'>
      Copyright © 2009-2020 OCDevel LLC
    </footer>
  </div>
}