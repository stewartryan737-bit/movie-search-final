import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:imdbID", element: <MovieDetails /> }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
