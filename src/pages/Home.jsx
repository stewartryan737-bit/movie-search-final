import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



function Home() {
  const [movies, setMovies] = useState([]);
  const {id} = useParams();

  async function fetchMovies() {
    const {data} = await axios.get("https://www.omdbapi.com/?s=avengers&apikey=f2f5394e");
    setMovies(data.Search);
    console.log(data);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;