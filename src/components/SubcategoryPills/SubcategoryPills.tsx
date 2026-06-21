import Link from 'next/link';
import type { CategoryMeta } from '@/data/events';
import styles from './SubcategoryPills.module.scss';

interface SubcategoryPillsProps {
  /** The selected main category — its sub-categories are listed here. */
  category: CategoryMeta;
  /** Slug of the active sub-category; omitted means "All {category} events". */
  activeSlug?: string;
}

/**
 * Secondary, horizontally-scrollable selector shown under the main category
 * pills once a category is chosen — lets the visitor narrow down to one of
 * its sub-categories, each with its own /events/[category]/[subcategory] page.
 */
export default function SubcategoryPills({ category, activeSlug }: SubcategoryPillsProps) {
  const allActive = !activeSlug;

  return (
    <nav className={styles.bar} aria-label={`Browse ${category.category} by sub-category`}>
      <Link
        href={`/events/${category.slug}`}
        className={[styles.pill, allActive ? styles.active : ''].filter(Boolean).join(' ')}
        aria-current={allActive ? 'page' : undefined}
      >
        All {category.category}
      </Link>

      {category.subcategories.map((sub) => {
        const isActive = sub.slug === activeSlug;
        return (
          <Link
            key={sub.slug}
            href={`/events/${category.slug}/${sub.slug}`}
            className={[styles.pill, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            aria-current={isActive ? 'page' : undefined}
          >
            {sub.name}
          </Link>
        );
      })}
    </nav>
  );
}
