import React from 'react';
import Jumbotron from './Jumbotron';
import Portfolio from './Portfolio';
import lisaHead from '../assets/Lisa/lisahead2.png';

const portfolio = [{
  name: "TheWanderingBackpackers",
  img: require("../assets/Lisa/WanderingBackpackers.png"),
  url: "http://thewanderingbackpackers.com/",
  description: "A Wordpress blog for our travels."
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
}];

export default class Lisa extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron title="Lisa Renelle" />
        <img className='head-image' src={lisaHead} />
        <ul className="social-buttons">
          <li><i target='_blank' href="https://www.facebook.com/lisa.haskellbunker" className="zocial facebook icon"/></li>
          <li><i target='_blank' href="https://www.linkedin.com/in/lisa-renelle-243413106" className="zocial linkedin icon"/></li>
          <li><i target='_blank' href="https://github.com/LisaMarie7073" className="zocial github icon"/></li>
          <li><i target='_blank' href="https://www.pinterest.com/lillisamhaskell/" className="zocial pinterest icon"/></li>
        </ul>
        <p className="description">Lisa is a front end JavaScript developer and been in the working with javascript for almost a year. She has currently been
          focusing on React. Lisa has worked 11 years in the medical field and would love to combine her knowledge in medical and programming one day.
          Lisa is available starting April for remote work in React and Javascript.</p>
        <hr/>
        <Portfolio items={portfolio} />
      </div>
    );
  }
}
