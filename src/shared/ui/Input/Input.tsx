import React, { useRef, useState } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string | null;
  maxLength?: number;
  /** Tamaño del valor dentro del input */
  sizeVariant?: 'lg' | 'md';
}

/**
 * Input reutilizable con label flotante, helper text y validación de error.
 * Ideal para formularios simples (ej: login, registro, códigos, etc.)
 */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = null,
  maxLength = 255,
  onChange,
  onPaste,
  sizeVariant = 'lg',
  placeholder,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\s+/g, '').slice(0, maxLength);
    e.target.value = cleanValue;
    setValue(cleanValue);
    onChange?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').trim();
    const clean = pasted.replace(/\s+/g, '').slice(0, maxLength);

    if (inputRef.current) inputRef.current.value = clean;

    e.preventDefault();
    setValue(clean);

    onPaste?.(e);
    onChange?.({
      ...e,
      target: { ...e.target, value: clean },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const wrapperClassName = [
    styles.wrapper,
    isFocused ? styles.isFocused : '',
    value ? styles.isFilled : '',
    error ? styles.isError : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sizeClass =
    sizeVariant === 'md' ? styles.valueMd : styles.valueLg;

  // Si no se está mostrando el label arriba, usamos el label como placeholder
  const showLabel = !!label && (isFocused || !!value);
  const computedPlaceholder =
    !showLabel && label && !placeholder ? label : placeholder;

  return (
    <div className={wrapperClassName}>
      {showLabel && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.field}>
        <input
          ref={inputRef}
          className={`${styles.input} ${sizeClass}`}
          onChange={handleChange}
          onPaste={handlePaste}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={computedPlaceholder}
          {...props}
        />
      </div>

      <div className={styles.underline} />

      <div className={styles.helperRow}>
        {helperText && !error && (
          <span className={styles.helperText}>{helperText}</span>
        )}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </div>
  );
};
