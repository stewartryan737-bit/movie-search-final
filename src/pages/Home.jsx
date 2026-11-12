import { useState } from "react";
import MovieCard from "../components/MovieCard";

function Home({ movies, loading, error }) {
  const [sort, setSort] = useState("");

  const sortedMovies = [...movies];
  if (sort === "title") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sort === "year") {
    sortedMovies.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
  }

  return (
    <div className="main">
      <div className="controls">
        <label>
          Sort by:
          <select id="sortSelect" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="title">Title</option>
            <option value="year">Newest year</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <div className="movies-grid">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

