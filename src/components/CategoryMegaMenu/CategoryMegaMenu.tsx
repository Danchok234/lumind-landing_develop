'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES_META } from '@/data/events';
import styles from './CategoryMegaMenu.module.scss';

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className={styles.chevron}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface CategoryMegaMenuProps {
  open: boolean;
  /** Called when a link is clicked, so the header can close the menu. */
  onNavigate?: () => void;
}

/**
 * Desktop-only mega-menu (Figma 601:5317). Left column lists categories; the
 * hovered category previews a few of its events on the right with a deep link.
 */
export default function CategoryMegaMenu({ open, onNavigate }: CategoryMegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(CATEGORIES_META[0].slug);
  const active = CATEGORIES_META.find((c) => c.slug === activeSlug) ?? CATEGORIES_META[0];

  return (
    <div className={`${styles.menu} ${open ? styles.open : ''}`} aria-hidden={!open}>
      <div className={styles.panel}>
        {/* ── Left: category list ── */}
        <div className={styles.col}>
          <span className={styles.colTitle}>Categories</span>
          <ul className={styles.catList}>
            {CATEGORIES_META.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/events/${cat.slug}`}
                  className={`${styles.catRow} ${cat.slug === activeSlug ? styles.catActive : ''}`}
                  onMouseEnter={() => setActiveSlug(cat.slug)}
                  onFocus={() => setActiveSlug(cat.slug)}
                  onClick={onNavigate}
                >
                  <span className={styles.catIcon} style={{ background: cat.accent }} aria-hidden />
                  <span className={styles.catName}>{cat.category}</span>
                  <ChevronRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <span className={styles.divider} aria-hidden />

        {/* ── Right: preview of the hovered category ── */}
        <div className={styles.col}>
          <span className={styles.colTitle}>{active.category}</span>
          <ul className={styles.sampleList}>
            {active.sampleTitles.map((title) => (
              <li key={title}>
                <Link href={`/events/${active.slug}`} className={styles.sampleLink} onClick={onNavigate}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/events/${active.slug}`} className={styles.viewAll} onClick={onNavigate}>
            View all events about {active.category}
          </Link>
        </div>
      </div>
    </div>
  );
}
