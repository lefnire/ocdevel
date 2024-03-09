import CookieConsent from "react-cookie-consent";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {LinkContainer} from 'react-router-bootstrap';
import ReactGA from "react-ga4";

// don't need bootstrap, imported in my scss
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import './v2.scss'
import logo from '../assets/OCDevel_WordLogo.png'
import Container from "react-bootstrap/Container";

let usingGA = false;
// FIXME use import.VITE_APP_*
if (import.meta.env.PROD) {
  console.log("using GA")
  usingGA = true;
  ReactGA.initialize('G-0YR1STKJS3')
  ReactGA.send({hitType: "pageview", page: window.location.pathname})
}

function LocationListener() {
  const location = useLocation()

  // https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528
  useEffect(() => {
    if (!usingGA) {return}
    ReactGA.send({hitType: "pageview", page: location.pathname}) //  + location.search);
    window.scrollTo(0, 0);
  }, [location])
  return null
}


export default function App() {
  return <div>
    <LocationListener />
    <CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>

    <Navbar bg='#f3f5ff' variant='light' className="navbar justify-content-center">

      {/*Had border-bottom property but removed it*/}

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

    {/*<Switch>*/}
    {/*  <Route path="/" exact><Lazy c={Home} /></Route>*/}
    {/*  <Route path="/blog"><Lazy c={Blog} /></Route>*/}
    {/*  <Route path="/mlg"><Lazy c={Podcasts} /></Route>*/}
    {/*  <Route path="/contact"><Lazy c={Contact} /></Route>*/}
    {/*  <Redirect from="/podcasts(.*)" to="/mlg"/>*/}
    {/*</Switch>*/}

    <Outlet />

    <footer className='footer text-center mt-auto shadow'>
      Copyright © 2009-2024 OCDevel LLC
    </footer>
  </div>
}