import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { getPopularMovies, getTopRatedMovies } from "../api/tmdbApi";
import { useSelector } from "react-redux";
import { selectFavoriteMovies } from "../store/favoritesSlice";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favoriteMovieIds = useSelector(selectFavoriteMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [popularData, topRatedData] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
        ]);

        setPopularMovies(popularData.results.slice(0, 4));
        setTopRatedMovies(topRatedData.results.slice(0, 4));
        setError(null);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Welcome to Movie App</h1>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="page-title">Popular Movies</h2>
          <Link to="/popular" className="button">
            View All
          </Link>
        </div>
        <MovieList movies={popularMovies} loading={loading} error={error} />
      </section>

      <section style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="page-title">Top Rated Movies</h2>
          <Link to="/top-rated" className="button">
            View All
          </Link>
        </div>
        <MovieList movies={topRatedMovies} loading={loading} error={error} />
      </section>

      {favoriteMovieIds.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            backgroundColor: "rgba(233, 69, 96, 0.1)",
            borderRadius: "8px",
          }}
        >
          <p>
            You have {favoriteMovieIds.length} favorite movies! Check them out
            in your movie details.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
