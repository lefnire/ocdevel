import React from 'react';


export default class Portfolio extends React.Component {

  constructor() {
    super();
    this.portfolio = [
      {
        name:"Habitica",
        img: "/portfolio/habitica.png",
        url: "https://habitica.com",
        description: "A gamified habit-improvement app (web & mobile) w/ 800k+ users, ~$40k/m. I started this as a Kickstarter campaign which blew up to a multi-employee startup. Angular, Ionic, Node/Express, MongoDB, AWS."
      },
      {
        name: "Jobpig",
        img: "/portfolio/jobpig.png",
        url: "http://jobpigapp.com",
        description: "A Pandora-like job finding website."
      },
      {
        name: "Flashdrinks",
        img: "/portfolio/flashdrinks.png",
        url: "https://flashdrink.firebaseapp.com",
        description: "Web & mobile mobile app for finding nearby drinking partners."
      },
      {
        name: "Indianchief Travel",
        img: "/portfolio/IndianChiefTravel1.png",
        url: "http://indianchieftravel.com/",
        description: ""
      }
    ];
  }

  jumbotron() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Our projects</h1>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.jumbotron()}
        <div className='row'>
          {
            this.portfolio.map(item =>
              <div className="col-md-4">
                <h4><a href={item.url}>{item.name}</a></h4>
                <img className='portfolio-image' src={item.img} target='_blank'/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
