import React, {useState} from 'react';
import {Navbar, Nav, Modal, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Switch, Redirect, Route} from 'react-router-dom';
import Podcasts from "./podcasts";
import {FaCouch, FaDragon, FaEnvelope, FaExternalLinkAlt, FaMicrophone} from "react-icons/all";
import CookieConsent from "react-cookie-consent";
import Home from "./home"
import './App.scss'


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
          <div className="block-items">
            <a href="mailto:tylerrenelle@gmail.com" className="zocial email d-block mb-1">Email</a>
            <a target="_blank" href="https://www.linkedin.com/in/lefnire" className="zocial linkedin d-block mb-1">LinkedIn</a>
            <a target="_blank" href="https://twitter.com/lefnire" className="zocial twitter d-block mb-1">Twitter</a>
            <a target="_blank" href="https://github.com/lefnire" className="zocial github d-block mb-1">Github</a>
          </div>
        </Modal.Body>
      </Modal>
    )
  };

  const renderHeader = () => {
    return (
      <Navbar bg='light' variant='light' className="shadow-sm mb-4" expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>OCDevel</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/mlg">
              <Nav.Link><FaMicrophone /> Podcast</Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://gnothiai.com" target="_blank"><FaCouch /> Gnothi <FaExternalLinkAlt /></Nav.Link>
            <Nav.Link href="https://habitica.com" target="_blank"><FaDragon /> Habitica <FaExternalLinkAlt /></Nav.Link>
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
    <CookieConsent buttonText="Accept">This website uses cookies to enhance the user experience.</CookieConsent>

    <div className="container-fluid">
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/blog"><Home /></Route>
        <Route path="/mlg"><Podcasts.Series /></Route>
        {/*<Redirect from="*" to="/mlg"/>*/}
      </Switch>
    </div>
  </div>
}