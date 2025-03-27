import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "~/components/utils";
import React from "react";

export default function Navbar_() {
  return <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
    <Nav>
      <LinkContainer to={"/mlg"}>Episodes</LinkContainer>
      <LinkContainer to="/mlg/resources">Resources</LinkContainer>
    </Nav>
  </Navbar>
}