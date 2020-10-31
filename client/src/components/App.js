import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Podcasts from "./Podcasts";
import Home from "./home/Index";

export default class App extends Component {
  state = {
    showModal: false
  };

  open = () => this.setState({showModal: true});
  close = () => this.setState({showModal: false});

  renderModal = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
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
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  renderHeader = () => {
    return (
      <Navbar collapseOnSelect style={{marginBottom: 0}}>
        <LinkContainer to="/">
          <Navbar.Brand>OCDevel</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/mlg">
              <Nav.Link>Machine Learning Guide</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link eventKey={1} onClick={this.open}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderModal()}
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/mlg"><Podcasts.Series /></Route>
          <Redirect from="*" to="/mlg"/>
        </Switch>
      </div>
    );
  }
}