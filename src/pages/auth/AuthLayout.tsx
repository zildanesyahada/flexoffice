// Bagian: Halaman Auth (route /login dan /register)
// Tugas: kartu dua panel. Foto bergeser ke kanan di /login dan ke kiri di /register, form ikut bertukar.
// Bukan tugas file ini: isi form (ada di features/auth/AuthForms.tsx) atau data pengguna.

import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LoginForm, RegisterForm } from '../../features/auth/AuthForms';
import { VerifyEmailPage } from '../VerifyEmailPage';

// Panel foto: foto bersudut membulat dengan lapisan gelap tipis di dalam bingkai putih.
// Latar putih sengaja buram supaya menutup form di bawahnya saat panel bergeser.
// TODO: kalau halaman Verify Email dibuat dan butuh panel yang sama, pindahkan ke components/shared/.
function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-full bg-white p-4">
      <div className="relative h-full overflow-hidden rounded-2xl bg-gray-900">
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/25" />
      </div>
    </div>
  );
}

type FormPaneProps = {
  side: 'left' | 'right';
  active: boolean;
  children: ReactNode;
};

// Satu sisi form. Letaknya tetap (Login di kiri, Register di kanan), hanya tampil atau menghilang.
// Saat aktif: muncul dengan jeda 300ms supaya foto sempat bergeser lebih dulu.
// "inert" membuat form tersembunyi tidak bisa difokus dengan Tab dan tidak ikut terisi autofill (butuh React 19).
function FormPane({ side, active, children }: FormPaneProps) {
  const position = side === 'left' ? 'left-0' : 'right-0';
  const hiddenShift = side === 'left' ? '-translate-x-6' : 'translate-x-6';

return (
    <div
      inert={!active}
      className={`absolute inset-y-0 w-1/2 overflow-hidden transition-all duration-500 motion-reduce:transition-none ${position} ${
        active ? 'visible translate-x-0 opacity-100 delay-300' : `invisible opacity-0 ${hiddenShift}`}
      }`}
    >
      {children}
    </div>
  );
}

export function AuthLayout() {
  // Posisi foto ditentukan oleh alamat URL, jadi tombol Back/Forward browser ikut bergeser dengan mulus.
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';
  const isVerify = pathname === '/verify-email';

  if (isVerify) {
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center p-4 lg:p-6 bg-[#131927]">
        <div className="w-full max-w-md">
          <VerifyEmailPage />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center p-4 lg:p-6 bg-[#f8f9fa]">
      <div className="w-full max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 transition-colors hover:text-blue-600 mb-3"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Back
        </Link>

        <div className="relative w-full max-w-5xl h-[85vh] max-h-150 min-h-125 bg-white rounded-3xl shadow-xl overflow-hidden flex">
          <FormPane side="left" active={isLogin}>
            <LoginForm />
          </FormPane>
          <FormPane side="right" active={isRegister}>
            <RegisterForm />
          </FormPane>

          {/* Foto yang bergeser: kanan saat Login, kiri saat Register. Awalnya langsung di posisi benar (tanpa animasi). */}
          <div
            className={`absolute inset-y-0 left-0 z-10 w-1/2 transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
              isLogin ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            <ImagePanel src="/assets/images/auth-banner.jpg" alt="Team meeting in a FlexOffice boardroom" />
          </div>
        </div>
      </div>
    </div>
  );
}