import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CatalogPage from '../pages/CatalogPage'
import AnimalDetailPage from '../pages/AnimalDetailPage'
import FavoritesPage from '../pages/FavoritesPage'
import AddAnimalPage from '../pages/AddAnimalPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/animal/:id" element={<AnimalDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/add" element={<AddAnimalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
