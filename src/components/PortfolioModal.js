import React from 'react';
import {
  Modal
} from 'react-bootstrap';

export default class PortfolioModal extends React.Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  close = () => this.setState({open: false});
  open = (item) => {
    this.setState({
      open: true,
      item: item
    });
  };

  render() {
    let {item} = this.state;
    if (!item) return null;
    return (
      <Modal show={this.state.open} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            <a href={item.url} target="_blank">{item.name}</a>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={item.img} />
          <p>{item.description}</p>
        </Modal.Body>
      </Modal>
    );
  }
}
