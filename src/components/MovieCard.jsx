import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, skeleton }) {
  if (skeleton) {
    return (
      <div className="movie-card movie-card--skeleton">
        <div className="movie-card__img--skeleton">
          <h2 className="movie-card__title--skeleton">Loading...</h2>
          <p className="movie-card__year--skeleton"></p>
          <span className="button button--secondary">View Details</span>
        </div>
      </div>
    );
  }

  const posterUnavailable = !movie.Poster || movie.Poster === "N/A";
  return (
    <Link to={`/movie/${encodeURIComponent(movie.imdbID)}`} className="movie-card">
      {posterUnavailable ? (
        <div className="movie-card__poster-placeholder">Poster unavailable</div>
      ) : (
        <img className="movie-card__img" src={movie.Poster} alt={movie.Title} />
      )}
      <div className="movie-card__content">
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__year">{movie.Year}</p>
        <span className="button button--secondary">View Details</span>
      </div>
    </Link>
  );
}

export default MovieCard;