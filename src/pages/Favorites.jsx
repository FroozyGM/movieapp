import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectFavoriteMovies } from "../store/favoritesSlice";
import MovieList from "../components/MovieList";
import { getMovieDetails } from "../api/tmdbApi";

const Favorites = () => {
  const favoriteMovieIds = useSelector(selectFavoriteMovies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteMovieIds.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const moviesPromises = favoriteMovieIds.map((id) =>
          getMovieDetails(id)
        );
        const movies = await Promise.all(moviesPromises);
        setFavoriteMovies(movies);
        setError(null);
      } catch (err) {
        setError("Failed to fetch favorite movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovieIds]);

  return (
    <div className="container">
      <h1 className="page-title">Your Favorite Movies</h1>

      {favoriteMovieIds.length === 0 && !loading ? (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <p>You haven't added any movies to your favorites yet.</p>
          <p>Browse movies and click the heart icon to add them here!</p>
        </div>
      ) : (
        <MovieList movies={favoriteMovies} loading={loading} error={error} />
      )}
    </div>
  );
};

export default Favorites;
