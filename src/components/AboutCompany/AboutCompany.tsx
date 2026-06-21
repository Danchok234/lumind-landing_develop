import Image from 'next/image';
import styles from './AboutCompany.module.scss';

const ABOUT_LOGO = '/e255a0bf116e635fd175f4a0f11a4274ba54e817.png';

const STATS = [
  { value: '12 000+', label: 'tickets sold' },
  { value: '11 years', label: 'making events' },
  { value: '320+', label: 'events organized' },
];

interface AboutCompanyProps {
  /** Photo to show — reuses the event's own card image. */
  image: string;
  imageAlt?: string;
}

export default function AboutCompany({ image, imageAlt }: AboutCompanyProps) {
  return (
    <section className={styles.section} aria-label="About the organizer">
      <div className="wrapper">
        <div className={styles.grid}>
          <div className={styles.media}>
            <Image
              src={image}
              alt={imageAlt ?? 'A previous Elevate event'}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.brandRow}>
              <span className={styles.logo}>
                <Image src={ABOUT_LOGO} alt="" width={48} height={48} />
              </span>
              <span className={styles.brandName}>About Elevate</span>
            </div>

            <h2 className={styles.title}>
              From hackathons to conferences — we connect people
            </h2>

            <p className={styles.text}>
              For over a decade Elevate has been bringing communities together
              around the ideas that move them. From intimate workshops to
              sold-out conferences, every event is crafted to spark
              conversations and lasting connections.
              <br />
              <br />
              We handle the details so you can focus on what matters — the
              people, the talks, and the moments in between.
            </p>

            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
