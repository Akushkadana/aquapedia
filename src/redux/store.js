import { configureStore } from '@reduxjs/toolkit'
import animalsReducer from './slices/animalsSlice'
import favoritesReducer from './slices/favoritesSlice'
import factsReducer from './slices/factsSlice'

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    favorites: favoritesReducer,
    facts: factsReducer,
  },
})
