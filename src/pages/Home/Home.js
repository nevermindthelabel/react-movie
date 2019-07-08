import React from 'react';
import HeroImage from '../../components/elements/HeroImage/HeroImage';
import SearchBar from '../../components/elements/SearchBar/SearchBar';
import FourColGrid from '../../components/elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../../components/elements/LoadMoreBtn/LoadMoreBtn';
import { API_KEY, URL, BACKDROP_SIZE, POSTER_SIZE, IMAGE_URL } from '../../config';
import MovieThumb from '../../components/elements/MovieThumb/MovieThumb';
import Spinner from '../../components/elements/Spinner/Spinner';
import './Home.css';
class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  };
  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
  }

  searchItems = searchTerm => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });
    if (searchTerm === '') {
      endpoint = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreMovies = () => {
    let endpoint = '';
    this.setState({ loading: true });
    if (this.state.searchTerm === '') {
      endpoint = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state
        .currentPage + 1}`;
    } else {
      endpoint = `${URL}search/move?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              title={this.state.heroImage.original_title}
              image={`${IMAGE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              text={this.state.heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={this.state.loading}
          >
            {this.state.movies.map((movie, i) => (
              <MovieThumb
                key={movie.id}
                clickable={true}
                image={
                  movie.poster_path
                    ? `${IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : './images/no_image.jpg'
                }
                movidId={movie.id}
                movieName={movie.original_title}
              />
            ))}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage <= this.state.totalPages && !this.state.loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreMovies} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
