'use client';

import { useState } from 'react';
import styles from './FaqSection.module.scss';

// Questions come from the Figma "5. faq" frame (#350:307). Only the second item
// has real answer copy in the design; the rest get placeholder text until the
// real answers are provided.
const PLACEHOLDER =
  'Placeholder answer — replace with the real copy once it’s available.';

const FAQS = [
  {
    q: 'Are all events on the platform up to date?',
    a: PLACEHOLDER,
  },
  {
    q: 'Is there a commission on tickets?',
    a: 'No! We do not charge a commission for tickets and never will. Furthermore, we do not even sell tickets… All purchases are made exclusively on the organizers’ website.',
  },
  {
    q: 'How much does it cost to post an event on the website?',
    a: PLACEHOLDER,
  },
  {
    q: 'How do I add my event?',
    a: PLACEHOLDER,
  },
];

export default function FaqSection() {
  // Each question opens/closes independently. The Figma desktop frame shows the
  // second question expanded by default, so we mirror that initial state.
  const [open, setOpen] = useState<Set<number>>(() => new Set([1]));

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className={styles.faq} aria-label="Frequently asked questions">
      <div className={styles.inner}>
        <h2 className={styles.title}>
          In case <span className={styles.accent}>you have questions</span> left.
        </h2>

        <div className={styles.list}>
          {FAQS.map((item, index) => {
            const isOpen = open.has(index);
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={item.q}
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.header}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className={styles.question}>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <span className={styles.iconBar} />
                    <span className={`${styles.iconBar} ${styles.iconBarV}`} />
                  </span>
                </button>

                <div id={panelId} className={styles.answerWrap} role="region">
                  <div className={styles.answerInner}>
                    <div className={styles.answerBody}>
                      <span className={styles.divider} />
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
