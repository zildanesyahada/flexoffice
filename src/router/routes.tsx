import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Placeholder rute yang ada di Navbar tadi */}
      <Route path="/rooms" element={<div className="p-10 text-center">Halaman Cari Ruangan (Segera Hadir)</div>} />
      <Route path="/login" element={<div className="p-10 text-center">Halaman Login (Segera Hadir)</div>} />
      <Route path="/register" element={<div className="p-10 text-center">Halaman Register (Segera Hadir)</div>} />
      
      {/* Rute tidak ditemukan (404) */}
      <Route path="*" element={<div className="p-10 text-center font-bold text-red-500">404 - Halaman Tidak Ditemukan</div>} />
    </Routes>
  );
}