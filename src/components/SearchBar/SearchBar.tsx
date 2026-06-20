import Image from 'next/image';
import styles from './SearchBar.module.scss';

// ── Asset paths ───────────────────────────────────────────────
const CHEVRON  = '/7fbf5d6baad229dc72411dbca4c3c39ef7336495.svg'; // chevron-down, 70% opacity

// Inline lucide-style calendar SVG (no external dep needed)
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── Desktop fields config ─────────────────────────────────────
const FIELDS = [
  { label: 'Prague',   muted: false, icon: 'chevron' },
  { label: 'Dates',    muted: true,  icon: 'calendar' },
  { label: 'Format',   muted: true,  icon: 'chevron'  },
  { label: 'Language', muted: true,  icon: 'chevron'  },
] as const;

export default function SearchBar() {
  return (
    <div className={styles.searchWrapper}>

      {/* ── Desktop pill ── */}
      <div className={styles.pill}>
        <div className={styles.fields}>
          {FIELDS.map(({ label, muted, icon }) => (
            <button key={label} className={styles.field} type="button">
              <span className={`${styles.fieldLabel} ${muted ? styles.muted : ''}`}>
                {label}
              </span>
              <span className={styles.fieldIcon}>
                {icon === 'calendar'
                  ? <CalendarIcon />
                  : <Image src={CHEVRON} alt="" width={24} height={24} />
                }
              </span>
            </button>
          ))}
        </div>

        <button className={styles.searchBtn} type="button">
          Search event
        </button>
      </div>

      {/* ── Mobile card ── */}
      <div className={styles.mobileCard}>
        {/* Row 1: location + calendar */}
        <div className={styles.mobileRow}>
          <button className={styles.mobileField} type="button">
            <span className={styles.mobileFieldLabel}>Prague</span>
            <span className={styles.calendarIcon}>
              <Image src={CHEVRON} alt="" width={24} height={24} />
            </span>
          </button>
          <button className={styles.mobileIconBtn} type="button" aria-label="Pick dates">
            <span className={styles.calendarIcon}>
              <CalendarIcon />
            </span>
          </button>
        </div>

        {/* Row 2: language + calendar */}
        <div className={styles.mobileRow}>
          <button className={styles.mobileField} type="button">
            <span className={`${styles.mobileFieldLabel} ${styles.muted}`} style={{ opacity: 0.5 }}>
              Language
            </span>
            <span className={styles.calendarIcon}>
              <Image src={CHEVRON} alt="" width={24} height={24} />
            </span>
          </button>
          <button className={styles.mobileIconBtn} type="button" aria-label="Pick format">
            <span className={styles.calendarIcon}>
              <CalendarIcon />
            </span>
          </button>
        </div>

        {/* Row 3: Search CTA */}
        <button className={`${styles.searchBtn} ${styles.searchBtnMobile}`} type="button">
          Search event
        </button>
      </div>

    </div>
  );
}
