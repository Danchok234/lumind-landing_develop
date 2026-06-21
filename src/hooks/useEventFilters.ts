'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { EventFilters, EventFormat, SortOption } from '@/data/events';

// ── Active filter values, as they live in the URL ────────────────
// Dates are kept as `yyyy-mm-dd` strings for readable, shareable URLs.
export interface FilterQuery {
  location?: string;
  format?: EventFormat;
  language?: string;
  level?: string;
  from?: string;
  to?: string;
  priceMax?: number;
}

export type FilterKey = keyof FilterQuery;

// FilterQuery keys -> URL param names (only `language` differs).
const PARAM_NAME: Record<FilterKey, string> = {
  location: 'location',
  format: 'format',
  language: 'lang',
  level: 'level',
  from: 'from',
  to: 'to',
  priceMax: 'priceMax',
};

const dayStart = (d: string) => new Date(`${d}T00:00:00`).getTime();
const dayEnd = (d: string) => new Date(`${d}T23:59:59.999`).getTime();

/**
 * URL-synced filter + sort state, shared by the search bar, filter toolbar
 * and category pills. The locked `category` on /events/[slug] comes from the
 * route, not the query, so it is intentionally absent here.
 */
export function useEventFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo<FilterQuery>(() => {
    const q: FilterQuery = {};
    const location = searchParams.get('location');
    const format = searchParams.get('format');
    const language = searchParams.get('lang');
    const level = searchParams.get('level');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const priceMax = searchParams.get('priceMax');

    if (location) q.location = location;
    if (format) q.format = format as EventFormat;
    if (language) q.language = language;
    if (level) q.level = level;
    if (from) q.from = from;
    if (to) q.to = to;
    if (priceMax) q.priceMax = Number(priceMax);
    return q;
  }, [searchParams]);

  const sort = (searchParams.get('sort') as SortOption | null) ?? 'recommended';

  // Filters ready for `filterEvents` (dates resolved to ms timestamps).
  const eventFilters = useMemo<EventFilters>(
    () => ({
      location: query.location,
      format: query.format,
      language: query.language,
      level: query.level,
      from: query.from ? dayStart(query.from) : undefined,
      to: query.to ? dayEnd(query.to) : undefined,
      priceMax: query.priceMax,
    }),
    [query],
  );

  const commit = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const setFilters = useCallback(
    (partial: Partial<FilterQuery>) => {
      commit((params) => {
        (Object.keys(partial) as FilterKey[]).forEach((key) => {
          const value = partial[key];
          const name = PARAM_NAME[key];
          if (value === undefined || value === null || value === '') params.delete(name);
          else params.set(name, String(value));
        });
      });
    },
    [commit],
  );

  const removeFilter = useCallback(
    (key: FilterKey) => {
      // Dates always come as a pair, so clearing one clears both.
      commit((params) => {
        params.delete(PARAM_NAME[key]);
        if (key === 'from' || key === 'to') {
          params.delete('from');
          params.delete('to');
        }
      });
    },
    [commit],
  );

  const setSort = useCallback(
    (next: SortOption) => {
      commit((params) => {
        if (next === 'recommended') params.delete('sort');
        else params.set('sort', next);
      });
    },
    [commit],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters = Object.keys(query).length > 0;

  return {
    query,
    eventFilters,
    sort,
    setFilters,
    removeFilter,
    setSort,
    clearAll,
    hasActiveFilters,
  };
}
