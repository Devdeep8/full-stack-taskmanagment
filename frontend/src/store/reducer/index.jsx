import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  games: [],
  gamesLoading: false, // ✅
};

export const userTaskSlice = createSlice({
  name: "userTask",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.games = []; // ✅ was state.tasks
    },
    setGames: (state, action) => {
      state.games = action.payload; // ✅ was state.tasks
    },
    addGames: (state, action) => {
      state.games.push(action.payload); // ✅ was state.tasks
    },
    updateGames: (state, action) => {
      const index = state.games.findIndex((g) => g.id === action.payload.id); // ✅
      if (index !== -1) state.games[index] = action.payload;
    },
    deleteGames: (state, action) => {
      state.games = state.games.filter((g) => g.id !== action.payload); // ✅
    },
    clearGames: (state) => {
      state.games = []; // ✅
    },
    setGamesLoading: (state, action) => {
      // ✅
      state.gamesLoading = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setGames,
  addGames,
  updateGames, 
  clearGames, 
  setGamesLoading
} = userTaskSlice.actions;
