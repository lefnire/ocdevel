import React from 'react';
import { Link  } from 'react-router-dom';

export const Header = () => (
  <header className='header'>
    <div className='content-container'>
      <div className='header__content'>
        <Link className='header__title' to="/dashboard">
          <img src="/images/OCDevel-logo-white-75.png" alt="OCDevel Logo" />
        </Link>
        <Link className='link' to='/'>
          <span> Machine Learning Podcast</span>
        </Link>
      </div>
    </div>
  </header>
)

export default Header;
