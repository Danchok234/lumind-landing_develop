import styles from './HeroFloatingCards.module.scss';

// ── Logo assets (exported by Figma MCP) ──────────────────────
const LOGO_ORANGE  = '/bdfe4c539c9259b739cd47aed46ed118339e1a6a.png';
const LOGO_ELEVATE = '/e255a0bf116e635fd175f4a0f11a4274ba54e817.png';

export default function HeroFloatingCards() {
  return (
    <>
      {/* ── Decorative dot grids ──────────────────────────────────────────
          z-index: 0 → below photo cards (1-2) → below info cards (10)
          Positions: floating card position + relative Figma offset
          Left:  card at calc(50%-39.44rem)+7.5rem → dot offset (-6.06rem,-4.44rem)
          Right: card at calc(50%+14.69rem)+12.13rem → dot offset (-0.44rem,-9.06rem) */}
      <div className={`${styles.dots} ${styles.dotsLeft}`} />
      <div className={`${styles.dots} ${styles.dotsRight}`} />

      {/* Left floating card — Leadership training */}
      <div className={`${styles.card} ${styles.cardLeft}`}>
        {/* cardClip: overflow:clip lives here, NOT on .card, so backdrop-filter works */}
        <div className={styles.cardClip}>
          {/* White glow blob in top-right corner (Figma: bg-white blur-[35px] size-[74px]) */}
          <div className={styles.glowBlob} />
        </div>

        <div className={styles.header}>
          <div className={styles.titleCol}>
            <p className={styles.title}>Leadership training for students</p>
          </div>
          {/* Orange badge — logo at h=20.83%, l=9.49%, t=45.83%, w=81.02% of 48×48 */}
          <div className={`${styles.logoBadge} ${styles.logoBadgeOrange}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_ORANGE}
              alt="Orange"
              style={{
                position: 'absolute',
                width: '81.02%',
                height: '20.83%',
                left: '9.49%',
                top: '45.83%',
                maxWidth: 'none',
              }}
            />
          </div>
        </div>
        <p className={styles.date}>Monday, 13 Jan, 9:00, Berlin, Germany</p>
      </div>

      {/* Right floating card — UX/UI annual meeting */}
      <div className={`${styles.card} ${styles.cardRight}`}>
        <div className={styles.header}>
          <div className={styles.titleCol}>
            <p className={styles.title}>UX/UI design annual meeting</p>
          </div>
          {/* Dark badge — logo at h=20.83%, l=7.75%, t=39.58%, w=84.49% of 48×48 */}
          <div className={`${styles.logoBadge} ${styles.logoBadgeDark}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_ELEVATE}
              alt="Elevate"
              style={{
                position: 'absolute',
                width: '84.49%',
                height: '20.83%',
                left: '7.75%',
                top: '39.58%',
                maxWidth: 'none',
              }}
            />
          </div>
        </div>
        <p className={styles.date}>Friday, 28 Apr, 12:30, Paris, France</p>
      </div>
    </>
  );
}
