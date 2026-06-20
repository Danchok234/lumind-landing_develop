'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AdvantagesSection.module.scss';

// Decorative "before" pills — faded translucent bars that fill the lower part
// of the purple block (Figma desktop #350:338 / mobile #350:556). Purely
// decorative: empty rounded chips at 25% opacity, arranged in rows that
// overflow and are clipped by the rounded block.
const PILL_ROWS = [3, 4, 3, 2, 3];

// Week-day columns for the second block's faded calendar (Figma #350:366).
// Desktop shows Mon–Sun; mobile (Figma #350:584) shows Mon–Fri — the last two
// are hidden via CSS.
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Sample event chips placed over the calendar (Figma #350:390/393/396).
// Desktop shows all three; mobile drops the green one via CSS.
const EVENT_PILLS = [
  styles.eventYellow,
  styles.eventGreen,
  styles.eventPurple,
];

export default function AdvantagesSection() {
  // The title is `position: sticky` so it stays visible through the whole
  // card-stacking animation. But a sticky element with the smallest top offset
  // is the LAST to scroll away, so without help the title lingers over empty
  // space after the deck is gone. We watch the last (front) card and hide the
  // title the moment that card has scrolled above the title's pinned position.
  const lastCardRef = useRef<HTMLElement>(null);
  const [titleHidden, setTitleHidden] = useState(false);

  useEffect(() => {
    const el = lastCardRef.current;
    if (!el) return;

    // No stacking animation under reduced-motion → title is static, nothing to do.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // Title pins ~40px from the top (30px on mobile) and is ~60px tall; once
      // the front card's bottom passes above that band, every card is gone.
      const pinnedBottom =150;
      setTitleHidden(el.getBoundingClientRect().bottom < pinnedBottom);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.advantages} aria-label="Advantages">
      <div className={styles.inner}>
        {/* ── Section title (mobile copy, two-tone) ── */}
        <h2
          className={`${styles.title} ${titleHidden ? styles.titleHidden : ''}`}
        >
          It used to be complicated,{' '}
          <span className={styles.accent}>but we fixed it</span>
        </h2>

        {/* ── Cards: single full-width column ── */}
        <div className={styles.cards}>
          {/* First block — purple "before" block */}
          <article className={`${styles.block} ${styles.blockPurple}`}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>
                Where your interests shape your opportunities.
              </h3>
              <p className={styles.blockDesc}>
                LuMind transforms endless listings into a focused discovery
                experience — where every event aligns with your interests,
                ambitions, and professional path.
              </p>
            </div>

            {/* Decorative faded pills (background) */}
            <div className={styles.pills} aria-hidden="true">
              {PILL_ROWS.map((count, rowIndex) => (
                <div key={rowIndex} className={styles.pillRow}>
                  {Array.from({ length: count }).map((_, i) => (
                    <span key={i} className={styles.pill} />
                  ))}
                </div>
              ))}
            </div>
          </article>

          {/* Second block — white "structured by time" block */}
          <article className={`${styles.block} ${styles.blockWhite}`}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Always in the right time.</h3>
              <p className={styles.blockDesc}>
                LuMind turns scattered dates into a clear roadmap — helping you
                discover, prepare, and participate before opportunities pass.
              </p>
            </div>

            {/* Decorative faded week calendar with floating event chips */}
            <div className={styles.calendar} aria-hidden="true">
              <div className={styles.days}>
                {WEEK_DAYS.map((day) => (
                  <div key={day} className={styles.day}>
                    <span className={styles.dayLabel}>{day}</span>
                    <span className={styles.dayLine} />
                  </div>
                ))}
              </div>

              <div className={styles.events}>
                {EVENT_PILLS.map((colorClass, i) => (
                  <div key={i} className={`${styles.event} ${colorClass}`}>
                    <span className={styles.eventText}>
                      Java Hackathon in Paris, 12 Jun
                    </span>
                    <span className={styles.eventDot} />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Third block — black "one shared space" block */}
          <article
            ref={lastCardRef}
            className={`${styles.block} ${styles.blockDark}`}
          >
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>
                All the events that matter in one{' '}
                <em className={styles.emphasis}>space</em>
              </h3>
              <p className={styles.blockDesc}>
                No more jumping between platforms, chats, and random links.
                <br />
                LuMind brings the entire educational ecosystem into one clear,
                structured, and easy to explore space.
              </p>
            </div>

            {/* Decorative faded stack of Safari-style browser windows */}
            <div className={styles.windowStack} aria-hidden="true">
              <div className={`${styles.window} ${styles.windowBack1}`}>
                <WindowBar />
              </div>
              <div className={`${styles.window} ${styles.windowBack2}`}>
                <WindowBar />
              </div>
              <div className={`${styles.window} ${styles.windowFront}`}>
                <WindowBar />
                <div className={styles.windowBody} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

// Safari-style toolbar: traffic-light controls on the left, faint tool icons
// on the right (Figma #350:407/417/427).
function WindowBar() {
  return (
    <div className={styles.windowBar}>
      <span className={styles.traffic}>
        <i className={styles.trafficRed} />
        <i className={styles.trafficYellow} />
        <i className={styles.trafficGreen} />
      </span>
      <span className={styles.barTools}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
