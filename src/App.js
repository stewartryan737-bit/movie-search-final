import { useState } from "react";
import "./index.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <Layout
        setMovies={setMovies}
        setLoading={setLoading}
        setError={setError}
      >
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} loading={loading} error={error} />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;