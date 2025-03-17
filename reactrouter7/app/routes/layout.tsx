// @FIXME
// import CookieConsent from "react-cookie-consent";
import {Navbar, Nav} from "react-bootstrap";
import {Outlet, useLocation} from "react-router";
import React, {useEffect} from "react";
// import {LinkContainer} from 'react-router-bootstrap';
// import ReactGA from "react-ga4";

// don't need bootstrap, imported in my scss
// import 'bootstrap/dist/css/bootstrap.min.css'
import './root.scss'
import {FaYoutube} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {SiTiktok} from "react-icons/si";
import {FaFacebook} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {NavLink, Link} from "react-router"


// let usingGA = false;
// // FIXME use import.VITE_APP_*
// if (import.meta.env.PROD) {
//   console.log("using GA")
//   usingGA = true;
//   ReactGA.initialize('G-0YR1STKJS3')
//   ReactGA.send({hitType: "pageview", page: window.location.pathname})
// }
//
// function LocationListener() {
//   const location = useLocation()
//
//   // https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528
//   useEffect(() => {
//     if (!usingGA) {return}
//     ReactGA.send({hitType: "pageview", page: location.pathname}) //  + location.search);
//     window.scrollTo(0, 0);
//   }, [location])
//   return null
// }

export default function App() {
  return <div>
    {/*<LocationListener />*/}
    {/*<CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>*/}

    <Navbar bg='light' variant='light' className="border-bottom justify-content-center">
      <LinkContainer to="/">
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog" tabIndex="0">Blog</LinkContainer>
        <LinkContainer to="/mlg" tabIndex="1">MLG</LinkContainer>
        <LinkContainer to="/llh" tabIndex="2">LLH</LinkContainer>
        <LinkContainer to='/contact' tabIndex="3">Contact</LinkContainer>
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
      <div className="d-flex justify-content-around align-items-center h-100">
        <div>
          {/*<span>Copyright © 2009-2024 OCDevel LLC</span>*/}
          <span>© 2009-2025 OCDevel LLC</span>
        </div>
        <div>
          <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            {[
              { href: "https://youtube.com/@ocdevel", Icon: FaYoutube },
              { href: "https://instagram.com/ocdevel", Icon: FaInstagram },
              { href: "https://tiktok.com/@lefnire", Icon: SiTiktok },
              { href: "https://facebook.com/ocdevel", Icon: FaFacebook }
            ].map(({ href, Icon }) => (
              <Button
                key={href}
                href={href}
                target="_blank"
                variant="link"
                className="p-1 text-dark fs-5"
              >
                <Icon />
              </Button>
            ))}
          </Stack>
        </div>
      </div>
    </footer>
  </div>
}