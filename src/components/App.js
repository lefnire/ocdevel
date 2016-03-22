import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid ">
        <nav className="nav navbar-nav navbar top-center">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/tyler">Tyler</Link></li>
          <li><Link to="/lisa">Lisa</Link></li>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
