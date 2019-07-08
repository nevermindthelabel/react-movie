import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/reactMovie_logo.png';
import TMDBLogo from '../../../images/tmdb_logo.png';
import './Header.css';

const Header = () => {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img className="rmdb-logo" src={Logo} alt="rmdb logo" />
        </Link>
        <a href="https://www.themoviedb.org/">
          <img src={TMDBLogo} alt="tmdb logo" className="rmdb-tmdb-logo" />
        </a>
      </div>
    </div>
  );
};

export default Header;
