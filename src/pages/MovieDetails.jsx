import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posterUnavailable, setPosterUnavailable] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!imdbID) {
        setMovie(null);
        setError("Movie ID is missing.");
        return;
      }

      setLoading(true);
      setError("");
      setMovie(null);
      setPosterUnavailable(false);

      try {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=f2f5394e`,
        );

        if (data.Response === "False") {
          setError(data.Error || "Movie not found.");
        } else {
          setMovie(data);
        }
      } catch {
        setError("Could not fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [imdbID]);

  return (
    <div className="movie-details__container">
      <div className="movie-details__back">
        <Link to="/" className="movie-details__back-link">
          Back to Home
        </Link>
      </div>

      {loading ? (
        <p>Loading movie details...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : movie ? (
        <article className="movie-details__content">
          <div className="movie-details__poster--wrapper">
            {movie.Poster && movie.Poster !== "N/A" && !posterUnavailable ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="movie-details__poster"
                onError={() => setPosterUnavailable(true)}
              />
            ) : (
              <div className="movie-details__poster-placeholder">
                Poster unavailable
              </div>
            )}
          </div>

          <div className="movie-details__text--wrapper">
            <div className="movie-details__info">
              <p>{movie.Type}</p>
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__year">
                {movie.Year} | {movie.Runtime} | {movie.Rated}
              </p>
              <p>{movie.Plot}</p>
            </div>
            <div className="movie-details__detail">
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}

export default MovieDetails;
