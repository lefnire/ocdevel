import React from 'react';

export default class Home extends React.Component {

	constructor(){
		super();
		this.state = {
			hover: null
		};
		this.lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
	}

	render() {
		return (
			<div>
				<div className='row front'>
					<div className='col-md-6 lisa' onMouseEnter={ ()=>this.setState({hover:'lisa'}) }>
						{
							this.state.hover === 'tyler' ?
								<div className="personal-details">
									<h2>Tyler Renelle</h2>
									<p>{this.lorem}</p>
								</div>
								: null
						}
					</div>
					<div className='col-md-6 tyler' onMouseEnter={ ()=>this.setState({hover:'tyler'}) }>
						{
							this.state.hover === 'lisa' ?
								<div className="personal-details">
									<h2>Lisa Renelle</h2>
									<p>{this.lorem}</p>
								</div>
								: null
						}
					</div>
				</div>
			</div>
		);
	}
}