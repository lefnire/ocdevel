import React from 'react';
import {
  Modal
} from 'react-bootstrap';
import portfolio from '../../content/portfolio';

class PortfolioModal extends React.Component {
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
      <Modal show={this.state.open} onHide={this.close} className="ocdevel-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <a href={item.url} target="_blank">{item.name}</a>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {item.person}
          <img src={item.img} style={{width: '100%'}} />
          <p>{item.description}</p>
        </Modal.Body>
      </Modal>
    );
  }
}


export default class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <PortfolioModal ref="modal" />
        <p className="project">Our projects</p>
        <hr/>

        <div className='row'>
          {portfolio.map(item =>
            <div className="col-md-4">
              <a className="portfoliolink" href={item.url} target='_blank'><h4>{item.name}</h4></a>
              <img
                className='portfolio-image img-rounded'
                src={item.img}
                onClick={() => this.refs.modal.open(item)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}