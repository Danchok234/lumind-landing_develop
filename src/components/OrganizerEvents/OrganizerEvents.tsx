import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import type { Event } from '@/data/events';
import styles from './OrganizerEvents.module.scss';

// Profile page only teases a handful — the rest live behind "See more".
const VISIBLE_COUNT = 3;

interface OrganizerEventsProps {
  organizerShortName: string;
  events: Event[];
}

export default function OrganizerEvents({ organizerShortName, events }: OrganizerEventsProps) {
  if (events.length === 0) return null;

  const visible = events.slice(0, VISIBLE_COUNT);

  return (
    <section className={styles.section} aria-label={`Upcoming events from ${organizerShortName}`}>
      <div className="wrapper">
        <h2 className={styles.heading}>
          Upcoming events from <span className={styles.brand}>«{organizerShortName}»</span>
        </h2>

        <div className={styles.grid}>
          {visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {events.length > VISIBLE_COUNT && (
          <Button variant="secondary" className={styles.seeMore}>
            See more
          </Button>
        )}
      </div>
    </section>
  );
}
