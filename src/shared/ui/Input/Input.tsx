import React, { useRef } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string | null;
  maxLength?: number;
}

/**
 * Input reutilizable con label, helper text y validación de error.
 * Ideal para formularios simples (ej: login, registro, códigos, etc.)
 */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = null,
  maxLength = 255,
  onChange,
  onPaste,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\s+/g, '').slice(0, maxLength);
    e.target.value = cleanValue;
    onChange?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').trim();
    const clean = pasted.replace(/\s+/g, '').slice(0, maxLength);
    if (inputRef.current) inputRef.current.value = clean;
    e.preventDefault();
    onPaste?.(e);
    onChange?.({
      ...e,
      target: { ...e.target, value: clean },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        className={`${styles.input} ${error ? styles.errorBorder : ''}`}
        onChange={handleChange}
        onPaste={handlePaste}
        maxLength={maxLength}
        {...props}
      />

      <div className={styles.helperRow}>
        {helperText && <span className={styles.helper}>{helperText}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};
