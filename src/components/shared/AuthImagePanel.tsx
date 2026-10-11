// Bagian: Panel foto untuk halaman auth
// Tugas: menampilkan foto bersudut membulat dengan lapisan gelap tipis, di dalam bingkai putih.
// Bukan tugas file ini: mengatur posisi atau animasi geser (itu urusan AuthLayout).

type AuthImagePanelProps = {
    src: string;
    alt: string;
  };
  
  export function AuthImagePanel({ src, alt }: AuthImagePanelProps) {
    return (
      // Latar putih bersifat buram supaya menutup form yang ada di bawahnya saat panel bergeser
      <div className="h-full bg-white p-4">
        <div className="relative h-full overflow-hidden rounded-2xl bg-gray-900">
          <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/25" />
        </div>
      </div>
    );
  }