/**
 * Premium Badge Component - Mystic Minimalism Design
 * Redesigned with Lucide icons and proper styling
 */

import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PremiumBadge({ size = 'md', className = '' }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 bg-linear-to-r from-secondary to-amber-400 text-white font-semibold rounded-full shadow-lg',
        sizeClasses[size],
        className
      )}
    >
      <Crown className={iconSizes[size]} />
      PREMIUM
    </span>
  );
}
