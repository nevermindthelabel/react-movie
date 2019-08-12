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
    // check for state in local storage
    if (localStorage.getItem('CurrentState')) {
      const state = JSON.parse(localStorage.getItem('CurrentState'));
      this.setState({ ...state });
    } else {
      // if no movies already in state, make API call to get them
      this.setState({ loading: true });
      const endpoint = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
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
      endpoint = `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  // added async/await
  fetchItems = async endpoint => {
    const { movies, heroImage, searchTerm } = this.state;
    const result = await (await fetch(endpoint)).json();
    try {
      this.setState(
        {
          movies: [...movies, ...result.results],
          heroImage: heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        },
        // Callback function to add stringified version of state into local storage
        () => {
          // Don't save a search in local storage
          if (searchTerm === '') {
            localStorage.setItem('CurrentState', JSON.stringify(this.state));
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // fetchItems = endpoint => {
  //   fetch(endpoint)
  //     .then(result => result.json())
  //     .then(result => {
  //       this.setState(
  //         {
  //           movies: [...this.state.movies, ...result.results],
  //           heroImage: this.state.heroImage || result.results[0],
  //           loading: false,
  //           currentPage: result.page,
  //           totalPages: result.total_pages
  //         },
  //         // Callback function to add stringified version of state into local storage
  //         () => {
  //           // Don't save a search in local storage
  //           if (this.state.searchTerm === '') {
  //             localStorage.setItem('CurrentState', JSON.stringify(this.state));
  //           }
  //         }
  //       );
  //     })
  //     .catch(error => console.error('Error', error));
  // };

  render() {
    // ES6 destructuring state
    const { heroImage, movies, loading, currentPage, totalPages, searchTerm } = this.state;
    return (
      <div className="rmdb-home">
        {heroImage && !searchTerm ? (
          <div>
            <HeroImage
              title={heroImage.original_title}
              image={`${IMAGE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              text={heroImage.overview}
            />
          </div>
        ) : null}
        <SearchBar callback={this.searchItems} />
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map((movie, i) => (
              <MovieThumb
                key={movie.id}
                clickable={true}
                image={
                  movie.poster_path
                    ? `${IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : './no_image.jpg'
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages && !loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreMovies} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
