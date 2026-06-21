'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Popover.module.scss';

export interface PopoverHelpers {
  open: boolean;
  close: () => void;
  toggle: () => void;
}

interface PopoverProps {
  /** Renders the clickable trigger. Use `toggle` for click-to-open menus. */
  trigger: (helpers: PopoverHelpers) => ReactNode;
  /** Renders the floating panel contents. */
  children: (helpers: PopoverHelpers) => ReactNode;
  /** Anchor the panel to the start (left) or end (right) of the trigger. */
  align?: 'start' | 'end';
  /** Open on hover/focus instead of click — used by the desktop mega-menu. */
  openOnHover?: boolean;
  className?: string;
  panelClassName?: string;
}

/**
 * Lightweight anchored popover with click-outside + Esc dismissal.
 * Shared by the search fields, sort dropdown, filter panel and mega-menu so
 * dismissal behaviour and styling stay consistent.
 */
export default function Popover({
  trigger,
  children,
  align = 'start',
  openOnHover = false,
  className = '',
  panelClassName = '',
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const helpers: PopoverHelpers = {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen((v) => !v),
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const hoverProps = openOnHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
        },
      }
    : {};

  return (
    <div className={`${styles.root} ${className}`} ref={rootRef} {...hoverProps}>
      {trigger(helpers)}
      {open && (
        <div
          className={[styles.panel, align === 'end' ? styles.alignEnd : '', panelClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {children(helpers)}
        </div>
      )}
    </div>
  );
}
