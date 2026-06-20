import Image from 'next/image';
import styles from './HeroSection.module.scss';
import SearchBar from '@/components/SearchBar';
import HeroFloatingCards from './HeroFloatingCards';

// ── Image assets (exported by Figma MCP) ─────────────────────
const IMG_LEFT  = '/e37a4ac5c029dc0a69d231acf87985a340868406.png';
const IMG_RIGHT = '/2dba98f9629e9672ffed9fe7ac1cec393b012438.png';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* .wrapper constrains content to 1420px centered — section stays full-width for the background */}
      <div className="wrapper">
        <div className={styles.textBlock}>
          <h1 className={styles.title}>
            Find the events that truly{' '}
            <span className={styles.accent}>matter</span>
          </h1>
          <p className={styles.subtitle}>
            From hackathons to conferences — we connect people with events. Everything in one place.
          </p>
        </div>

        {/* ── Conference photo cards ── */}
        <div className={styles.imagesArea}>
          {/* Left card */}
          <div className={`${styles.card} ${styles.cardLeft}`}>
            <div className={styles.cardInner}>
              <Image
                src={IMG_LEFT}
                alt="Conference event"
                fill
                className={styles.cardImgLeft}
                sizes="(max-width: 768px) 55vw, 32vw"
              />
            </div>
            <div className={styles.cardGloss} />
          </div>

          {/* Right card */}
          <div className={`${styles.card} ${styles.cardRight}`}>
            <div className={styles.cardInner}>
              <Image
                src={IMG_RIGHT}
                alt="Annual design meeting"
                fill
                className={styles.cardImgRight}
                sizes="(max-width: 768px) 55vw, 32vw"
              />
            </div>
            <div className={styles.cardGloss} />
          </div>

          {/* ── Floating event info cards (desktop only) ── */}
          <HeroFloatingCards />
        </div>

        <SearchBar />
      </div>
    </section>
  );
}
