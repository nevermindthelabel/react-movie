import React, { Component } from 'react';
import { URL, API_KEY } from '../../config';
import Navigation from '../../components/elements/Navigation/Navigation';
import MovieInfo from '../../components/elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../../components/elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../../components/elements/FourColGrid/FourColGrid';
import Actor from '../../components/elements/Actor/Actor';
import Spinner from '../../components/elements/Spinner/Spinner';
import './Movie.css';
class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const state = JSON.parse(`${this.props.match.params.movieId}`);
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      // get the movie loaded
      const endpoint = `${URL}movie/${
        this.props.match.params.movieId
      }?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }
  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          // make sure there is a valid response
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            // put actors and directors in state with callback function
            const endpoint = `${URL}movie/${
              this.props.match.params.movieId
            }/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(member => member.job === 'Director');
                this.setState(
                  {
                    actors: result.cast,
                    directors,
                    loading: false
                  },
                  () => {
                    localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                  }
                );
              });
          });
        }
      })
      .catch(error => console.error(`Error: ${error.message}`));
  };

  render() {
    const { movie, actors, directors, loading } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </div>
        ) : null}
        {actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={'Actors'}>
              {actors.map((actor, index) => {
                return <Actor key={index} actor={actor} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!actors && !loading ? <h1>No Movie Found!</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
