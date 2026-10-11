// Bagian: Tipe data auth
// Tugas: bentuk data yang dikirim ke backend untuk login dan registrasi.
// Bukan tugas file ini: bentuk respons backend (belum diketahui).

export type LoginPayload = {
    email: string;
    password: string;
  };
  
  export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string; // nama ini diminta aturan "confirmed" di Laravel
  };