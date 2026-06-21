'use client';

import { useRef, useState } from 'react';
import { FEEDBACKS } from '@/data/events';
import styles from './EventFeedback.module.scss';

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width={20} height={20}>
      <path
        d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface EventFeedbackProps {
  /** Whose past events the feedback refers to. Defaults to the flagship demo organizer. */
  organizerName?: string;
}

export default function EventFeedback({ organizerName = 'Elevate' }: EventFeedbackProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // One "page" == the width of a single card plus the gap between cards.
  const stepWidth = () => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const first = vp.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(vp).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  };

  const scrollToIndex = (index: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const clamped = Math.max(0, Math.min(index, FEEDBACKS.length - 1));
    vp.scrollTo({ left: clamped * stepWidth(), behavior: 'smooth' });
  };

  const onScroll = () => {
    const step = stepWidth();
    if (!step || !viewportRef.current) return;
    setActive(Math.round(viewportRef.current.scrollLeft / step));
  };

  return (
    <section className={styles.section} aria-label="Attendee feedback">
      <div className="wrapper">
        <div className={styles.head}>
          <h2 className={styles.title}>
            Feedback on previous events from{' '}
            <span className={styles.brand}>«{organizerName}»</span>
          </h2>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Previous feedback"
              onClick={() => scrollToIndex(active - 1)}
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Next feedback"
              onClick={() => scrollToIndex(active + 1)}
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>

        <div className={styles.viewport} ref={viewportRef} onScroll={onScroll}>
          {FEEDBACKS.map((fb) => (
            <article key={fb.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.person}>
                  <span className={styles.name}>{fb.name}</span>
                  <span className={styles.role}>{fb.role}</span>
                </div>
                <p className={styles.text}>{fb.text}</p>
              </div>

              <span className={styles.divider} aria-hidden />
              <span className={styles.eventLabel}>{fb.eventLabel}</span>
            </article>
          ))}
        </div>

        <div className={styles.dots} role="tablist" aria-label="Feedback pages">
          {FEEDBACKS.map((fb, i) => (
            <button
              key={fb.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to feedback ${i + 1}`}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
