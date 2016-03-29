import React from 'react';
import Jumbotron from './Jumbotron';
import Portfolio from './Portfolio';
import tylerHead from '../assets/Tyler/tylerhead.png';

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
  name: "Indianchief Travel",
  img: require("../assets/Tyler/indianchieftravelpic.jpg"),
  url: "http://indianchieftravel.com/",
  description: ""
}];

export default class Tyler extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron title="Tyler Renelle" />
        <img className='head-image' src={tylerHead} />
        <ul className="social-buttons">
          <li><i href="https://www.facebook.com/lefnire" className="zocial facebook icon">Facebook</i></li>
          <li><i href="https://www.linkedin.com/in/lefnire" className="zocial linkedin icon">LinkedIn</i></li>
          <li><i href="https://twitter.com/lefnire" className="zocial twitter icon">Twitter</i></li>
          <li><i href="https://github.com/lefnire" className="zocial github icon">Github</i></li>
        </ul>
        <p className="description">Tyler is a full Stack JavaScript developer and has spent 10 years in web & mobile. He is focused on Node,
          React / React Native, and Angular / Ionic. He is the also creator of HabitRPG, a startup begun on Kickstarter which now has
          800k+ users. Tyler built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients such as Adidas,
          BigFix, and UCSF. Currently obsessed with machine learning, he labels himself a "bonafide singularitarian".
          Available starting April for remote work in React, Angular / Ionic, Node, and/or Python.</p>
        <hr/>
        <Portfolio items={portfolio}/>
      </div>
    );
  }
}
