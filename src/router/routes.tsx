// Bagian: Daftar route aplikasi
// Tugas: menyatukan semua <Route> di satu tempat, dan menentukan halaman mana yang memakai Navbar.
// Bukan tugas file ini: isi halaman.

import { Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { LandingPage } from '../pages/LandingPage';
import { AuthLayout } from '../pages/auth/AuthLayout';
import { VerifyEmailPage } from '../pages/VerifyEmailPage';

// Kerangka halaman biasa: Navbar di atas, isi halaman di bawahnya. Halaman auth tidak memakai ini (layar penuh).
// TODO: pasang <Footer /> di sini setelah Footer selesai dibuat.
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

// Placeholder sementara, diganti halaman asli satu per satu.
function Placeholder({ text, className = '' }: { text: string; className?: string }) {
  return <div className={`p-10 text-center ${className}`}>{text}</div>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Halaman biasa: dengan Navbar */}
      <Route element={<MainLayout />}>
        {/* Rute publik */}
        <Route path="/" element={<LandingPage />} />

        {/* Placeholder untuk rute yang ada di Navbar dan di kartu ruangan */}
        <Route path="/rooms" element={<Placeholder text="Halaman Cari Ruangan (Segera Hadir)" />} />
        <Route path="/rooms/:id" element={<Placeholder text="Halaman Detail Ruangan (Segera Hadir)" />} />
        <Route path="/about" element={<Placeholder text="Halaman About (Segera Hadir)" />} />
        <Route path="/contact" element={<Placeholder text="Halaman Contact (Segera Hadir)" />} />

        {/* Rute tidak ditemukan (404), tetap dengan Navbar */}
        <Route
          path="*"
          element={<Placeholder text="404 - Halaman Tidak Ditemukan" className="font-bold text-red-500" />}
        />
      </Route>

      {/* Halaman auth: layar penuh tanpa Navbar. AuthLayout dipasang satu kali untuk dua alamat,
          sehingga tidak dibuat ulang saat pindah /login <-> /register (inilah yang membuat animasi mulus).
          element={null} karena tampilan form sudah dirender langsung oleh AuthLayout. */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={null} />
        <Route path="/register" element={null} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>
    </Routes>
  );
}