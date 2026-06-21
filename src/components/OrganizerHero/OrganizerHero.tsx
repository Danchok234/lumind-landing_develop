import Image from 'next/image';
import type { OrganizerProfile } from '@/data/events';
import styles from './OrganizerHero.module.scss';

interface OrganizerHeroProps {
  organizer: OrganizerProfile;
}

export default function OrganizerHero({ organizer }: OrganizerHeroProps) {
  return (
    <section className={styles.hero} aria-label={`${organizer.name} — organizer profile`}>
      {/* Decorative dot textures fade in at the top corners (desktop only) */}
      <span className={`${styles.dots} ${styles.dotsLeft}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsRight}`} aria-hidden />

      <div className="wrapper">
        <div className={styles.intro}>
          <span className={styles.logo}>
            <Image src={organizer.logo} alt="" width={60} height={60} />
          </span>

          <h1 className={styles.title}>{organizer.shortName} events</h1>
          <p className={styles.subtitle}>{organizer.tagline}</p>
        </div>

        <div className={styles.stats}>
          {organizer.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
