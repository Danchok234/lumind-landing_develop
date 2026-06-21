'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import { INITIAL_VISIBLE, LOAD_STEP, type Event } from '@/data/events';
import styles from './EventsList.module.scss';

interface EventsListProps {
  /** Already-filtered, already-sorted events to render. */
  events: Event[];
}

/**
 * Card grid with progressive "Load more" reveal. Filtering/sorting happens
 * upstream in EventsBrowser; this component only paginates what it's given.
 */
export default function EventsList({ events }: EventsListProps) {
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const total = events.length;
  const shown = events.slice(0, visible);
  const hasMore = visible < total;
  const progress = total ? Math.round((Math.min(visible, total) / total) * 100) : 0;

  const loadMore = () => setVisible((v) => Math.min(v + LOAD_STEP, total));

  return (
    <div className={styles.inner}>
      <div className={styles.grid}>
        {shown.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMore}>
          <p className={styles.count}>
            {Math.min(visible, total)} of {total}
          </p>
          <div className={styles.progressTrack}>
            <span className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <Button variant="secondary" className={styles.loadBtn} onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
