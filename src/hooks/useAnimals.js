import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite, selectFavoriteIds } from '../redux/slices/favoritesSlice'
import { selectFilteredAnimals } from '../redux/slices/animalsSlice'

export function useAnimals() {
  const animals = useSelector(selectFilteredAnimals)
  const status = useSelector(s => s.animals.status)
  const error = useSelector(s => s.animals.error)
  return { animals, status, error }
}

export function useFavorites() {
  const dispatch = useDispatch()
  const favoriteIds = useSelector(selectFavoriteIds)
  const allAnimals = useSelector(s => s.animals.list)
  const favoriteAnimals = allAnimals.filter(a => favoriteIds.includes(a.id))

  const toggle = (id) => dispatch(toggleFavorite(id))
  const isFavorite = (id) => favoriteIds.includes(id)

  return { favoriteIds, favoriteAnimals, toggle, isFavorite }
}

export function useFilters() {
  const searchQuery = useSelector(s => s.animals.searchQuery)
  const filterZone = useSelector(s => s.animals.filterZone)
  const filterClass = useSelector(s => s.animals.filterClass)
  return { searchQuery, filterZone, filterClass }
}
