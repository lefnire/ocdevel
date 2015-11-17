import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="nav navbar-nav navbar pull-right">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
