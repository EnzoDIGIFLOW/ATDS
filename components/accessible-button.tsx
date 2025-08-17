"use client"

import React, { forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  loadingText?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  iconOnly?: boolean
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({
    children,
    variant = 'default',
    size = 'default',
    loading = false,
    loadingText = 'Chargement en cours...',
    ariaLabel,
    ariaDescribedBy,
    iconOnly = false,
    className,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Permettre l'activation avec Entrée et Espace
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (!loading && !disabled) {
          onClick?.(event as any)
        }
      }
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          // Focus visible
          'focus:outline-none focus:ring-2 focus:ring-temple-pink focus:ring-offset-2',
          // Disabled state
          disabled && 'cursor-not-allowed opacity-50',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className={iconOnly ? 'sr-only' : ''}>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'