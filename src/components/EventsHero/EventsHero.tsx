import { Suspense, type ReactNode } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES_META } from '@/data/events';
import styles from './EventsHero.module.scss';

// Show a short, punchy subset of categories as quick links.
const POPULAR = CATEGORIES_META.slice(0, 3);

interface EventsHeroProps {
  /** Heading. Defaults to the generic "Find your match" landing copy. */
  title?: ReactNode;
  subtitle?: string;
}

export default function EventsHero({ title, subtitle }: EventsHeroProps) {
  return (
    <section className={styles.hero} aria-label="Find events">
      {/* Decorative dot textures fade in at the top corners (desktop only) */}
      <span className={`${styles.dots} ${styles.dotsLeft}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsRight}`} aria-hidden />

      <div className="wrapper">
        <div className={styles.intro}>
          <h1 className={styles.title}>
            {title ?? (
              <>
                Find your <span className={styles.accent}>match</span>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>
            {subtitle ??
              'From hackathons to conferences — we connect people with events. Everything in one place.'}
          </p>
        </div>

        {/* ── Search card ── */}
        <div className={styles.searchCard}>
          <h3 className={styles.searchTitle}>What are you looking for?</h3>

          <Suspense fallback={<div className={styles.searchFallback} aria-hidden />}>
            <SearchBar variant="page" />
          </Suspense>

          <div className={styles.categories}>
            <span className={styles.categoriesLabel}>Popular categories:</span>
            <div className={styles.categoriesList}>
              {POPULAR.map((cat) => (
                <Link key={cat.slug} href={`/events/${cat.slug}`} className={styles.categoryChip}>
                  {cat.category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
