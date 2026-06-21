import Button from '@/components/Button';
import PurchaseDeadline from '@/components/PurchaseDeadline';
import type { Event, EventSchedule } from '@/data/events';
import styles from './EventDetailHero.module.scss';

interface EventDetailHeroProps {
  event: Event;
  schedule: EventSchedule;
}

export default function EventDetailHero({ event, schedule }: EventDetailHeroProps) {
  return (
    <section className={styles.hero} aria-label={event.title}>
      {/* Decorative dot textures fade in at the top corners (desktop only) */}
      <span className={`${styles.dots} ${styles.dotsLeft}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsRight}`} aria-hidden />

      <div className="wrapper">
        <div className={styles.inner}>
          {/* ── Schedule chips ── */}
          <div className={styles.filters}>
            <span className={styles.filter}>{schedule.dateRange}</span>
            <span className={styles.filter}>{schedule.timeRange}</span>
            <a href="#location" className={`${styles.filter} ${styles.filterDark}`}>
              See location
            </a>
          </div>

          {/* ── Title ── */}
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{event.title}</h1>
            <p className={styles.subtitle}>
              From hackathons to conferences — we connect people with events.
              Everything in one place.
            </p>
          </div>

          {/* ── Buy ── */}
          <div className={styles.purchase}>
            <div className={styles.price}>
              {event.price === 0 ? (
                <span className={styles.priceValue}>Free</span>
              ) : (
                <>
                  <span className={styles.priceFrom}>from</span>
                  <span className={styles.priceValue}>${event.price}</span>
                </>
              )}
            </div>

            <Button variant="primary" href="#tickets" className={styles.buy}>
              Buy ticket
            </Button>

            <div className={styles.note}>
              <PurchaseDeadline offsetHours={schedule.deadlineOffsetHours} />
              <p className={styles.disclaimer}>
                All purchases are made directly from the organizer*
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
