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
    })
    if (searchTerm === '') {
      endpoint = `${URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
    }
    this.fetchItems(endpoint)
  }


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
            <SearchBar />
          </div>
        ) : null}
        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
        Home
      </div>
    );
  }
}

export default Home;
