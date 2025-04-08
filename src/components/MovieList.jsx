import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="error-message">No movies found</div>;
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
