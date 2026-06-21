'use client';

import CategoryPills from '@/components/CategoryPills';
import SubcategoryPills from '@/components/SubcategoryPills';
import FilterToolbar from '@/components/FilterToolbar';
import EventsList from '@/components/EventsList';
import { EVENTS, categorySlug, filterEvents, getCategoryBySlug, sortEvents, subcategorySlug } from '@/data/events';
import { useEventFilters } from '@/hooks/useEventFilters';
import styles from './EventsBrowser.module.scss';

interface EventsBrowserProps {
  /** Locked category name on /events/[slug]; omitted on the all-events page. */
  category?: string;
  /** Locked sub-category name on /events/[slug]/[subSlug]; omitted otherwise. */
  subcategory?: string;
  /** Heading shown above the grid. */
  heading?: string;
}

/**
 * Client orchestrator for the listing: owns URL-synced filter state and renders
 * the category pills, filter toolbar and the filtered/sorted card grid.
 */
export default function EventsBrowser({ category, subcategory, heading = 'Recently added' }: EventsBrowserProps) {
  const { eventFilters, sort, clearAll } = useEventFilters();

  // React Compiler memoizes this — no manual useMemo needed.
  const results = sortEvents(filterEvents(EVENTS, { ...eventFilters, category, subcategory }), sort);

  // Remounts EventsList so its "Load more" count resets when filters change.
  const filterKey = `${category ?? ''}|${subcategory ?? ''}|${sort}|${JSON.stringify(eventFilters)}`;

  const categoryMeta = category ? getCategoryBySlug(categorySlug(category)) : undefined;
  const activeSubSlug = category && subcategory ? subcategorySlug(category, subcategory) : undefined;

  return (
    <section id="events" className={styles.section} aria-label="Events">
      <div className={`wrapper ${styles.inner}`}>
        <CategoryPills activeSlug={category ? categorySlug(category) : undefined} />
        {categoryMeta && <SubcategoryPills category={categoryMeta} activeSlug={activeSubSlug} />}
        <FilterToolbar />

        <div className={styles.headingRow}>
          <h2 className={styles.heading}>{heading}</h2>
          <span className={styles.count}>
            {results.length} {results.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {results.length > 0 ? (
          <EventsList key={filterKey} events={results} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No events match your filters</p>
            <p className={styles.emptyText}>Try removing a filter or widening your dates.</p>
            <button type="button" className={styles.emptyBtn} onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
