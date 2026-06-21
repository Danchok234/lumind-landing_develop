import Button from '@/components/Button';
import styles from './OrganizersHero.module.scss';

export default function OrganizersHero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Decorative dot textures fade in at the four corners (desktop only) */}
      <span className={`${styles.dots} ${styles.dotsTopLeft}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsTopRight}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsBottomLeft}`} aria-hidden />
      <span className={`${styles.dots} ${styles.dotsBottomRight}`} aria-hidden />

      <div className="wrapper">
        <div className={styles.textBlock}>
          <h1 className={styles.title}>Trusted partner in promoting events</h1>
          <p className={styles.subtitle}>
            From hackathons to conferences — we connect people with events. Everything in one place.
          </p>
          <Button variant="primary" href="#contact">
            Contact us!
          </Button>
        </div>
      </div>
    </section>
  );
}
