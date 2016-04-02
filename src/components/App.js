import React from 'react';
import { Parallax, Background } from 'react-parallax';

import Contact from './Contact';
import Jumbotron from './Jumbotron';
import Portfolio from './Portfolio';


export default class App extends React.Component {
  render() {
    return (
      <div>
          <Jumbotron title="OCDevel" className="ocdevel">
            <img className='head-image' src={images.cathead} />
            <p className="Dictionary img-rounded">ocdevel; [O-C-Devel]<br/>
              (noun)\<br/>
              1.orange cat development <br/> 2. developed by tyler renelle in 2009. <br/>
              3. web & mobile app development by a married duo with a profound love for programming.<br/>
              4. specializing in javascript, react, ionic, angular, python, and node.</p>
          </Jumbotron>

        <Parallax bgImage={images.bird} strength={400} log={true}>
          <div>
            <img className="stick" src={images.stix2} />
            <h1 className="Welcome">Web and Mobile Development by</h1>
            <h2 className="Names"> Tyler & Lisa Renelle</h2>
          </div>
        </Parallax>

        <Portfolio />

        <Parallax bgImage={images.bgImage} strength={400} log={true}>
        <Jumbotron title="Tyler Renelle" />
        <img className='head-image' src={images.tylerHead} />
        <ul className="social-buttons">
          <li><i href="https://www.facebook.com/lefnire" className="zocial facebook icon">Facebook</i></li>
          <li><i href="https://www.linkedin.com/in/lefnire" className="zocial linkedin icon">LinkedIn</i></li>
          <li><i href="https://twitter.com/lefnire" className="zocial twitter icon">Twitter</i></li>
          <li><i href="https://github.com/lefnire" className="zocial github icon">Github</i></li>
        </ul>
        </Parallax>
        <p className="description">Tyler is a full-stack Senior JavaScript developer and has spent 10 years in web & mobile. He is focused on Node,
          React / React Native, and Angular / Ionic. He is the also creator of HabitRPG, a startup begun on Kickstarter which now has
          800k+ users. Tyler built an enterprise PDF-creation service employed by 1.5k sites, and websites for clients such as Adidas,
          BigFix, and UCSF. Currently obsessed with machine learning, he labels himself a "bonafide singularitarian".
          Available starting April for remote work in React, Angular / Ionic, Node, and/or Python.</p>


        <Parallax bgImage={images.bgOCD} strength={400} log={true}>
          <Jumbotron title="Lisa Renelle" />
          <img className='head-image' src={images.lisaHead} />
          <ul className="social-buttons">
            <li><i target='_blank' href="https://www.facebook.com/lisa.haskellbunker" className="zocial facebook icon"/></li>
            <li><i target='_blank' href="https://www.linkedin.com/in/lisa-renelle-243413106" className="zocial linkedin icon"/></li>
            <li><i target='_blank' href="https://github.com/LisaMarie7073" className="zocial github icon"/></li>
            <li><i target='_blank' href="https://www.pinterest.com/lillisamhaskell/" className="zocial pinterest icon"/></li>
          </ul>
        </Parallax>
          <p className="description">Lisa is a front-end, Junior JavaScript developer and been in the working with javascript for almost a year. She has currently been
            focusing on React. Lisa has worked 11 years in the medical field and would love to combine her knowledge in medical and programming one day.
            Lisa is available starting April for remote work in React and Javascript.</p>

        <Parallax bgImage={images.oregon} strength={400} log={true}>
          <div>
            <Contact />
            <p className="kari">Photography by the talented <a href="https://www.kariannphotography.com">Kari Ann Haskell.</a>
              <br/> Also, thank you <a href="https://www.myfreetextures.com">myfreetextures.com.</a></p>
          </div>
        </Parallax>

      </div>
    );
  }
}

let images = {
  bird: require('../assets/moss.jpg'),
  bgOCD: require('../assets/Background-OCD.jpg'),
  bgImage: require('../assets/water.png.jpg'),
  oregon: require('../assets/oregon.jpg'),
  stix2: require('../assets/stix2.png'),
  lisaHead: require('../assets/Lisa/lisahead2.png'),
  tylerHead: require('../assets/Tyler/tylerhead.png'),
  cathead: require('../assets/cat.png'),
  cpq: require('../assets/CPQ.png')
};

