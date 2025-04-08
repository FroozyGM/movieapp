import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import "./assets/css/style.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/top-rated" element={<TopRated />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer
            style={{
              textAlign: "center",
              padding: "20px",
              marginTop: "40px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <p>Movie App &copy; {new Date().getFullYear()}</p>
            <p style={{ fontSize: "0.8rem", marginTop: "5px" }}>
              Powered by TMDB API
            </p>
          </footer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
