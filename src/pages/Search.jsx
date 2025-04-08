import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import { searchMovies } from "../api/tmdbApi";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setError(null);
      } catch (err) {
        setError("Failed to search movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handleNewSearch = (newQuery) => {
    setPage(1);
    setSearchParams({ query: newQuery });
  };

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
      <h1 className="page-title">Search Results</h1>

      {query && (
        <h2 style={{ margin: "20px 0" }}>
          {loading ? "Searching for" : "Results for"}: "{query}"
        </h2>
      )}

      {query ? (
        <>
          <MovieList movies={movies} loading={loading} error={error} />

          {!loading && !error && movies.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                margin: "20px 0",
              }}
            >
              <button
                className="button"
                onClick={handlePrevPage}
                disabled={page === 1}
                style={{ opacity: page === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>
              <span style={{ padding: "8px 0" }}>
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
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <p>Use the search bar at the top to find movies.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
