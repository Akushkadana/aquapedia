import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: JSON.parse(localStorage.getItem('aquapedia_favorites') || '[]'),
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(f => f !== id)
      } else {
        state.ids.push(id)
      }
      localStorage.setItem('aquapedia_favorites', JSON.stringify(state.ids))
    },
    clearFavorites(state) {
      state.ids = []
      localStorage.removeItem('aquapedia_favorites')
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export const selectFavoriteIds = (state) => state.favorites.ids
export default favoritesSlice.reducer
