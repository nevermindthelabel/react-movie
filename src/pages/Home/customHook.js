import { useState, useEffect } from 'react';
import { URL, API_KEY } from '../../config';

const popularMovies = `${URL}movie/popular?api_key=${API_KEY}`;

export const useFetchMovies = () => {
  const [state, setState] = useState({ movies: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async endpoint => {
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
      console.error(error);
    }
    setIsLoading(false);
  };

  // Run on app startup, replaces componentDidMount
  useEffect(() => {
    if (sessionStorage.getItem('SaveState')) {
      const state = JSON.parse(sessionStorage.getItem('SaveState'));
      setState({ ...state });
    } else {
      fetchMovies(`${popularMovies}`);
    }
  }, []);

  // save state to session storage
  useEffect(() => {
    if (!state.searchTerm) {
      sessionStorage.setItem('SaveState', JSON.stringify(state));
    }
  }, [state]);
  return ([{ state, isLoading }, fetchMovies])
};
