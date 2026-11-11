import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";


  function App() {
  return (
    <div className="app">
     

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

    
    </div>
  );
}
export default App;