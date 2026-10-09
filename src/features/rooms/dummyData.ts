// Bagian: Data sementara ruangan
// Tugas: menyediakan data ruangan palsu dengan bentuk yang sama seperti respons backend (mengikuti ERD).
// Bukan tugas file ini: memformat tampilan (harga, teks) atau memanggil backend.

// ---------- Tipe data (nama field sama dengan kolom ERD / JSON Laravel) ----------
export type City = { id: number; name: string };
export type RoomCategory = { id: number; name: string };
export type Facility = { id: number; name: string };
export type RoomImage = { image_path: string; sort_order: number };

export type Room = {
  id: number;
  city: City;
  category: RoomCategory;
  name: string;
  description: string;
  capacity: number;
  operating_hours_start: string; // contoh: "09:00"
  operating_hours_end: string;
  price_daily: number;
  price_monthly: number;
  price_yearly: number;
  avg_rating: number;
  total_reviews: number;
  images: RoomImage[];
  facilities: Facility[];
};

// ---------- Data master ----------
// DATA SEMENTARA: nanti diambil dari backend (tabel cities dan room_categories).
export const cities: City[] = [
  { id: 1, name: 'Jakarta' },
  { id: 2, name: 'Bandung' },
  { id: 3, name: 'Surabaya' },
  { id: 4, name: 'Yogyakarta' },
];

export const roomCategories: RoomCategory[] = [
  { id: 1, name: 'Meeting Room' },
  { id: 2, name: 'Coworking Office' },
  { id: 3, name: 'Virtual Space' },
  { id: 4, name: 'Private Executive Suite Room' },
];

const facilities: Facility[] = [
  { id: 1, name: 'High-speed Wi-Fi' },
  { id: 2, name: 'Projector & Screen' },
  { id: 3, name: 'Air Conditioning' },
  { id: 4, name: 'Coffee & Tea' },
  { id: 5, name: 'Whiteboard' },
];

// Semua ruangan memakai foto yang sama sebagai penanda. Ganti dengan foto asli per ruangan.
const placeholderImages: RoomImage[] = [{ image_path: '/images/boardroom.jpg', sort_order: 1 }];

// ---------- Data ruangan ----------
// DATA SEMENTARA: nanti diambil dari backend (GET /rooms).
export const rooms: Room[] = [
  {
    id: 1,
    city: cities[0],
    category: roomCategories[0],
    name: 'The Apex Boardroom & Suite',
    description: 'A premium boardroom on a high floor with a city view, built for executive meetings and client presentations.',
    capacity: 12,
    operating_hours_start: '09:00',
    operating_hours_end: '18:00',
    price_daily: 500000,
    price_monthly: 9000000,
    price_yearly: 90000000,
    avg_rating: 4.9,
    total_reviews: 128,
    images: placeholderImages,
    facilities: [facilities[0], facilities[1], facilities[2], facilities[3]],
  },
  {
    id: 2,
    city: cities[0],
    category: roomCategories[0],
    name: 'Horizon Media Suite',
    description: 'A modern meeting suite with a large display and video conferencing setup for hybrid teams.',
    capacity: 16,
    operating_hours_start: '09:00',
    operating_hours_end: '18:00',
    price_daily: 750000,
    price_monthly: 13500000,
    price_yearly: 135000000,
    avg_rating: 4.8,
    total_reviews: 96,
    images: placeholderImages,
    facilities: [facilities[0], facilities[1], facilities[2]],
  },
  {
    id: 3,
    city: cities[0],
    category: roomCategories[1],
    name: 'Atrium Dedicated Studio',
    description: 'An open coworking floor with dedicated desks, natural light, and a quiet focus zone.',
    capacity: 10,
    operating_hours_start: '09:00',
    operating_hours_end: '18:00',
    price_daily: 620000,
    price_monthly: 11000000,
    price_yearly: 110000000,
    avg_rating: 4.7,
    total_reviews: 74,
    images: placeholderImages,
    facilities: [facilities[0], facilities[2], facilities[3], facilities[4]],
  },
  {
    id: 4,
    city: cities[0],
    category: roomCategories[3],
    name: 'Aurora Flagship Hub',
    description: 'A flagship private suite with a lounge area, designed for leadership teams and long-term use.',
    capacity: 20,
    operating_hours_start: '09:00',
    operating_hours_end: '18:00',
    price_daily: 950000,
    price_monthly: 17000000,
    price_yearly: 170000000,
    avg_rating: 4.6,
    total_reviews: 51,
    images: placeholderImages,
    facilities: [facilities[0], facilities[1], facilities[2], facilities[3]],
  },
  {
    id: 5,
    city: cities[1],
    category: roomCategories[3],
    name: 'Metropolitan Private Suite',
    description: 'A compact private suite with its own entrance, suited for small teams that need privacy.',
    capacity: 8,
    operating_hours_start: '09:00',
    operating_hours_end: '18:00',
    price_daily: 480000,
    price_monthly: 8500000,
    price_yearly: 85000000,
    avg_rating: 4.5,
    total_reviews: 33,
    images: placeholderImages,
    facilities: [facilities[0], facilities[2]],
  },
];

// ---------- Fungsi pengambil data ----------
// Ruangan "populer" = rating tertinggi, lalu jumlah ulasan terbanyak.
// TODO(backend): nanti diganti pemanggilan API (mis. GET /rooms?sort=popular&limit=5).
// Endpoint ini belum ada di dokumen, jadi perlu ditambahkan. Bentuk data yang dikembalikan harus tetap sama.
export function getPopularRooms(limit = 5): Room[] {
  return [...rooms]
    .sort((a, b) => b.avg_rating - a.avg_rating || b.total_reviews - a.total_reviews)
    .slice(0, limit);
}