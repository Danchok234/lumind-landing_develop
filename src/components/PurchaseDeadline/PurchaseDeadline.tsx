'use client';

import { useCountdown } from '@/hooks/useCountdown';
import styles from './PurchaseDeadline.module.scss';

interface PurchaseDeadlineProps {
  offsetHours: number;
  className?: string;
}

/** Compact red "X days Y hours purchase deadline" line used under the CTAs. */
export default function PurchaseDeadline({
  offsetHours,
  className = '',
}: PurchaseDeadlineProps) {
  const { days, hours, ready, expired } = useCountdown(offsetHours);

  const cls = [styles.deadline, className].filter(Boolean).join(' ');

  // Reserve the line height before hydration to avoid layout shift.
  if (!ready) return <p className={cls}>&nbsp;</p>;
  if (expired) return <p className={cls}>Ticket sales have closed</p>;

  return (
    <p className={cls}>
      {days} {days === 1 ? 'day' : 'days'} {hours}{' '}
      {hours === 1 ? 'hour' : 'hours'} purchase deadline
    </p>
  );
}
