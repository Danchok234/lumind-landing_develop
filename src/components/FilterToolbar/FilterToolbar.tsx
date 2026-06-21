'use client';

import { useState } from 'react';
import Popover from '@/components/Popover';
import SelectList, { type SelectOption } from '@/components/SelectList';
import {
  FORMATS,
  LANGUAGES,
  LEVELS,
  SORT_LABELS,
  type EventFormat,
  type SortOption,
} from '@/data/events';
import { useEventFilters, type FilterKey } from '@/hooks/useEventFilters';
import styles from './FilterToolbar.module.scss';

// ── Inline icons ─────────────────────────────────────────────
function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const toOptions = (values: readonly string[]): SelectOption[] =>
  values.map((v) => ({ value: v, label: v }));

const PRICE_OPTIONS: SelectOption[] = [
  { value: '0', label: 'Free only' },
  { value: '25', label: 'Under $25' },
  { value: '50', label: 'Under $50' },
  { value: '100', label: 'Under $100' },
];

const SORT_OPTIONS: SelectOption[] = (Object.keys(SORT_LABELS) as SortOption[]).map((value) => ({
  value,
  label: SORT_LABELS[value],
}));

interface Chip {
  key: FilterKey;
  label: string;
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function shortDate(value: string): string {
  const d = new Date(`${value}T00:00:00`);
  return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`;
}

export default function FilterToolbar() {
  const { query, sort, setFilters, removeFilter, setSort, clearAll } = useEventFilters();

  // Active filters → removable chips.
  const chips: Chip[] = [];
  if (query.location) chips.push({ key: 'location', label: query.location });
  if (query.from) {
    chips.push({
      key: 'from',
      label: query.to ? `${shortDate(query.from)} – ${shortDate(query.to)}` : `From ${shortDate(query.from)}`,
    });
  }
  if (query.format) chips.push({ key: 'format', label: query.format });
  if (query.language) chips.push({ key: 'language', label: query.language });
  if (query.level) chips.push({ key: 'level', label: query.level });
  if (query.priceMax != null) {
    chips.push({ key: 'priceMax', label: query.priceMax === 0 ? 'Free only' : `Under $${query.priceMax}` });
  }

  const activeCount = chips.length;
  const sortLabel = sort === 'recommended' ? 'Sort by' : SORT_LABELS[sort];

  return (
    <div className={styles.toolbar}>
      <div className={styles.topRow}>
        {/* ── Filter button + panel ── */}
        <Popover
          align="start"
          panelClassName={styles.filterPanel}
          trigger={({ toggle, open }) => (
            <button
              type="button"
              className={`${styles.filterBtn} ${open ? styles.filterBtnOpen : ''}`}
              onClick={toggle}
              aria-expanded={open}
            >
              <FilterIcon />
              Filter
              {activeCount > 0 && <span className={styles.count}>{activeCount}</span>}
            </button>
          )}
        >
          {() => (
            <div className={styles.panelInner}>
              <FilterGroup title="Format" value={query.format}>
                <SelectList
                  options={toOptions(FORMATS)}
                  value={query.format}
                  anyLabel="Any format"
                  onSelect={(v) => setFilters({ format: v as EventFormat | undefined })}
                />
              </FilterGroup>
              <FilterGroup title="Language" value={query.language}>
                <SelectList
                  options={toOptions(LANGUAGES)}
                  value={query.language}
                  anyLabel="Any language"
                  onSelect={(v) => setFilters({ language: v })}
                />
              </FilterGroup>
              <FilterGroup title="Level" value={query.level}>
                <SelectList
                  options={toOptions(LEVELS)}
                  value={query.level}
                  anyLabel="Any level"
                  onSelect={(v) => setFilters({ level: v })}
                />
              </FilterGroup>
              <FilterGroup
                title="Price"
                value={PRICE_OPTIONS.find((o) => o.value === String(query.priceMax))?.label}
              >
                <SelectList
                  options={PRICE_OPTIONS}
                  value={query.priceMax != null ? String(query.priceMax) : undefined}
                  anyLabel="Any price"
                  onSelect={(v) => setFilters({ priceMax: v == null ? undefined : Number(v) })}
                />
              </FilterGroup>
            </div>
          )}
        </Popover>

        {activeCount > 0 && (
          <button type="button" className={styles.clearAll} onClick={clearAll}>
            Clear all
          </button>
        )}

        {/* ── Sort dropdown (pushed right) ── */}
        <Popover
          align="end"
          className={styles.sortWrap}
          panelClassName={styles.sortPanel}
          trigger={({ toggle, open }) => (
            <button
              type="button"
              className={`${styles.sortBtn} ${open ? styles.sortBtnOpen : ''}`}
              onClick={toggle}
              aria-expanded={open}
            >
              <span className={styles.sortLabel}>{sortLabel}</span>
              <FilterIcon />
            </button>
          )}
        >
          {({ close }) => (
            <SelectList
              options={SORT_OPTIONS}
              value={sort}
              onSelect={(v) => {
                setSort((v ?? 'recommended') as SortOption);
                close();
              }}
            />
          )}
        </Popover>
      </div>

      {/* ── Active filter chips ── */}
      {chips.length > 0 && (
        <div className={styles.chips}>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className={styles.chip}
              onClick={() => removeFilter(chip.key)}
              aria-label={`Remove ${chip.label} filter`}
            >
              {chip.label}
              <CloseIcon />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterGroupProps {
  title: string;
  /** Currently selected option's label, shown next to the title when collapsed. */
  value?: string;
  children: React.ReactNode;
}

// Collapsed by default so Format/Language/Level/Price don't all dump their
// full option lists into the panel at once — open one to see its options.
function FilterGroup({ title, value, children }: FilterGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.groupHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles.groupTitle}>{title}</span>
        {value && !open && <span className={styles.groupValue}>{value}</span>}
        <span className={`${styles.groupChevron} ${open ? styles.groupChevronOpen : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      {open && <div className={styles.groupBody}>{children}</div>}
    </div>
  );
}
