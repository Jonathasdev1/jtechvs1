import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ReviewsPage from './pages/ReviewsPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/busca" element={<SearchPage />} />
      <Route path="/resenhas" element={<ReviewsPage />} />
      <Route path="/resenhas/:slug" element={<ArticlePage />} />
      <Route path="/produto/:id" element={<ProductDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
