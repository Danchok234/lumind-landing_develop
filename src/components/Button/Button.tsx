'use client';

import React, { useRef, MouseEvent } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  /** Render as an anchor tag */
  href?: string;
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled,
  href,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  // Light follows cursor on the X axis (Figma spec)
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    el.style.setProperty('--glow-x', `${x - 68}px`);
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.removeProperty('--glow-x');
  };

  const variantClass =
    variant === 'primary'
      ? styles['btn--primary']
      : variant === 'secondary'
      ? styles['btn--secondary']
      : styles['btn--disabled'];

  const isDisabled = disabled || variant === 'disabled';

  const sharedProps = {
    ref: btnRef as never,
    className: [styles.btn, variantClass, className].filter(Boolean).join(' '),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href && !isDisabled) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}
