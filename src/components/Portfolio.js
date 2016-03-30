import React from 'react';
import {
  Modal
} from 'react-bootstrap';

const portfolio = [{
  name:"Habitica",
  img: require("../assets/Tyler/habiticapic.png"),
  url: "https://habitica.com",
  description: "A gamified habit-improvement app (web & mobile) w/ 800k+ users, ~$40k/m. I started this as a Kickstarter campaign which blew up to a multi-employee startup. Angular, Ionic, Node/Express, MongoDB, AWS."
}, {
  name: "Jobpig",
  img: require("../assets/Tyler/pig.png"),
  url: "http://jobpigapp.com",
  description: "A Pandora-like job finding website."
}, {
  name: "Flashdrinks",
  img: require("../assets/Tyler/flashdrinkspic.png"),
  url: "https://flashdrink.firebaseapp.com",
  description: "Web & mobile mobile app for finding nearby drinking partners."
}, {
  name: "TheWanderingBackpackers",
  img: require("../assets/Lisa/WanderingBackpackers.png"),
  url: "http://thewanderingbackpackers.com/",
  description: "A Wordpress blog for our travels."
}, {
  name: "Indianchief Travel",
  img: require("../assets/Tyler/indianchieftravelpic.jpg"),
  url: "http://indianchieftravel.com/",
  description: ""
}];

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


export default class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <PortfolioModal ref="modal" />
        <p className="project">Our projects</p>

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