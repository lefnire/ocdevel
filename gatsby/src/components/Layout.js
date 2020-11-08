import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
// import ReactGA from 'react-ga';

// redirect from old routes
let match = window.location.href.match(/machine[\-]?learning(\/.*)?/);
if (match) {
  window.location.href = match[1] ? `/mlg${match[1]}` : '/mlg';
}

// const PROD = !~window.location.href.indexOf('localhost');
// PROD && ReactGA.initialize('UA-3128634-8');
// function logPageView() {
//   if (!PROD) return;
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname);
// }

export default class Layout extends Component {
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
        <Navbar.Brand href="/">OCDevel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/mlg">Machine Learning Guide</Nav.Link>
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
        {this.props.children}
      </div>
    );
  }
}