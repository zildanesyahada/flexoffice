import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MotionConfig, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Featured', path: '/#featured', isAnchor: true },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const linkClass = (active: boolean) =>
  `group relative pb-1 text-sm font-medium transition-colors duration-200 ${
    active ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
  }`;

function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue-600 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        active
          ? 'origin-left scale-x-100'
          : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
      }`}
    />
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 80) setHidden(true);
    else if (current < previous) setHidden(false);
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid h-[58px] grid-cols-[1fr_auto_1fr] items-center">
            <Link to="/" aria-label="FlexOffice home" className="justify-self-start">
              <img className="h-8 w-auto" src="assets/images/logo.png" alt="FlexOffice Logo" />
            </Link>

            {/* Tengah: menu */}
            <nav aria-label="Main" className="flex items-center gap-9">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a key={link.name} href={link.path} className={linkClass(false)}>
                    {link.name}
                    <Underline active={false} />
                  </a>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        <Underline active={isActive} />
                      </>
                    )}
                  </NavLink>
                ),
              )}
            </nav>

            {/* Kanan: tombol akun */}
            <div className="flex items-center gap-3 justify-self-end">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-blue-600 bg-white px-4 py-2 text-[13px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </motion.header>
    </MotionConfig>
  );
}