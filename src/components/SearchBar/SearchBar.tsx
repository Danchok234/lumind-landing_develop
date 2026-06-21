'use client';

import 'react-day-picker/style.css';
import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker, type DateRange } from 'react-day-picker';
import Popover from '@/components/Popover';
import SelectList, { type SelectOption } from '@/components/SelectList';
import { FORMATS, LANGUAGES, LOCATIONS, type EventFormat } from '@/data/events';
import { useEventFilters } from '@/hooks/useEventFilters';
import styles from './SearchBar.module.scss';

// ── Inline icons (use currentColor so they inherit field state) ──
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ── Variants ──────────────────────────────────────────────────
// 'hero' — landing hero: floating pill, filled CTA, navigates to /event.
// 'page' — events page: inside a card, outlined CTA, filters live in place.
export type SearchBarVariant = 'hero' | 'page';

interface SearchBarProps {
  variant?: SearchBarVariant;
}

interface Draft {
  location?: string;
  format?: EventFormat;
  language?: string;
  from?: string; // yyyy-mm-dd
  to?: string;
}

const toOptions = (values: readonly string[]): SelectOption[] =>
  values.map((v) => ({ value: v, label: v }));

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toYmd(date: Date): string {
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

function fromYmd(value?: string): Date | undefined {
  return value ? new Date(`${value}T00:00:00`) : undefined;
}

function shortDate(value?: string): string {
  const d = fromYmd(value);
  return d ? `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}` : '';
}

function dateLabel(from?: string, to?: string): string {
  if (from && to) return `${shortDate(from)} – ${shortDate(to)}`;
  if (from) return `From ${shortDate(from)}`;
  return '';
}

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const isPage = variant === 'page';
  const router = useRouter();
  const { query, setFilters } = useEventFilters();

  // Live mode (events pages) reflects the URL directly; navigate mode (landing
  // hero) keeps a local draft and applies it on submit by going to /event.
  const queryDraft: Draft = {
    location: query.location,
    format: query.format,
    language: query.language,
    from: query.from,
    to: query.to,
  };
  const [navDraft, setNavDraft] = useState<Draft>({});
  const current = isPage ? queryDraft : navDraft;

  // Lock page scroll while any of this search bar's popovers (location,
  // dates, format, language) are open. Counted rather than boolean since
  // closing one field can briefly overlap with another opening.
  const [openPopovers, setOpenPopovers] = useState(0);
  const handlePopoverOpenChange = (open: boolean) => {
    setOpenPopovers((count) => Math.max(0, count + (open ? 1 : -1)));
  };
  useEffect(() => {
    // `document.scrollingElement` is `<html>` here (standards mode), not
    // `<body>` — locking overflow on body alone doesn't stop page scroll.
    document.documentElement.style.overflow = openPopovers > 0 ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [openPopovers]);

  const update = (partial: Draft) => {
    if (isPage) {
      setFilters(partial);
    } else {
      setNavDraft((d) => ({ ...d, ...partial }));
    }
  };

  const onSubmit = () => {
    if (isPage) {
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const params = new URLSearchParams();
    if (navDraft.location) params.set('location', navDraft.location);
    if (navDraft.format) params.set('format', navDraft.format);
    if (navDraft.language) params.set('lang', navDraft.language);
    if (navDraft.from) params.set('from', navDraft.from);
    if (navDraft.to) params.set('to', navDraft.to);
    const qs = params.toString();
    router.push(qs ? `/event?${qs}` : '/event');
  };

  const selectedRange: DateRange | undefined = current.from
    ? { from: fromYmd(current.from), to: fromYmd(current.to) }
    : undefined;

  const onSelectRange = (range: DateRange | undefined) => {
    update({
      from: range?.from ? toYmd(range.from) : undefined,
      to: range?.to ? toYmd(range.to) : undefined,
    });
  };

  // ── Field renderers (shared by desktop pill + mobile card) ────
  const locationField = (panelAlign: 'start' | 'end' = 'start') => (
    <FieldPopover
      align={panelAlign}
      value={current.location}
      placeholder="Location"
      icon={<ChevronIcon />}
      onOpenChange={handlePopoverOpenChange}
    >
      {({ close }) => (
        <SelectList
          options={toOptions(LOCATIONS)}
          value={current.location}
          anyLabel="Anywhere"
          onSelect={(v) => {
            update({ location: v });
            close();
          }}
        />
      )}
    </FieldPopover>
  );

  const datesField = (panelAlign: 'start' | 'end' = 'start') => (
    <FieldPopover
      align={panelAlign}
      value={dateLabel(current.from, current.to) || undefined}
      placeholder="Dates"
      icon={<CalendarIcon />}
      onOpenChange={handlePopoverOpenChange}
    >
      {() => (
        <div className={styles.calendarWrap}>
          <DayPicker
            mode="range"
            numberOfMonths={1}
            selected={selectedRange}
            onSelect={onSelectRange}
            className={styles.calendar}
          />
          {selectedRange && (
            <button
              type="button"
              className={styles.calendarClear}
              onClick={() => update({ from: undefined, to: undefined })}
            >
              Clear dates
            </button>
          )}
        </div>
      )}
    </FieldPopover>
  );

  const formatField = (panelAlign: 'start' | 'end' = 'start') => (
    <FieldPopover
      align={panelAlign}
      value={current.format}
      placeholder="Format"
      icon={<ChevronIcon />}
      onOpenChange={handlePopoverOpenChange}
    >
      {({ close }) => (
        <SelectList
          options={toOptions(FORMATS)}
          value={current.format}
          anyLabel="Any format"
          onSelect={(v) => {
            update({ format: v as EventFormat | undefined });
            close();
          }}
        />
      )}
    </FieldPopover>
  );

  const languageField = (panelAlign: 'start' | 'end' = 'start') => (
    <FieldPopover
      align={panelAlign}
      value={current.language}
      placeholder="Language"
      icon={<ChevronIcon />}
      onOpenChange={handlePopoverOpenChange}
    >
      {({ close }) => (
        <SelectList
          options={toOptions(LANGUAGES)}
          value={current.language}
          anyLabel="Any language"
          onSelect={(v) => {
            update({ language: v });
            close();
          }}
        />
      )}
    </FieldPopover>
  );

  return (
    <div className={`${styles.searchWrapper} ${isPage ? styles.pageVariant : ''}`}>
      {/* ── Desktop pill ── */}
      <div className={styles.pill}>
        <div className={styles.fields}>
          {locationField()}
          {datesField()}
          {formatField()}
          {languageField('end')}
        </div>

        <button
          className={`${styles.searchBtn} ${isPage ? styles.searchBtnOutline : ''}`}
          type="button"
          onClick={onSubmit}
        >
          Search event
        </button>
      </div>

      {/* ── Mobile card ── */}
      <div className={styles.mobileCard}>
        {locationField()}
        {datesField()}
        <div className={styles.mobileRow}>
          {formatField()}
          {languageField('end')}
        </div>
        <button
          className={`${styles.searchBtn} ${styles.searchBtnMobile} ${isPage ? styles.searchBtnOutline : ''}`}
          type="button"
          onClick={onSubmit}
        >
          Search event
        </button>
      </div>
    </div>
  );
}

// ── A single search field: trigger button + dropdown panel ───────
interface FieldPopoverProps {
  value?: string;
  placeholder: string;
  icon: ReactNode;
  align?: 'start' | 'end';
  onOpenChange?: (open: boolean) => void;
  children: (helpers: { close: () => void }) => ReactNode;
}

function FieldPopover({
  value,
  placeholder,
  icon,
  align = 'start',
  onOpenChange,
  children,
}: FieldPopoverProps) {
  return (
    <Popover
      className={styles.fieldRoot}
      align={align}
      onOpenChange={onOpenChange}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          className={styles.field}
          onClick={toggle}
          aria-expanded={open}
        >
          <span className={`${styles.fieldLabel} ${value ? '' : styles.muted}`}>
            {value ?? placeholder}
          </span>
          <span className={styles.fieldIcon}>{icon}</span>
        </button>
      )}
    >
      {(helpers) => children(helpers)}
    </Popover>
  );
}
