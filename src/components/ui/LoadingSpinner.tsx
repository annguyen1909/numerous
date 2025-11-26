/**
 * Loading Spinner Component
 * Component hiển thị trạng thái đang tải
 */

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      {/* Main spinner with glow effect */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`${sizeClasses[size]} absolute inset-0 rounded-full bg-purple-500/20 animate-ping`} />
        
        {/* Main spinning ring */}
        <div
          className={`${sizeClasses[size]} relative border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}
          style={{ animationDuration: '1s' }}
        />
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Message with fade animation */}
      {message && (
        <p className="text-[#d4d4d8] text-center max-w-md animate-pulse">
          {message}
        </p>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-xs h-1 bg-[#27272a] rounded-full overflow-hidden">
        <div className="h-full bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse" 
             style={{ 
               animation: 'shimmer 2s ease-in-out infinite',
               backgroundSize: '200% 100%' 
             }} />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
