import React from 'react';

export default class Heads extends React.Component {

  render() {
    return (
      <img className='head-image' src={this.props.img} />
    );
  }

}