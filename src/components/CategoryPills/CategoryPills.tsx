import Link from 'next/link';
import { CATEGORIES_META } from '@/data/events';
import styles from './CategoryPills.module.scss';

interface CategoryPillsProps {
  /** Slug of the active category; omitted/empty means "All events". */
  activeSlug?: string;
}

/**
 * Horizontal, scrollable category selector shown on every viewport.
 * "All" links back to /event; each category links to its own SEO page.
 */
export default function CategoryPills({ activeSlug }: CategoryPillsProps) {
  const allActive = !activeSlug;

  return (
    <nav className={styles.bar} aria-label="Browse events by category">
      <Link
        href="/event"
        className={[styles.pill, allActive ? styles.active : ''].filter(Boolean).join(' ')}
        aria-current={allActive ? 'page' : undefined}
      >
        All events
      </Link>

      {CATEGORIES_META.map((cat) => {
        const isActive = cat.slug === activeSlug;
        return (
          <Link
            key={cat.slug}
            href={`/events/${cat.slug}`}
            className={[styles.pill, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.dot} style={{ background: cat.accent }} aria-hidden />
            {cat.category}
          </Link>
        );
      })}
    </nav>
  );
}
