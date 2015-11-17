import React from 'react';

export default class Portfolio extends React.Component {
  render(){
    var portfolio = [
      {name:"HabitRPG", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
      {name:"Dynamk", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
      {name:"HabitRPG", url:'https://habitica.com', img: '/portfolio/habitrpg.png'},
    ];

    return (
      <div>
        <h1 className="heading">Portfolio Page</h1>
        <div className='row'>
          {portfolio.map(function(item){
            return <div className='col-md-4'>
              <h4><a href={item.url}>{item.name}</a></h4>
              <img src={item.img} target='_blank'/>
            </div>
          })}
        </div>
      </div>
    );
  }
}
