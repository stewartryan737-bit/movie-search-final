import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img className="movie-card__img" src={movie.Poster} alt={movie.Title} />
      <h2 className="movie-card__title">{movie.Title}</h2>
      <p className="movie-card__year">{movie.Year}</p>
    </div>
  );
}

export default MovieCard;