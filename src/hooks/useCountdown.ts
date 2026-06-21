'use client';

import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Becomes true only after the timer has hydrated on the client. */
  ready: boolean;
  /** True once the deadline has passed. */
  expired: boolean;
}

const EMPTY: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  ready: false,
  expired: false,
};

/**
 * Counts down to `now + offsetHours`, where "now" is captured on mount.
 *
 * The deadline is resolved client-side (in an effect) so the same markup
 * renders on the server, avoiding hydration mismatches. Consumers should
 * show a neutral placeholder while `ready` is false.
 */
export function useCountdown(offsetHours: number): Countdown {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const t = Date.now() + offsetHours * 3600 * 1000;
    setTarget(t);
    setNow(Date.now());

    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [offsetHours]);

  if (target == null) return EMPTY;

  const diff = Math.max(0, target - now);
  const totalSec = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    ready: true,
    expired: diff === 0,
  };
}
