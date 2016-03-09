import React from 'react';
import ContactForm from './ContactForm';
import Jumbotron from './Jumbotron';
import PortfolioList from './PortfolioList';


export default class Lisa extends React.Component {

  constructor() {
    super();
    this.lisa = [{
      name: "TheWanderingBackpackers",
      img: "Lisa/WanderingBackpackers.png",
      url: "https://thewanderingbackpackers.com",
      description: "A wordpress blog for our travels."
    }];
  }

  render() {
    return (
      <div>
        <Jumbotron title="Lisa" />
        <PortfolioList items={this.lisa} />
        <ContactForm />
      </div>
    );
  }
}
