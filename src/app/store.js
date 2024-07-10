// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import songslice from '../features/songs/songslice';
import { loadState,saveState } from '../utilities/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    songs: songslice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  preloadedState: {
    songs: preloadedState || { likedSongs: [] }
  }
});

store.subscribe(() => {
  saveState(store.getState().songs);
});

export default store;
