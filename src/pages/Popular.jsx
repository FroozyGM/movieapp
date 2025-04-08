import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { getPopularMovies } from '../api/tmdbApi';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB API limits to 500 pages max
        setError(null);
      } catch (err) {
        setError('Failed to fetch popular movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Popular Movies</h1>
      <MovieList movies={movies} loading={loading} error={error} />
      
      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
          <button 
            className="button" 
            onClick={handlePrevPage} 
            disabled={page === 1}
            style={{ opacity: page === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ padding: '8px 0' }}>
            Page {page} of {totalPages}
          </span>
          <button 
            className="button" 
            onClick={handleNextPage} 
            disabled={page === totalPages}
            style={{ opacity: page === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Popular;