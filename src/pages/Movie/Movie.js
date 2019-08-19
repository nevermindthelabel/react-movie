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
    const { movieId } = this.props.match.params;
    this.setState({ loading: true });
    // get the movie loaded
    const endpoint = `${URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { movieId } = this.props.match.params;
    try {
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        // make sure there is a valid response
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result });
        // put actors and directors in state with callback function
        const creditsEndpoint = `${URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        const directors = creditsResult.crew.filter(member => member.job === 'Director');
        this.setState({
          actors: creditsResult.cast,
          directors,
          loading: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { movie, actors, directors, loading } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
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
