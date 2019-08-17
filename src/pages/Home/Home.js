import React, { useState, useEffect } from 'react';
import HeroImage from '../../components/elements/HeroImage/HeroImage';
import SearchBar from '../../components/elements/SearchBar/SearchBar';
import FourColGrid from '../../components/elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../../components/elements/LoadMoreBtn/LoadMoreBtn';
import { API_KEY, URL, BACKDROP_SIZE, POSTER_SIZE, IMAGE_URL } from '../../config';
import MovieThumb from '../../components/elements/MovieThumb/MovieThumb';
import Spinner from '../../components/elements/Spinner/Spinner';
import './Home.css';

const popularMovies = `${URL}movie/popular?api_key=${API_KEY}&page=1`;

const Home = () => {
  const [state, setState] = useState({ movies: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMovies = async endpoint => {
    setIsError(false);
    setIsLoading(true);
    // use URL search params to get search params
    const params = new URLSearchParams(endpoint);
    if (!params.get('page')) {
      setState(prev => ({
        ...prev,
        movies: [],
        searchTerm: params.get('query')
      }));
    }
    try {
      const result = await (await fetch(endpoint)).json();
      setState(prev => ({
        ...prev,
        movies: [...prev.movies, ...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }));
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovies(`${popularMovies}`);
  }, []);

  const searchItems = searchTerm => {
    let endpoint = `${URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    if (!searchTerm) {
      endpoint = popularMovies;
    }
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    const { searchTerm, currentPage } = state;
    let endpoint = '';
    if (!searchTerm) {
      endpoint = `${URL}movie/popular?api_key=${API_KEY}&page=${currentPage + 1}`;
    } else {
      endpoint = `${URL}search/movie?api_key=${API_KEY}&query=${
        searchTerm
      }&page=${currentPage + 1}`;
    }
    fetchMovies(endpoint);
  };

  const { heroImage, searchTerm, movies, currentPage, totalPages } = state;
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
      <SearchBar callback={searchItems} />
      <div className="rmdb-home-grid">
        <FourColGrid
          header={searchTerm ? 'Search Result' : 'Popular Movies'}
          loading={isLoading}
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
        {isLoading ? <Spinner /> : null}
        {currentPage < totalPages && !isLoading ? (
          <LoadMoreBtn text="Load More" onClick={loadMoreMovies} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
