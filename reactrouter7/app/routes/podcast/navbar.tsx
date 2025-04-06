import Nav from 'react-bootstrap/cjs/Nav';
import Navbar from 'react-bootstrap/cjs/Navbar';
import {LinkContainer} from "~/components/link-container";

export default function Navbar_() {
  return <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
    <Nav>
      <LinkContainer to="/mlg" tabIndex={0}>Episodes</LinkContainer>
      <LinkContainer to="/mlg/resources" tabIndex={1} end>Resources</LinkContainer>
    </Nav>
  </Navbar>
}