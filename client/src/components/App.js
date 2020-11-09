import React, {useState} from 'react';
import {Navbar, Nav, Modal, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Switch, Redirect, Route} from 'react-router-dom';
import Podcasts from "./podcasts";
import {FaCouch, FaDragon, FaEnvelope, FaMicrophone} from "react-icons/all";

import Home from "./home"
import './app.css'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  const toggle = () => setShowModal(!showModal);

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-buttons">
            <a href="mailto:tylerrenelle@gmail.com" className="zocial email">Email</a>
            <a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin">LinkedIn</a>
            <a target="_blank" href="https://twitter.com/lefnire" className="zocial twitter">Twitter</a>
            <a target="_blank" href="https://github.com/lefnire" className="zocial github">Github</a>
          </div>
        </Modal.Body>
      </Modal>
    )
  };

  const renderHeader = () => {
    return (
      <Navbar bg='light' variant='light' expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>OCDevel</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/mlg">
              <Nav.Link><FaMicrophone /> Podcast</Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://gnothiai.com" target="_blank"><FaCouch /> Gnothi</Nav.Link>
            <Nav.Link href="https://habitica.com" target="_blank"><FaDragon /> Habitica</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={toggle}><FaEnvelope /> Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return <div>
    {renderHeader()}
    {renderModal()}

    <div className="container-fluid">
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/mlg"><Podcasts.Series /></Route>
        <Redirect from="*" to="/mlg"/>
      </Switch>
    </div>
  </div>
}