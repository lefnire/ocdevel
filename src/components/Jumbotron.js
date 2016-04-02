import React from 'react';

export default class Jumbotron extends React.Component {
  render() {
    return (
      <div className={'container ' + this.props.className}>
        <div className="jumbotron">
          <h1>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}