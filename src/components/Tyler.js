import React from 'react';
import ContactForm from './ContactForm';
import Jumbotron from './Jumbotron';
import PortfolioList from './PortfolioList';

export default class Tyler extends React.Component {

  constructor() {
    super();
    this.tyler = [
      {
        name:"Habitica",
        img: "/Tyler/habitica.png",
        url: "https://habitica.com",
        description: "A gamified habit-improvement app (web & mobile) w/ 800k+ users, ~$40k/m. I started this as a Kickstarter campaign which blew up to a multi-employee startup. Angular, Ionic, Node/Express, MongoDB, AWS."
      },
      {
        name: "Jobpig",
        img: "/Tyler/jobpig.png",
        url: "http://jobpigapp.com",
        description: "A Pandora-like job finding website."
      },
      {
        name: "Flashdrinks",
        img: "/Tyler/flashdrinks.png",
        url: "https://flashdrink.firebaseapp.com",
        description: "Web & mobile mobile app for finding nearby drinking partners."
      },
      {
        name: "Indianchief Travel",
        img: "/Tyler/IndianChiefTravel1.png",
        url: "http://indianchieftravel.com/",
        description: ""
      }
    ];
  }


  render() {
    return (
      <div>
        <Jumbotron title="Tyler's Projects" />
      <PortfolioList items={this.tyler}/>
      <ContactForm />
      </div>
    );
  }
}
