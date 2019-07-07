require("dotenv").config();

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;
const IMAGE_URL = 'http://image.tmdb.org/t/p/'
const BACKDROP_SIZE = 'w1280';
const POSTER_SIZE = 'w500';

export {
  URL,
  API_KEY,
  IMAGE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
}
