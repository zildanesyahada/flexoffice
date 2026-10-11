// Bagian: Pemanggilan backend untuk auth
// Tugas: satu fungsi per endpoint auth.
// Bukan tugas file ini: validasi form atau perpindahan halaman.

import type { LoginPayload, RegisterPayload } from './type';

// DATA SEMENTARA: fungsi di bawah hanya menunggu 0,8 detik lalu dianggap berhasil.
const fakeNetwork = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

// TODO(backend): ganti dengan POST /auth/register memakai instance axios di lib/axios.ts.
export async function register(payload: RegisterPayload): Promise<void> {
  await fakeNetwork();
  console.info('[dummy] register', payload.email);
}

// TODO(backend): ganti dengan POST /auth/login. Backend mengembalikan token; simpan di lib/auth-storage.ts.
// Pesan error login harus generik ("Invalid email or password") agar tidak membocorkan email yang terdaftar.
export async function login(payload: LoginPayload): Promise<void> {
  await fakeNetwork();
  console.info('[dummy] login', payload.email);
}