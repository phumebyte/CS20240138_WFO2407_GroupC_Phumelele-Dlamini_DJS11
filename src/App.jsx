import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import ShowNavigation from "./pages/ShowNavigation";
import Genres from "./pages/Genres"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/shows/:id" element={<ShowNavigation />} />
          <Route path="genres/" element={<Genres/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


