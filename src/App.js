import { useState } from "react";
import "./index.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <Nav
        setMovies={setMovies}
        setLoading={setLoading}
        setError={setError}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} loading={loading} error={error} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;