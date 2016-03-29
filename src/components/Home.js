import React from 'react';
import Jumbotron from './Jumbotron';
import stix2 from '../assets/stix2.png';

export default class Home extends React.Component {

	constructor() {
		super();
		this.state = {
			hover: null
		};
		this.lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
	}

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

