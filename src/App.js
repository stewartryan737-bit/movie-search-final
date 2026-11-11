import "./index.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";


  function App() {
  return (
    <div className="app">
     <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

    
    </div>
  );
}
export default App;