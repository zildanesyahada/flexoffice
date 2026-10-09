/**
 * @file LandingPage.tsx
 * @description Presentational composition for the root landing page.
 * @boundary STRICT: No data fetching, routing logic, or complex global state here.
 * Delegate all domain logic (e.g., API calls) to `features/rooms`.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Armchair,
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MapPin,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getPopularRooms, roomCategories, type Room, type RoomCategory } from '../features/rooms/dummyData';
import { Footer } from '../components/shared/Footer'; // sesuaikan path Anda

// ============================================================================
// View Model Transformers (Pure Functions)
// ============================================================================

const formatPrice = (amount: number) => `Rp ${amount.toLocaleString('en-US')}`;
const formatShortPrice = (amount: number) => `Rp ${Math.round(amount / 1000)}k`;

/**
 * Resolves the primary cover image based on sort_order invariant.
 * @fallback Returns undefined if no images exist, handle gracefully in UI.
 */
const getCoverImage = (room: Room) =>
  [...room.images].sort((a, b) => a.sort_order - b.sort_order)[0]?.image_path;


// ============================================================================
// Section: Hero
// ============================================================================

// TODO(Content): Move hardcoded platform stats to a global config or CMS later.
const platformStats = [
  { value: '50+ Spaces', label: 'Directly Owned' },
  { value: '4 Cities', label: 'Metro Hubs' },
  { value: '100%', label: 'Transparent' },
];

function HeroSection() {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gray-900 shadow-lg flex flex-col lg:flex-row justify-between lg:min-h-[600px] px-6 sm:px-12 lg:px-16">
        
        {/* Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="assets/images/hero.jpg"
            alt="logo"
            className="w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-2xl self-center pt-16 pb-10 lg:py-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            One Platform,<br />
            Workspace You Can Trust
          </h1>
          <p className="mt-5 text-base text-gray-300 max-w-lg leading-relaxed">
            Discover professional workspaces designed for meetings, collaboration, and focused work with transparent pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Rooms
            </Link>
            <a
              href="#why-flexoffice"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-transparent border border-gray-300 rounded-lg hover:bg-white/10 hover:border-white transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Stats Card */}
        <div className="relative z-10 bg-white rounded-xl p-5 lg:self-end mb-10 shadow-md w-full lg:w-auto shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Why FlexOffice?
          </p>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-0 sm:divide-x sm:divide-gray-200">
            {platformStats.map((stat) => (
              <div key={stat.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0 sm:text-center">
                <p className="text-lg sm:text-xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-[11px] font-medium text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// Section: Popular Workspaces
// ============================================================================

/**
 * Bento grid primary item (Left panel).
 * @note Omits heavy relational data (facilities, operational hours) to keep DOM light.
 */
function FeaturedRoomCard({ room }: { room: Room }) {
  return (
    <Link 
      to={`/rooms/${room.id}`}
      className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[500px] shadow-sm group block"
    >
      <img
        src={getCoverImage(room)}
        alt={room.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none"></div>

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white rounded-xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">
            {room.category.name}
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{room.name}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              {room.city.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" aria-hidden />
              Up to {room.capacity} Persons
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 mt-2 sm:mt-0">
          {/* mt-auto mendorong elemen ke paling bawah, mb-[10px] memberikan presisi jarak 10px */}
          <div className="text-left sm:text-right mt-auto mb-[4px]">
            <p className="text-xs text-gray-500 font-medium">Starting from</p>
            <p className="font-extrabold text-gray-900 text-lg mb-0">
              {formatPrice(room.price_daily)}
              <span className="text-xs font-normal text-gray-500">/day</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Bento grid secondary items (Right panel loop).
 */
function RoomOverlayCard({ room }: { room: Room }) {
  return (
    <Link
      to={`/rooms/${room.id}`}
      className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-auto min-h-[200px] lg:min-h-0 group"
    >
      <img
        src={getCoverImage(room)}
        alt={room.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h4 className="text-white font-semibold text-sm mb-1">{room.name}</h4>
          <p className="text-gray-300 text-xs font-medium">
            {room.city.name} • {formatShortPrice(room.price_daily)}/day
          </p>
        </div>
        <ArrowRight
          className="size-5 text-white opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          aria-hidden
        />
      </div>
    </Link>
  );
}

function PopularWorkspaces() {
  // TODO(API): Replace dummy query with suspense-enabled fetch or standard useEffect.
  const [featured, ...others] = getPopularRooms(5);
  
  if (!featured) return null; // Failsafe for empty states

  return (
    <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Popular <span className="text-blue-600">Workspaces</span>
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Explore our most popular spaces for work, meetings, and collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <FeaturedRoomCard room={featured} />
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {others.map((room) => (
            <RoomOverlayCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// Section: Why FlexOffice
// ============================================================================

type Benefit = { icon: LucideIcon; label: string };

const benefits: Benefit[] = [
  { icon: LayoutGrid, label: 'Flexible workspace options' },
  { icon: CalendarCheck, label: 'Simple and convenient booking process' },
  { icon: Armchair, label: 'Comfortable and professional facilities' },
];

function WhyFlexOffice() {
  return (
    <div id="why-flexoffice" className="bg-[#0f172a] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Why FlexOffice
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            We make it simple to find a workspace that fits the way you work. FlexOffice provides a range of comfortable and professional spaces for meetings, focused work, collaboration, and other business needs. With transparent pricing, flexible options, and a straightforward booking process, you can choose the right space and reserve it with confidence.
          </p>

          <ul className="space-y-4">
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-gray-200 text-sm sm:text-base font-medium">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className="size-4" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-1/2 w-full">
          <img
            src="assets/images/banner.jpg"
            alt="Team collaborating in FlexOffice"
            className="w-full h-auto object-cover rounded-2xl shadow-xl aspect-video sm:aspect-[4/3]"
          />
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// Section: Find The Right Space (Carousel)
// ============================================================================

// TODO(Data Sync): Ensure keys match backend seeder IDs for room_categories.
// This metadata is strictly frontend presentation layer and doesn't belong in the DB.
const categoryMetadata: Record<number, { description: string; image: string }> = {
  1: { description: 'For team meetings, workshops, and client sessions.', image: 'assets/images/categories/meeting-room.jpg' },
  2: { description: 'Flexible shared desks in an open, lively work area.', image: 'assets/images/categories/coworking.jpg' },
  3: { description: 'A flexible virtual presence for your business.', image: 'assets/images/categories/workspace.jpg' },
  4: { description: 'Your own enclosed suite for individuals and teams.', image: 'assets/images/categories/private-office.jpg' },
  5: { description: 'Your own enclosed suite for individuals and teams.', image: 'assets/images/categories/studio.jpg' },
  6: { description: 'Your own enclosed suite for individuals and teams.', image: 'assets/images/categories/event-space.jpg' },
};

function CategoryCard({ category }: { category: RoomCategory }) {
  const info = categoryMetadata[category.id];

  return (
    <Link
      to={`/rooms?category=${category.id}`}
      className="group flex w-[calc((100%-48px)/3)] shrink-0 snap-start items-center gap-5 rounded-2xl border border-gray-200 bg-white p-7 transition-colors hover:border-blue-600"
    >
      <div className="size-[120px] shrink-0 overflow-hidden rounded-xl bg-blue-50">
        <img
          src={info?.image}
          alt=""
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold uppercase tracking-[0.12em] text-gray-900">
          {category.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {info?.description}
        </p>
      </div>
    </Link>
  );
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous categories' : 'Next categories'}
      className={`absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-md transition-colors hover:border-blue-600 hover:text-blue-600 ${
        direction === 'prev' ? '-left-5' : '-right-5'
      }`}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}

/**
 * Opt-in for native CSS scroll-snap implementation.
 * Avoids heavy carousel library overhead (e.g., Swiper.js) while maintaining smooth UX.
 */
function CategoryCarousel({ categories }: { categories: RoomCategory[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: true });

  // Debounced edge detection for dynamic arrow rendering
  const updateEdge = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  // Recalculate layout metrics on viewport mutations
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdge);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdge]);

  function scrollByPage(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateEdge}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      {!edge.atStart && <CarouselArrow direction="prev" onClick={() => scrollByPage(-1)} />}
      {!edge.atEnd && <CarouselArrow direction="next" onClick={() => scrollByPage(1)} />}
    </div>
  );
}

function FindRightSpace() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Find the <span className="text-blue-600">Right Space</span>
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Pick the type of space that fits how you work.
        </p>
      </div>
      <CategoryCarousel categories={roomCategories} />
    </div>
  );
}


// ============================================================================
// Section: Call To Action
// ============================================================================

function CTASection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div className="relative rounded-3xl overflow-hidden bg-[#0f172a] px-6 py-16 sm:py-20 lg:px-16 text-center shadow-lg">
        
        {/* Synthetic blur elements for modern UI depth */}
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to find your next workspace?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 max-w-xl">
            Discover professional workspaces designed for meetings, collaboration, and focused work with transparent pricing.
          </p>
          <Link
            to="/rooms"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-sm"
          >
            Browse Available Rooms
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// Main Export
// ============================================================================

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PopularWorkspaces />
      <WhyFlexOffice />
      <FindRightSpace />
      <CTASection />
      <Footer />
    </div>
  );
}