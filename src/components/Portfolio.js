import React from 'react';
import {
  Modal
} from 'react-bootstrap';

const portfolio = [{
  name:"Habitica",
  person: "Tyler",
  img: require("../assets/Tyler/habiticapic.png"),
  url: "https://habitica.com",
  description: "A gamified habit-improvement app (web & mobile) w/ 800k+ users, ~$40k/m. I started this as a Kickstarter campaign which blew up to a multi-employee startup. Angular, Ionic, Node/Express, MongoDB, AWS."
}, {
  name: "Jobpig",
  person: "Tyler & Lisa",
  img: require("../assets/Tyler/pig.png"),
  url: "http://jobpigapp.com",
  description: "Pandora-like job board. Built with Node / Express, Postgres, React / React Native, Material Design, Amazon Web Services. Code at github.com/lefnire/jobpig"
}, {
  name: "FlashDrinks",
  person: "Tyler & Lisa",
  img: require("../assets/Tyler/flashdrinkspic.png"),
  url: "https://flashdrink.firebaseapp.com",
  description: "A mobile app used to see who wants to grab a drink (among friends and strangers) near you. Built with Firebase, Angular / Ionic, Node / Express, Amazon Web Services. Code at github.com/lefnire/flashdrinks & github.com/lefnire/flashdrinks-server "
}, {
  name: "TheWanderingBackpackers",
  person: "Lisa",
  img: require("../assets/backpack.png"),
  url: "http://thewanderingbackpackers.com/",
  description: "The Wandering Backpackers is a Wordpress blog made for our traveling adventures."
}, {
  name: "Indianchief Travel",
  person: "Tyler",
  img: require("../assets/Tyler/indianchieftravelpic.jpg"),
  url: "http://indianchieftravel.com/",
  description: "A travel website with custom modules & themes using Drupal (PHP, MySQL, jQuery) and Flash. Built mash-ups using Flickr, Weather.com, Google Maps, and more. Marketed and conducted SEO."
}, {
  name: "Better The World",
  person: "Tyler",
  img: require("../assets/world.png"),
  url: "http://www.bettertheworld.org/",
  description: "A non profit organization management company. Tyler helped develop a web search tool using the YBOSS API. Technologies used: Kohana, PHP."
}, {
  name: "Rocket Insights",
  person: "Tyler",
  img: require("../assets/rocket.png"),
  url: "http://www.rocketinsights.com/",
  description: "A Boston-based agency who partners with clients to craft amazing web & mobile apps.Helped Rocket Insights develop the backend administration site for the Kaymbu iPad app using AngularJS & Rails. See case study at http://www.rocketinsights.com/work/kaymbu/"
}, {
  name: "Cirrus CPQ",
  person: "Tyler",
  img: require("../assets/CPQ.png"),
  url: "http://cirruscpq.com",
  description: "Provides high quality Configure, Price & Quote (CPQ) consulting services for the world’s largest enterprises. Contributed to CirrusCPQs various projects. Technologies used: Angular, Node / Express, Mongo."
}, {
  name: "GetHuman",
  person: "Tyler",
  img: require("../assets/gethuman.png"),
  url: "https://gethuman.com/",
  description: "Features customer service reviews, database of company phone numbers that reach human customer service reps, and a weblog. Contributed to GetHuman.com. Technologies used: Angular, Node / Express."
} ];

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