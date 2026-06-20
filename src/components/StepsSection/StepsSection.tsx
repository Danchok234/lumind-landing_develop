import styles from './StepsSection.module.scss';

// Three steps — copy taken from the DESKTOP design (Figma #350:321), kept
// identical across every viewport. The mobile design (#350:643, mislabeled
// "why us" in Figma) only supplies the section title.
const STEPS = [
  {
    n: 1,
    title: 'Start exploring',
    desc: 'LuMind brings relevant events into focus, so discovery feels easy, not exhausting.',
  },
  {
    n: 2,
    title: 'Feel the match',
    desc: 'See trusted details, ratings, and context. Understand what an event is about and whether it’s right for you.',
  },
  {
    n: 3,
    title: 'Become a part of it',
    desc: 'You don’t just attend — you participate. With confidence, interest, and intention.',
  },
];

export default function StepsSection() {
  return (
    <section className={styles.steps} aria-label="How it works">
      <div className={styles.inner}>
        {/* ── Section title (mobile copy, two-tone, centered) ── */}
        <h2 className={styles.title}>
          We believe that{' '}
          <span className={styles.accent}>simpler is easier</span>
        </h2>

        {/* ── Cards: glassmorphism row over a blurred backdrop ── */}
        <div className={styles.cards}>
          {STEPS.map((step) => (
            <article key={step.n} className={styles.card}>
              <span className={styles.badge}>{step.n}</span>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
