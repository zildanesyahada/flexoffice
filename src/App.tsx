// Bagian: Akar aplikasi
// Tugas: memasang Router. Navbar diatur oleh MainLayout di routes.tsx, bukan di sini.
// Bukan tugas file ini: isi halaman.

import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router/routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}