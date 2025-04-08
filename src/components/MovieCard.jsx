import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavoriteMovies } from '../store/favoritesSlice';
import { getImageUrl } from '../api/tmdbApi';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const isFavorite = favoriteMovies.includes(movie.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(movie.id));
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img 
        src={movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/300x450?text=No+Image'} 
        alt={movie.title} 
        className="movie-poster" 
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
      </div>
      <div className="movie-rating">
        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
      </div>
      <button 
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FiHeart />
      </button>
    </Link>
  );
};

export default MovieCard;