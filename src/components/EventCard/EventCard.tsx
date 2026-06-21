'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { getOrganizerSlugByName, type Event } from '@/data/events';
import styles from './EventCard.module.scss';

const STAR = '/icons/star-filled.svg';
const HEART = '/icons/heart.svg';
const SHARE = '/icons/share.svg';

// ── Small inline icons (kept gray to match the meta rows) ─────────
function PinIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={styles.metaIcon}>
      <path
        d="M9 1.5C5.7 1.5 3 4.19 3 7.5c-.02 4.83 5.34 8.7 5.57 8.87a.75.75 0 0 0 .86 0C9.66 16.2 15.02 12.34 15 7.5 15 4.19 12.31 1.5 9 1.5Zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.metaIcon}>
      <path
        d="M9 4v3.2M15.4 4v3.2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="5" y="5.6" width="14.4" height="14.4" rx="1.6" stroke="currentColor" strokeWidth={2} />
      <path d="M5 10.4h14.4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={styles.metaIcon}>
      <rect x="3" y="13" width="4" height="7" rx="1" fill="currentColor" />
      <rect x="10" y="9" width="4" height="11" rx="1" fill="currentColor" />
      <rect x="17" y="4" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [liked, setLiked] = useState(false);

  const {
    title,
    category,
    tag,
    image,
    organizer,
    rating,
    location,
    date,
    duration,
    level,
    price,
  } = event;

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        {/* ── Image with overlays ── */}
        <div className={styles.imageWrap}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={styles.image}
          />

          <div className={styles.badges}>
            <span className={styles.categoryChip}>{category}</span>
            {tag && (
              <span className={`${styles.tagChip} ${styles[`tag_${tag.color}`]}`}>
                {tag.label}
              </span>
            )}
          </div>

          <div className={styles.imageActions}>
            <button
              type="button"
              className={`${styles.iconBtn} ${liked ? styles.iconBtnActive : ''}`}
              aria-pressed={liked}
              aria-label={liked ? 'Remove from saved' : 'Save event'}
              onClick={() => setLiked((v) => !v)}
            >
              <Image src={HEART} alt="" width={20} height={20} />
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Share event">
              <Image src={SHARE} alt="" width={20} height={20} />
            </button>
          </div>

          <div className={styles.organizer}>
            Organized by{' '}
            <Link href={`/organizer/${getOrganizerSlugByName(organizer)}`} className={styles.organizerName}>
              {organizer}
            </Link>
          </div>
        </div>

        {/* ── Title + primary meta ── */}
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <Image src={STAR} alt="" width={18} height={18} />
              {rating.toFixed(1)}
            </span>
            <span className={styles.metaItem}>
              <PinIcon />
              {location}
            </span>
            <span className={styles.metaItem}>
              <CalendarIcon />
              {date}
            </span>
          </div>
        </div>

        {/* ── Detail pills ── */}
        <div className={styles.pills}>
          <span className={styles.pill}>
            <CalendarIcon />
            {duration}
          </span>
          <span className={styles.pill}>
            <LevelIcon />
            {level}
          </span>
          <span className={styles.pill}>
            <PinIcon />
            {location}
          </span>
        </div>
      </div>

      {/* ── Footer: price + CTA ── */}
      <div className={styles.footer}>
        <span className={styles.price}>
          {price === 0 ? (
            <strong className={styles.priceValue}>Free</strong>
          ) : (
            <>
              from <strong className={styles.priceValue}>${price}</strong>
            </>
          )}
        </span>
        <Button variant="primary" className={styles.cta} href={`/event/${event.id}`}>
          View event
        </Button>
      </div>
    </article>
  );
}
