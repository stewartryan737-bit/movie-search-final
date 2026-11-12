import Nav from "./Nav";

function Layout({ children, setMovies, setLoading, setError }) {
  return (
    <div className="layout">
      <Nav
        setMovies={setMovies}
        setLoading={setLoading}
        setError={setError}
      />
      <main>{children}</main>
    </div>
  );
}

export default Layout;