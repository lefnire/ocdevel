import React from 'react';

export default class PortfolioList extends React.Component {

  render() {

    return (
      <div className='row'>
        {
          this.props.items.map(item =>
            <div className="col-md-4">
              <h4><a href={item.url} target='_blank'>{item.name}</a></h4>
              <img className='lisa-image' src={item.img}/>
            </div>
          )
        }
      </div>
    );
  }

}