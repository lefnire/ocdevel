import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {LinkContainer} from 'react-router-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import {Lazy} from "./utils";
const Home = () => import("./home")
const Blog = () => import("./blog")
const Podcasts = () => import("./podcasts")
const Contact = () => import("./contact")
require('./App.scss')

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
      <Route path="/" exact><Lazy c={Home} /></Route>
      <Route path="/blog"><Lazy c={Blog} /></Route>
      <Route path="/mlg"><Lazy c={Podcasts} /></Route>
      <Route path="/contact"><Lazy c={Contact} /></Route>
      <Redirect from="/podcasts(.*)" to="/mlg"/>
    </Switch>

    <footer className='footer text-center mt-auto shadow'>
      Copyright © 2009-2020 OCDevel LLC
    </footer>
  </div>
}