import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiCalendar, FiStar, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { getMovieDetails, getImageUrl } from '../api/tmdbApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavoriteMovies } from '../store/favoritesSlice';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const isFavorite = favoriteMovies.includes(parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(parseInt(id)));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container">
        <div className="error-message">
          {error || 'Movie not found.'}
          <button className="button" style={{ marginLeft: '10px' }} onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button 
        className="back-button" 
        onClick={handleGoBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '20px 0',
          padding: '10px 15px',
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--primary-color)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent-color)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <FiArrowLeft /> Back to Previous Page
      </button>

      <div className="movie-details">
        <img
          src={movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="movie-poster-large"
        />

        <div className="movie-info-detailed">
          <h1 className="movie-title-large">{movie.title}</h1>
          
          {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}
          
          <div className="movie-metadata">
            {movie.release_date && (
              <div className="metadata-item">
                <FiCalendar />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            )}
            
            {movie.runtime > 0 && (
              <div className="metadata-item">
                <FiClock />
                <span>{movie.runtime} min</span>
              </div>
            )}
            
            {movie.vote_average > 0 && (
              <div className="metadata-item">
                <FiStar />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
            
            <button 
              className={`metadata-item ${isFavorite ? 'active' : ''}`} 
              onClick={handleToggleFavorite}
              style={{ 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer',
                color: isFavorite ? '#e94560' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                backgroundColor: isFavorite ? 'rgba(233, 69, 96, 0.1)' : 'transparent'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isFavorite 
                  ? 'rgba(233, 69, 96, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isFavorite 
                  ? 'rgba(233, 69, 96, 0.1)' 
                  : 'transparent';
              }}
            >
              <FiHeart />
              <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
            </button>
          </div>
          
          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          
          {movie.overview && (
            <>
              <h3 style={{ marginBottom: '8px' }}>Overview</h3>
              <p className="movie-overview">{movie.overview}</p>
            </>
          )}
          
          <div>
            <h3 style={{ marginBottom: '8px' }}>Additional Information</h3>
            <p>Original Language: {movie.original_language}</p>
            {movie.budget > 0 && (
              <p>Budget: ${movie.budget.toLocaleString()}</p>
            )}
            {movie.revenue > 0 && (
              <p>Revenue: ${movie.revenue.toLocaleString()}</p>
            )}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <p>
                Production: {movie.production_companies.map(company => company.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;