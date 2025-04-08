import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      const exists = state.favoriteMovies.includes(movieId);

      if (exists) {
        state.favoriteMovies = state.favoriteMovies.filter(
          (id) => id !== movieId
        );
      } else {
        state.favoriteMovies.push(movieId);
      }

      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies)
      );
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoriteMovies = (state) => state.favorites.favoriteMovies;

export default favoritesSlice.reducer;
