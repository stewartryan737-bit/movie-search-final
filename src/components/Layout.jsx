import Nav from "./Nav";
import Footer from "./Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const Layout = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  return (
    <>
      <Nav setMovies={setMovies} setLoading={setLoading} setError={setError} />
      <Outlet context={{ movies, loading, error }} />
      <Footer />
    </>
  );
}

export default Layout;