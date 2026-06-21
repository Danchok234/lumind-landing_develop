'use client';

import { FormEvent, useState } from 'react';
import Button from '@/components/Button';
import styles from './OrganizerBenefits.module.scss';

const BENEFITS = [
  {
    title: 'Direct access to the right audience',
    desc: 'Your event reaches people who are interested in the topic. No random traffic — only a relevant audience that cares and engages.',
  },
  {
    title: 'Build trust through ratings and reputation',
    desc: 'People don’t just choose events — they choose organizers. Ratings, feedback, and event history help you earn trust before the first click.',
  },
  {
    title: 'Become a part of one educational ecosystem',
    desc: 'Your event becomes part of a space where people actively explore and plan their future. More visibility, stronger recognition, and long-term value beyond a single event.',
  },
];

export default function OrganizerBenefits() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.benefits} aria-label="Advantages for organizers">
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Built for organizers who <span className={styles.accent}>care</span>
        </h2>

        <div className={styles.cards}>
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDesc}>{benefit.desc}</p>
            </article>
          ))}
        </div>

        <div className={styles.cta} id="contact">
          {/* Decorative dot textures fading from opposite corners */}
          <span className={`${styles.ctaDots} ${styles.ctaDotsTopLeft}`} aria-hidden />
          <span className={`${styles.ctaDots} ${styles.ctaDotsBottomRight}`} aria-hidden />

          <h3 className={styles.ctaTitle}>
            Your events matter. Share them with the people who are waiting for them.
          </h3>

          {submitted ? (
            <p className={styles.ctaSuccess}>Thanks! We&apos;ll reach out shortly.</p>
          ) : (
            <>
              <form className={styles.ctaForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Enter your e-mail"
                  aria-label="Email address"
                  className={styles.ctaInput}
                />
                <Button type="submit" variant="primary" className={styles.ctaButton}>
                  Contact us!
                </Button>
              </form>
              <p className={styles.ctaHint}>
                We&apos;ll reach out to learn more about your events!
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
