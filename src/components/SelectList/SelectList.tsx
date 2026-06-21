'use client';

import styles from './SelectList.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectListProps {
  options: SelectOption[];
  /** Currently selected value, if any. */
  value?: string;
  onSelect: (value: string | undefined) => void;
  /** Prepend a row that clears the selection (e.g. "Any language"). */
  anyLabel?: string;
}

/** Compact single-select list rendered inside a Popover panel. */
export default function SelectList({ options, value, onSelect, anyLabel }: SelectListProps) {
  return (
    <ul className={styles.list} role="listbox">
      {anyLabel && (
        <li>
          <button
            type="button"
            role="option"
            aria-selected={value == null}
            className={[styles.option, value == null ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect(undefined)}
          >
            {anyLabel}
          </button>
        </li>
      )}
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <li key={opt.value}>
            <button
              type="button"
              role="option"
              aria-selected={selected}
              className={[styles.option, selected ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
