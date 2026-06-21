'use client';

import styles from './StepsSection.module.scss';
import { useScrollProgress } from '@/hooks/useScrollProgress';

// Each card gets an equal slice of the cards row's reveal progress (0→1) to
// animate in. A small gap between slices keeps reveals from overlapping.
const SLICE = 1 / 3;
const cardProgress = (progress: number, index: number) => {
  const start = index * SLICE;
  const local = (progress - start) / (SLICE * 0.8);
  return Math.min(1, Math.max(0, local));
};

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
  // Title is untouched (no animation) so it holds still. The cards row's
  // visibility ratio drives each card in, one by one, as it scrolls into
  // view — reversible, no scroll listeners, no artificial tall sections.
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section className={styles.steps} aria-label="How it works">
      <div className={styles.inner}>
        {/* ── Section title (mobile copy, two-tone, centered) ── */}
        <h2 className={styles.title}>
          We believe that{' '}
          <span className={styles.accent}>simpler is easier</span>
        </h2>

        {/* ── Cards: glassmorphism row over a blurred backdrop ── */}
        <div ref={ref} className={styles.cards}>
          {STEPS.map((step, i) => {
            const p = cardProgress(progress, i);
            return (
              <article
                key={step.n}
                className={styles.card}
                style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}
              >
                <span className={styles.badge}>{step.n}</span>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDesc}>{step.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
