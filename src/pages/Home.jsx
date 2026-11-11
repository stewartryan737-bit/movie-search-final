import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {id} = useParams();
  const [search, setSearch] = useState([id]);
  const [query, setQuery] = useState("");

   useEffect(() => {
    if(!query) {
      return;
    }

  
    fetchMovies();
  }, [query]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
  };

  // const trimmedSearch = search.trim();
  // if(!trimmedSearch) {
  //   return;
  // }

  async function fetchMovies() {
    setLoading(true);
    const {data} = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=f2f5394e`);
    setMovies(data.Search);
    console.log(data);
    setLoading(false);
  }

 

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      <p>Submitted search: {query}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", flex: "1", flexWrap: "wrap", gap: "20px" }}>
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
  );
}

export default Home;