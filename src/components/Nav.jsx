import React from "react";
import { useState } from "react";
import axios from "axios";
import fesLogo from "../assets/fes-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Nav({ setMovies, setLoading, setError }) {
  const [search, setSearch] = useState("");

  async function fetchMovies() {
  if (!search.trim()) return;

  setLoading(true);
  setError("");

  try {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=f2f5394e`
    );

    if (data.Response === "False") {
      setMovies([]);
      setError(data.Error);
    } else {
      setMovies(data.Search);
    }
  } catch {
    setMovies([]);
    setError("Could not fetch movies. Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
  <>
    <div className="nav">
      <div className="logo">
        <img className="logo__img" src={fesLogo} alt="Logo" />
        <h1 className="logo__title" >Simplified</h1>
      </div>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies();
        }}
      >
        <div className="search-form__group">
          <input
            className="search-form__input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for movies..."
          />
          <button className="search-form__button" type="submit" aria-label="Search">
            <FontAwesomeIcon className="search-form__icon" icon={faSearch} />
          </button>
        </div>
      </form>

      
    </div>
    </>
  );
}

export default Nav;
