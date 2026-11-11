import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import fesLogo from "../assets/fes-logo.png";

function Nav() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const { id } = useParams();
  const [search, setSearch] = useState([id]);

      async function fetchMovies() {
        setLoading(true);
        const { data } = await axios.get(
          `https://www.omdbapi.com/?s=${search}&apikey=f2f5394e`,
        );
        setMovies(data.Search);
        console.log(data);
        setLoading(false);
      }

useEffect(() => {
  if (!id) return;

  setSearch(id);

  async function loadMovies() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(id)}&apikey=f2f5394e`
      );
      setMovies(data.Search ?? []);
    } finally {
      setLoading(false);
    }
  }

  loadMovies();
}, [id]);

  return (
    <div className="nav">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies();
        }}
      >
        <input
          className="search-form__input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies..."
        />
        <button className="search-form__button" type="submit">Search</button>
      </form>
      <div className="logo">
        <img className="logo__img" src={fesLogo} alt="Logo" />
      </div>
      <h1 className="logo__title">Simplified</h1>
     <div className="movies">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {movies.map((movie) => (
              <div key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
