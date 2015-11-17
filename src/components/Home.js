import React from 'react';

export default class Home extends React.Component {
	render(){
		return (
			<div>
				<h1 className="heading">The Portfolio Of</h1>

				<div className='row front'>
					<div className='col-md-6 lisa'>
						<h2>Lisa Renelle</h2>
						<p>Lisa was a nurse now a coder bla bla bla</p>
					</div>
					<div className='col-md-6 tyler'>
						<h2>Tyler Renelle</h2>
						<p>Tyler made habitrpg bla bla bla</p>
					</div>
				</div>
			</div>
		);
	}
}
