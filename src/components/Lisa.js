import React from 'react';
import ContactForm from './ContactForm';
import Jumbotron from './Jumbotron';
import PortfolioList from './PortfolioList';
import Heads from './Heads';


export default class Lisa extends React.Component {

  constructor() {
    super();
    this.lisa = [{
      name: "TheWanderingBackpackers",
      img: "Lisa/WanderingBackpackers.png",
      url: "http://thewanderingbackpackers.com/",
      description: "A Wordpress blog for our travels."
    },
{
      name: "Jobpig",
      img: "/Tyler/pig.png",
      url: "http://jobpigapp.com",
      description: "A Pandora-like job finding website."
},
{
      name: "Flashdrinks",
      img: "/Tyler/flashdrinkspic.png",
      url: "https://flashdrink.firebaseapp.com",
      description: "Web & mobile mobile app for finding nearby drinking partners."
}
    ];
  }

  render() {
    return (
      <div>
        <Jumbotron title="Lisa Renelle" />
        <Heads img="/Lisa/lisahead2.png" />
        <hr/>
        <p className="description">Lisa is a front end JavaScript developer and been in the working with javascript for almost a year. She has currently been
          focusing on React. Lisa has worked 11 years in the medical field and would love to combine her knowledge in medical and programming one day.
          Lisa is available starting April for remote work in React and Javascript.</p>
        <hr/>
        <PortfolioList items={this.lisa} />
        <hr/>
        <ul className="social-buttons">
          <li><a className="buttonfacebook" href="https://www.facebook.com/lisa.haskellbunker" className="zocial facebook">Facebook</a></li>
          <li><a className="buttonlinedin" href="https://www.linkedin.com/in/lisa-renelle-243413106?trk=nav_responsive_tab_profile_pic" className="zocial linkedin">LinkedIn</a></li>
          <li><a className="buttongithub" href="https://github.com/LisaMarie7073" className="zocial github">Github</a></li>
        </ul>
          <ContactForm />
      </div>
    );
  }
}
