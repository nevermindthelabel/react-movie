import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img className="rmdb-logo" src="./images/reactMovie_logo.png" alt="rmdb logo" />
        </Link>
        <a href="https://www.themoviedb.org/">
          <img src="./images/tmdb_logo.png" alt="tmdb logo" className="rmdb-tmdb-logo" />
        </a>
      </div>
    </div>
  );
};

export default Header;
