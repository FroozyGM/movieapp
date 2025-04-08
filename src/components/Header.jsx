import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSun, FiMoon, FiSearch, FiHeart } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import { selectFavoriteMovies } from "../store/favoritesSlice";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const favoriteMovies = useSelector(selectFavoriteMovies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Movie App
          </Link>

          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/popular"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Popular
            </NavLink>
            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FiHeart style={{ marginRight: "4px" }} />
              Favorites{" "}
              {favoriteMovies.length > 0 && `(${favoriteMovies.length})`}
            </NavLink>
          </nav>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FiSearch />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
