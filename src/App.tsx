import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { AppRoutes } from './router/routes';

export default function App() {
  return (
    <BrowserRouter>
      {/* Layout Global */}
      <div className="min-h-screen flex flex-col font-sans bg-white">
        
        {/* Navbar akan selalu muncul di atas */}
        <Navbar />

        {/* Konten halaman yang berubah-ubah sesuai rute akan dirender di sini */}
        <main className="flex-grow">
          <AppRoutes />
        </main>
        
        {/* Footer bisa ditambahkan di sini nanti */}

      </div>
    </BrowserRouter>
  );
}