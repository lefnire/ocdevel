import React from 'react';
import Jumbotron from './Jumbotron';
import stix2 from '../assets/stix2.png';

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<Jumbotron title="OCDevel"/>
				<img className="stick" src={stix2} />
				<h1 className="Welcome">Welcome to the portfolio page of</h1>
				<h2 className="Names"> Tyler & Lisa Renelle</h2>
			</div>
		);
	}
}

