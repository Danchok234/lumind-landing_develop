'use client';

import styles from './WhyUsSection.module.scss';
import Button from '../Button/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// ── 0% decorative icon (Figma MCP export) ───────────────────
const IMG_ZERO_PERCENT = '/why-us-zero-percent.svg';

export default function WhyUsSection() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.whyUs} aria-label="Why us">
      <div className={styles.inner}>
        {/* ── Section header (kept at desktop sizing on all viewports) ── */}
        <header className={styles.header}>
          <h2 className={styles.title}>
            Reasons, why participants{' '}
            <span className={styles.accent}>choose us every time</span>
          </h2>
          <p className={styles.subtitle}>
            From hackathons to conferences - we connect people with the events
            that matter. Everything in one place. From hackathons to conferences
          </p>
        </header>

        {/* ── Cards: grid on desktop, flex on mobile/tablet ── */}
        <div ref={ref} className={`${styles.cards} ${revealed ? styles.revealed : ''}`}>
        {/* Purple block */}
          <article className={styles.block}>
            <div className={styles.blockText}>
              <h3 className={styles.blockTitle}>
                Buy from organizators, zero commissions
              </h3>
              <p className={styles.blockDesc}>
                Ты всегда знаешь, куда переходишь. Все билеты оформляются
                напрямую, без лишних шагов и неожиданных надбавок.
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG_ZERO_PERCENT}
              alt="0% commission"
              width={190}
              height={90}
              className={styles.blockIcon}
            />
          </article>

          {/* White block — 1000+ organisations */}
          <article className={`${styles.block} ${styles.blockLight}`}>
            {/* 1000+ SVG: absolute on desktop, in-flow on smaller screens */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/1000-plus.svg"
              alt=""
              aria-hidden
              className={styles.blockIcon}
            />

            <div className={styles.blockText}>
              <h3 className={styles.blockTitle}>
                We&apos;ve partnered with 1000+ organizations
              </h3>
              <p className={styles.blockDesc}>
                Выбора много. Очень. С каждым днем всё больше организаций
                выбирает нас, а это значит, что наша база данных расширяется
              </p>
            </div>
          </article>
          <article className={`${styles.block} ${styles.blockThird}`}>
            <div className={styles.blockText}>
              <div className={styles.textContent}>
                <h3 className={styles.blockTitle}>
                  The <span>right</span> events, <span>right</span> when you need them.
                </h3>
                <p className={styles.blockDesc}>
                  Your recommendations reflect who you want to become. With personalized search and <span>AI-driven</span> recommendations, we help you discover the right opportunities in one click.
                </p>
              </div>
              <Button variant='secondary' className={styles.thirdBtn}>Try out AI search</Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
