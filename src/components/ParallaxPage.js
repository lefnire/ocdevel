import React from 'react';
import { Parallax, Background } from 'react-parallax';

import bgOCD from '../assets/Background-OCD.jpg';
import bgImage from '../assets/BackgroundImage.jpg';

import Home from './Home.js';
import Lisa from './Lisa.js';
import Tyler from './Tyler.js';
import Contact from './Contact';

export default class ParallaxPage extends React.Component {
  render() {
    return (
      <div>

        <Parallax bgImage={bgOCD} strength={400} log={true}>
          <Home />
        </Parallax>

        <Tyler />

        <Parallax bgImage={bgImage} strength={400} log={true}>
          <Lisa />
        </Parallax>

        <Contact />

      </div>
    );
  }


}