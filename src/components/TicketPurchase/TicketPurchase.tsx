'use client';

import Button from '@/components/Button';
import { useCountdown } from '@/hooks/useCountdown';
import { getTicketPerks } from '@/data/events';
import type { Event, EventSchedule, PerkIconName } from '@/data/events';
import styles from './TicketPurchase.module.scss';

interface TicketPurchaseProps {
  event: Event;
  schedule: EventSchedule;
}

// ── Inline icons (currentColor so they inherit the row color) ─────
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.icon}>
      <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <rect x="4" y="5" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth={1.8} />
      <path d="M4 10h16" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.icon}>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth={1.8} />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.icon}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  );
}
function LevelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.icon}>
      <rect x="3" y="13" width="4" height="7" rx="1" fill="currentColor" />
      <rect x="10" y="9" width="4" height="11" rx="1" fill="currentColor" />
      <rect x="17" y="4" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.checkIcon}>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
// Perk icons, selected by name from the event's derived perks.
function PerkIcon({ name }: { name: PerkIconName }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
    className: styles.perkIcon,
  } as const;

  switch (name) {
    case 'cap':
      return (
        <svg {...common}>
          <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M6.5 10.8V15c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.2M21.5 8.5V14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'seats':
      return (
        <svg {...common}>
          <path d="M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M5 11a2 2 0 0 1 2 2v3h10v-3a2 2 0 0 1 4 0v5H3v-5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M6 19v1.5M18 19v1.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      );
    case 'fire':
      return (
        <svg {...common}>
          <path d="M12 3s5 3.5 5 8.5a5 5 0 1 1-10 0c0-1.7.8-3 1.6-4 .2 1 .9 1.8 1.8 2 0-2 .6-4.5 1.6-6.5Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
        </svg>
      );
    case 'ticket':
      return (
        <svg {...common}>
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M14 6v2M14 11v2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      );
    case 'discount':
      return (
        <svg {...common}>
          <path d="M4 12.5 11.5 5H19v7.5L11.5 20 4 12.5Z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
          <circle cx="15" cy="9" r="1.3" fill="currentColor" />
        </svg>
      );
  }
}

const INCLUDED = [
  'Full access to all talks & workshops',
  'Networking lounge and after-party',
  'Lunch, snacks and unlimited coffee',
  'Certificate of attendance',
];

export default function TicketPurchase({ event, schedule }: TicketPurchaseProps) {
  const { days, hours, minutes, seconds, ready, expired } = useCountdown(
    schedule.deadlineOffsetHours,
  );

  const units: { value: number; label: string }[] = [
    { value: days, label: 'days' },
    { value: hours, label: 'hours' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'sec' },
  ];

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const priceLabel = event.price === 0 ? 'Free' : `$${event.price}`;
  const perks = getTicketPerks(event);

  return (
    <section id="tickets" className={styles.section} aria-label="Get your ticket">
      <div className="wrapper">
        <div className={styles.head}>
          <h2 className={styles.title}>Secure your spot</h2>
          <p className={styles.subtitle}>
            Tickets are sold directly by the organizer. Reserve yours before the
            deadline — prices rise as the event fills up.
          </p>
        </div>

        <div className={styles.card}>
          {/* ── Left: event details + what's included ── */}
          <div className={styles.details}>
            <h3 className={styles.eventName}>{event.title}</h3>

            <ul className={styles.metaList}>
              <li className={styles.metaItem}>
                <CalendarIcon />
                <span>{schedule.dateRange}</span>
              </li>
              <li className={styles.metaItem}>
                <ClockIcon />
                <span>{schedule.timeRange}</span>
              </li>
              <li className={styles.metaItem}>
                <PinIcon />
                <span>{event.location}</span>
              </li>
              <li className={styles.metaItem}>
                <LevelIcon />
                <span>{event.level}</span>
              </li>
            </ul>

            <div className={styles.included}>
              <span className={styles.includedTitle}>What&rsquo;s included</span>
              <ul className={styles.includedList}>
                {INCLUDED.map((item) => (
                  <li key={item} className={styles.includedItem}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: purchase panel ── */}
          <div className={styles.panel}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>Standard ticket</span>
              <div className={styles.priceRow}>
                {event.price !== 0 && <span className={styles.from}>from</span>}
                <span className={styles.priceValue}>{priceLabel}</span>
              </div>
            </div>

            <div className={styles.countdown}>
              <span className={styles.countdownLabel}>
                {expired ? 'Sales have closed' : 'Offer ends in'}
              </span>
              <div className={styles.timer} aria-hidden={!ready}>
                {units.map((u) => (
                  <div key={u.label} className={styles.unit}>
                    <span className={styles.unitValue}>
                      {ready ? pad(u.value) : '--'}
                    </span>
                    <span className={styles.unitLabel}>{u.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant={expired ? 'disabled' : 'primary'}
              className={styles.buy}
            >
              {expired ? 'Sales closed' : 'Buy ticket'}
            </Button>

            <p className={styles.secure}>
              Secure checkout · Free cancellation up to 48h before the event
            </p>

            {/* ── Event-specific perks / notices ── */}
            {perks.length > 0 && (
              <div className={styles.perks}>
                {perks.map((perk) => (
                  <div
                    key={perk.id}
                    className={`${styles.perk} ${styles[`perk_${perk.tone}`]}`}
                  >
                    <PerkIcon name={perk.icon} />
                    <div className={styles.perkCopy}>
                      <span className={styles.perkTitle}>{perk.title}</span>
                      <span className={styles.perkText}>{perk.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
