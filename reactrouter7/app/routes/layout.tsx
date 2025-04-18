import Nav from 'react-bootstrap/cjs/Nav';
import Navbar from 'react-bootstrap/cjs/Navbar';
import {LinkContainer} from "~/components/link-container";
import {Link, Outlet} from "react-router";
import {PlausibleListener} from "~/components/analytics";

export default function Layout() {
  return <div>
    <PlausibleListener />
    <Navbar bg='light' variant='light' className="border-bottom justify-content-center">
      <LinkContainer to="/" tabIndex={0}>
        <Navbar.Brand>OCDevel</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/blog">Blog</LinkContainer>
        <LinkContainer to="/walk">Walk</LinkContainer>
        <LinkContainer to="/mlg">MLG</LinkContainer>
        <LinkContainer to="/llh">LLH</LinkContainer>
      </Nav>
    </Navbar>

    <Outlet />
    {/*
      <PopoverSingleton />
      // moved to only routes that need it; it's expensive
    */}

    <footer className='footer text-center mt-auto shadow'>
      <div className="d-flex justify-content-around align-items-center h-100">
        <div>
          {/*<span>Copyright © 2009-2024 OCDevel LLC</span>*/}
          <span>© 2009-2025 OCDevel LLC</span>
        </div>
        <div>
          <Link to="/" className='text-black'>Contact</Link>
        </div>
      </div>
    </footer>
  </div>
}