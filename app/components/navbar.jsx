'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Shield, Mail, Menu, X } from 'lucide-react';
import logo from '../images/logo (3).png';

const navItems = [
  {
    baseLabel: 'Home',
    path: '/',
    icon: Home,
    // dropdown: [
    //   { label: 'Home', hash: '#hero' },
    //   { label: 'Featured Products', hash: '#featured' },
    //   { label: 'Contact Info', hash: '#contact' },
    // ],
  },
  {
    baseLabel: 'Products',
    path: '/#featured', // ✅ Clicking Products now goes to Product Highlights
    icon: CreditCard,
    // dropdown: [
    //   { label: 'LAS', hash: '#las' },
    //   { label: 'LAMF', hash: '#lamf' },
    //   { label: 'MTF', hash: '#mtf' },
    // ],
  },
  {
    baseLabel: 'About',
    path: '/about',
    icon: Shield,
    // dropdown: [
    //   { label: 'Story', hash: '#story' },
    //   { label: 'Team', hash: '#team' },
    // ],
  },
  {
    baseLabel: 'Contact',
    path: '/contact',
    icon: Mail,
    // dropdown: [
    //   { label: 'Support', hash: '#support' },
    //   { label: 'Locations', hash: '#locations' },
    // ],
  },
];

function useSmoothHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const { hash } = window.location;
    if (!hash) return;

    const id = hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = window.innerHeight / 2 - el.offsetHeight / 2; // Center the section
        const y = el.getBoundingClientRect().top + window.scrollY - yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      }
    }, 100);

    return () => clearTimeout(t);
  }, [pathname]);
}

function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!sectionIds.length) return;

    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export default function Navbar() {
  const pathname = usePathname();
  const [clickLabels, setClickLabels] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = pathname === '/';

  useSmoothHashScroll();

  const allIds = navItems.flatMap((n) => n.dropdown?.map((d) => d.hash.slice(1)) ?? []);
  const activeSection = useScrollSpy(allIds);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setLabel = (path, lbl) => setClickLabels((p) => ({ ...p, [path]: lbl }));
  const resetLabel = (path) => setClickLabels((p) => ({ ...p, [path]: undefined }));

  const homepageSectionToNavItem = {
    featured: 'Products',
    contact: 'Contact',
  };

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex items-center justify-center px-4">

      {/* Logo */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="Logo" width={170} height={80} className="cursor-pointer" />
        </Link>
      </div>

      {/* Navbar */}
      <nav
        className={`pointer-events-auto rounded-full border px-6 py-3 transition-all duration-300 flex justify-center
        ${isScrolled
          ? 'bg-white/70 backdrop-blur-sm shadow-md border-gray-200'
          : 'bg-white/60 backdrop-blur-md border-gray-100'
        }`}
      >
        {/* Desktop */}
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hash = typeof window !== 'undefined' ? window.location.hash : '';
            const isActivePage = pathname === item.path || pathname + hash === item.path;
            const labelMatch = item.dropdown?.find((d) => d.hash.slice(1) === activeSection);
            const label =
              item.baseLabel === 'Home' && isHomePage
                ? 'Home'
                : clickLabels[item.path] || (labelMatch?.label ?? item.baseLabel);

            const shouldHighlight =
              isHomePage && homepageSectionToNavItem[activeSection] === item.baseLabel;

            return (
              <li key={item.baseLabel} className="relative group">
                <Link
                  href={item.path}
                  onClick={() => resetLabel(item.path)}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition
                    ${isActivePage ? 'bg-gray-900 text-white' : 'text-gray-820 hover:bg-gray-100 hover:text-black'}
                    ${shouldHighlight ? 'ring-2 ring-blue-900 bg-gray-300 text-gray-900 ring-offset-2' : ''}`}
                >
                  <Icon
                    size={16}
                    className={isActivePage ? 'text-white' : 'text-gray-400 group-hover:text-black'}
                  />
                  <span className="text-sm font-medium tracking-wide">{label}</span>
                </Link>

                {item.dropdown && (
                  <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-white border border-gray-200 rounded-xl shadow-lg p-2 space-y-1">
                    {item.dropdown.map((sub) => {
                      const href = `${item.path.includes('#') ? '/' : item.path}${sub.hash}`;
                      return (
                        <Link
                          key={sub.label}
                          href={href}
                          prefetch={false}
                          onClick={(e) => {
                            if (isHomePage && typeof window !== 'undefined') {
                              e.preventDefault();
                              setLabel(item.path, sub.label);
                              const el = document.querySelector(sub.hash);
                              if (el) {
                                window.history.pushState(null, '', href);
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            } else {
                              setLabel(item.path, sub.label);
                            }
                          }}
                          className="block whitespace-nowrap px-4 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-end">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 rounded-b-2xl shadow-md md:hidden">
            <ul className="flex flex-col space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.baseLabel} className="relative">
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-100">
                        <div className="flex items-center space-x-2">
                          <Icon size={16} />
                          <span className="font-medium">{item.baseLabel}</span>
                        </div>
                      </summary>
                      {item.dropdown && (
                        <ul className="pl-6 py-1 space-y-1">
                          {item.dropdown.map((sub) => {
                            const href = `${item.path.includes('#') ? '/' : item.path}${sub.hash}`;
                            return (
                              <Link
                                key={sub.label}
                                href={href}
                                prefetch={false}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </ul>
                      )}
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}