import React from 'react';
import './MovieThumb.css';

const MovieThumb = props => {
  return(
    <div className='rmdb-moviethumb'>
      <img src={props.image} alt={props.movieName}/>
    </div>
  )
}

export default MovieThumb;
