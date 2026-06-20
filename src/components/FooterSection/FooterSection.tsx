'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import styles from './FooterSection.module.scss';

// ── Decorative photo cards (already in /public, shared with HeroSection) ──
const IMG_FRONT = '/147fcdc4b09482e2e4f1f7b203b4e7e2692c42fe.png';
const IMG_BACK = '/88aa186813d491884a3c7701e3b4c461c6d5cc76.png';

// ── Social links (white "Negative" icons exported from Figma) ──
const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram', icon: '/social/social-instagram.svg', size: 24 },
  { href: 'https://facebook.com', label: 'Facebook', icon: '/social/social-facebook.svg', size: 24 },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: '/social/social-linkedin.svg', size: 22 },
  { href: 'https://youtube.com', label: 'YouTube', icon: '/social/social-youtube.svg', size: 24 },
];

// Footer nav mirrors the Header's section anchors.
const NAV_SECTIONS = [
  { label: 'Why us', href: '#why-us' },
  { label: 'Our advantages', href: '#advantages' },
  { label: 'Steps', href: '#steps' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

const NAV_LEGAL = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Cookies', href: '#cookies' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: boolean; email?: boolean };

export default function FooterSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const validateAndSubmit = () => {
    const nameOk = name.trim().length > 0;
    const emailOk = EMAIL_RE.test(email.trim());

    if (!nameOk || !emailOk) {
      setErrors({ name: !nameOk, email: !emailOk });
      return;
    }

    setErrors({});
    setSent(true);
  };

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.inner}>
        {/* ── Contact form card ── */}
        <div className={styles.formCard}>
          {sent ? (
            <div className={styles.form}>
              <h2 className={`${styles.title} ${styles.thankYou}`}>
                Thank you! We will{' '}
                <span className={styles.accent}>reach out soon</span> :)
              </h2>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                validateAndSubmit();
              }}
              noValidate
            >
              <div className={styles.intro}>
                <h2 className={styles.title}>
                  Your events <span className={styles.accent}>matter</span>.
                  Share them with the people who are waiting for them.
                </h2>
                <p className={styles.subtitle}>
                  We&rsquo;ll reach out to learn more about your events!
                </p>
              </div>

              <div className={styles.fields}>
                <div className={styles.fieldWrap}>
                  <input
                    type="text"
                    className={`${styles.input} ${errors.name ? styles.inputInvalid : ''}`}
                    placeholder="Name"
                    aria-label="Name"
                    aria-invalid={errors.name || undefined}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: false }));
                    }}
                  />
                  {errors.name && (
                    <span className={styles.errorChip} role="alert">
                      Incorrect filled field
                    </span>
                  )}
                </div>

                <div className={styles.fieldWrap}>
                  <input
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputInvalid : ''}`}
                    placeholder="example@gmail.com"
                    aria-label="Email"
                    aria-invalid={errors.email || undefined}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: false }));
                    }}
                  />
                  {errors.email && (
                    <span className={styles.errorChip} role="alert">
                      Incorrect filled field
                    </span>
                  )}
                </div>

                <Button type="submit" className={styles.submit}>
                  Contact us!
                </Button>

                <p className={styles.privacy}>
                  By sending form you agree to{' '}
                  <a href="#privacy" className={styles.privacyLink}>
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          )}

          {/* Decorative overlapping event photos */}
          <div className={styles.collage} aria-hidden="true">
            <div className={`${styles.dots} ${styles.dotsTopRight}`} />
            <div className={`${styles.dots} ${styles.dotsBottomLeft}`} />
            <div className={`${styles.photo} ${styles.photoBack}`}>
              <Image
                src={IMG_BACK}
                alt=""
                fill
                className={styles.photoImg}
              />
              <span className={styles.photoGloss} />
            </div>
            <div className={`${styles.photo} ${styles.photoFront}`}>
              <Image
                src={IMG_FRONT}
                alt=""
                fill
                sizes="(max-width: 1024px) 40vw, 26vw"
                className={styles.photoImg}
              />
              <span className={styles.photoGloss} />
            </div>
          </div>
        </div>

        {/* ── Footer bottom: brand + nav + copyright ── */}
        <div className={styles.bottom}>
          <div className={styles.bottomMain}>
            <div className={styles.brand}>
              <span className={styles.brandName}>Lumind.space</span>
              <p className={styles.brandTagline}>
                Space that connects people and knowledge
              </p>
              <ul className={styles.socials}>
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className={styles.social}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={s.icon} alt="" width={s.size} height={s.size} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav className={styles.navGroup} aria-label="Footer">
              <ul className={styles.navCol}>
                {NAV_SECTIONS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={styles.navLink}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className={styles.navCol}>
                {NAV_LEGAL.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={styles.navLink}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className={styles.copyright}>
            Lumind.space 2026 | Design by Mariia Vynohradska
          </p>
        </div>
      </div>
    </footer>
  );
}
