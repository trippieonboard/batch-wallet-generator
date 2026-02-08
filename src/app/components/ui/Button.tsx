'use client';

import { ReactNode } from 'react';
import { Spinner } from './Spinner';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-out flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95 disabled:bg-gray-50 disabled:cursor-not-allowed',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed',
  };

  const finalClassName = baseClasses + ' ' + variantClasses[variant] + ' ' + className;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={finalClassName}
    >
      {loading && <Spinner className='w-4 h-4' />}
      {children}
    </button>
  );
}