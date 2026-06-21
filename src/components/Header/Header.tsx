'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CategoryMegaMenu from '@/components/CategoryMegaMenu';
import styles from './Header.module.scss';

const LOGO_SRC = '/22848b279413d10b17754c4fecc14d8e107c0815.svg';

const NAV_LINKS = [
  { label: 'Events',         href: '/event' },
  { label: 'Why us',         href: '#why-us' },
  { label: 'Our advantages', href: '#advantages' },
  { label: 'Steps',          href: '#steps' },
  { label: 'Team',           href: '#team' },
  { label: 'FAQ',            href: '#faq' },
];

export default function Header() {
  const [hidden, setHidden]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [active, setActive]     = useState('');
  const lastScrollY             = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Mega-menu open/close with a short close delay so moving the pointer across
  // the gap between the "Events" link and the panel doesn't dismiss it.
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };
  useEffect(() => () => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
  }, []);

  return (
    <>
      {/* ── Fixed header pill ── */}
      <header
        className={[
          styles.headerOuter,
          hidden ? styles.hidden : '',
        ].join(' ')}
        aria-label="Main navigation"
      >
        <div className={styles.header}>

          {/* Logo */}
          <a href="/" className={styles.logo} aria-label="Lumind home">
            <Image
              src={LOGO_SRC}
              alt="Lumind.space"
              width={134}
              height={21}
              priority
            />
          </a>

          {/* Desktop center nav */}
          <nav className={styles.nav} aria-label="Site sections">
            {NAV_LINKS.map((link) =>
              link.label === 'Events' ? (
                <span
                  key={link.href}
                  className={styles.megaWrap}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <a
                    href={link.href}
                    className={[
                      styles.navLink,
                      active === link.href ? styles.active : '',
                    ].join(' ')}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    onClick={() => setActive(link.href)}
                  >
                    {link.label}
                  </a>
                </span>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={[
                    styles.navLink,
                    active === link.href ? styles.active : '',
                  ].join(' ')}
                  onClick={() => setActive(link.href)}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop categories mega-menu (anchored under the header pill) */}
          <div onMouseEnter={openMega} onMouseLeave={closeMega}>
            <CategoryMegaMenu open={megaOpen} onNavigate={() => setMegaOpen(false)} />
          </div>

          {/* Desktop right actions */}
          <div className={styles.actions}>
            <a
              href="#organizators"
              className={`${styles.actionLink} ${styles.organizators}`}
            >
              For organizators
            </a>
            <a
              href="#sign-in"
              className={`${styles.actionLink} ${styles.signIn}`}
            >
              Sign in
            </a>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={[styles.burger, menuOpen ? styles.open : ''].join(' ')}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer (slides from left) ── */}
      <div
        className={[styles.drawer, menuOpen ? styles.open : ''].join(' ')}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Nav links */}
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.drawerNavLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom buttons */}
        <div className={styles.drawerActions}>
          <button className={styles.drawerBtnPrimary} onClick={closeMenu}>
            For organisators
          </button>
          <button className={styles.drawerBtnSecondary} onClick={closeMenu}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
