import Nav from 'react-bootstrap/cjs/Nav';
import Navbar from 'react-bootstrap/cjs/Navbar';
import {LinkContainer} from "~/components/utils";

export default function Navbar_() {
  return <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
    <Nav>
      <LinkContainer to={"/mlg"}>Episodes</LinkContainer>
      <LinkContainer to="/mlg/resources">Resources</LinkContainer>
    </Nav>
  </Navbar>
}