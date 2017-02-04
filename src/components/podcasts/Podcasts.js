import React, { Component } from 'react';
import {PageHeader} from 'react-bootstrap';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

export default class Podcasts extends Component {
  renderHeader = () => {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Podcasts</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/podcasts/machine-learning">
              <NavItem eventKey={1}>Machine Learning & AI</NavItem>
            </LinkContainer>
            <LinkContainer to="/podcasts/web-development">
              <NavItem eventKey={2}>Web Development</NavItem>
            </LinkContainer>
            {/*<LinkContainer to="/podcasts/digital-nomad">
              <NavItem eventKey={3}>Digital Nomad</NavItem>
            </LinkContainer>*/}
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/contact">
              <NavItem eventKey={1}>Contact</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}