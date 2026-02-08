'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = 'glass-button inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClass = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
  }[variant];

  return (
    <button
      {...props}
      disabled={disabled}
      className={baseClass + ' ' + variantClass + ' ' + className}
    >
      {children}
    </button>
  );
}