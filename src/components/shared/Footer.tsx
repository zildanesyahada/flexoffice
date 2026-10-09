/**
 * @file Footer.tsx
 * @description Global footer component for the application.
 * @boundary STRICT: Purely presentational. Routing is handled via React Router Links.
 */

import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
// lucide-react no longer ships brand icons, so social icons come from react-icons.
// Install with: npm i react-icons
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';

// ============================================================================
// Configuration Data
// ============================================================================

type FooterLink = { label: string; href: string };

const footerLinks: Record<'company' | 'rooms' | 'support', FooterLink[]> = {
  company: [
    { label: 'About FlexOffice', href: '/about' },
    { label: 'Locations', href: '/locations' },
    { label: 'Operator Standards', href: '/standards' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  rooms: [
    { label: 'Meeting Room', href: '/rooms?category=1' },
    { label: 'Coworking Office', href: '/rooms?category=2' },
    { label: 'Virtual Space', href: '/rooms?category=3' },
    { label: 'Private Executive Suite Room', href: '/rooms?category=4' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Booking Verification', href: '/verify' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const bottomLinks: FooterLink[] = [
  { label: 'Security Protocol', href: '/security' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'SLA Status', href: '/status' },
];

type SocialLink = { id: string; Icon: IconType; href: string };

// TODO: Replace '#' with the real social profile URLs.
const socialLinks: SocialLink[] = [
  { id: 'facebook', Icon: FaFacebookF, href: '#' },
  { id: 'twitter', Icon: FaXTwitter, href: '#' },
  { id: 'instagram', Icon: FaInstagram, href: '#' },
  { id: 'linkedin', Icon: FaLinkedinIn, href: '#' },
  { id: 'youtube', Icon: FaYoutube, href: '#' },
];

// ============================================================================
// Sub-components
// ============================================================================

function FooterNavColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-5">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map(({ id, Icon, href }) => (
        <a
          key={id}
          href={href}
          className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
          aria-label={`Visit our ${id} page`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/assets/images/logo.png"
                alt="FlexOffice"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              FlexOffice is a flexible workspace provider offering modern office solutions for
              professionals. We provide customizable workspaces tailored to your needs, ranging
              from private offices, shared desks, and meeting rooms, to virtual office services.
            </p>

            <SocialLinks />
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 mt-2 lg:mt-0">
            <FooterNavColumn title="Company" links={footerLinks.company} />
            <FooterNavColumn title="Rooms" links={footerLinks.rooms} />
            <FooterNavColumn title="Support" links={footerLinks.support} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FlexOffice Technologies Inc. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            {bottomLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}