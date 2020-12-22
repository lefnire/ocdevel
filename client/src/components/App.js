import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Switch, Route} from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import Home from "./home"
import Blog from "./blog"
import Podcasts from "./podcasts";
import Contact from "./contact"
import './App.scss'

export default function App() {
  return <div>
    <CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>

    <Navbar bg='light' variant='light' className="shadow-sm mb-4">
      <LinkContainer to="/">
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog">
          <Nav.Link>Blog</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/mlg">
          <Nav.Link>Podcasts</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/contact'>
          <Nav.Link>Contact/Hire</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>

    <div className="container-fluid">
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/blog"><Blog /></Route>
        <Route path="/mlg"><Podcasts /></Route>
        <Route path="/contact"><Contact /></Route>
        {/*<Redirect from="*" to="/mlg"/>*/}
      </Switch>
    </div>

    <footer className='footer text-center mt-auto shadow'>
      Copyright © 2009-2020 OCDevel LLC
    </footer>
  </div>
}