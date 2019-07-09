import React, { Component } from 'react';
import { URL, API_KEY } from '../../config';
import Navigation from '../../components/elements/Navigation/Navigation';
import MovieInfo from '../../components/elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../../components/elements/MovieInfo/MovieInfoBar';
import FourColGrid from '../../components/elements/FourColGrid/FourColGrid';
import Actor from '../../components/elements/Actor/Actor';
import Spinner from '../../components/elements/Spinner/Spinner';
import './Movie.css'
class Movie extends Component {
  state = {

  }
  render() {
    return (
      <div>
        Movie
      </div>
    )

  }
}

export default Movie;
