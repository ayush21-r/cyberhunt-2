import React from 'react';

interface LoadingBarProps {
  progress: number; // 0 to 100
  statusText?: string;
  variant?: 'cyan' | 'red';
  className?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  progress,
  statusText = 'LOADING DATA',
  variant = 'cyan',
  className = '',
}) => {
  const isRed = variant === 'red';
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full font-sharetech text-left ${className}`}>
      {statusText && (
        <div className="flex justify-between items-center text-xs mb-1.5 uppercase tracking-widest font-mono">
          <span className={isRed ? 'text-cyber-red font-bold' : 'text-cyber-cyan font-bold'}>
            {statusText}
          </span>
          <span className="text-white/80 font-bold">{Math.round(clampedProgress)}%</span>
        </div>
      )}

      {/* Main container */}
      <div
        className={`
          relative w-full h-6 border p-0.5 flex items-center bg-[#050505]/90 overflow-hidden clip-corners
          ${isRed
            ? 'border-cyber-red/50 shadow-[0_0_10px_rgba(255,30,30,0.15)]'
            : 'border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,229,255,0.15)]'}
        `}
      >
        {/* Background track grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10px_100%] pointer-events-none opacity-50" />

        {/* Dynamic Full-Width Fill Bar */}
        <div
          className={`
            h-full relative overflow-hidden transition-all duration-300 ease-out
            ${isRed
              ? 'bg-linear-to-r from-red-950 via-cyber-red/80 to-cyber-red shadow-[0_0_15px_rgba(255,30,30,0.5)]'
              : 'bg-linear-to-r from-cyan-950 via-cyber-cyan/80 to-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.5)]'}
          `}
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Cyberpunk segmented diagonal stripes inside the progress bar */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0,0,0,0.6) 6px, rgba(0,0,0,0.6) 12px)',
            }}
          />

          {/* Animated glow shimmer sweep */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Bright leading edge laser cap */}
          {clampedProgress > 0 && clampedProgress < 100 && (
            <div
              className={`
                absolute top-0 bottom-0 right-0 w-1.5 z-20
                ${isRed
                  ? 'bg-white shadow-[0_0_12px_#ff1e1e]'
                  : 'bg-white shadow-[0_0_12px_#00e5ff]'}
              `}
            />
          )}
        </div>

        {/* Outer Corner Accents */}
        <span className={`absolute top-0 left-0 w-1 h-1 border-t border-l pointer-events-none ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />
        <span className={`absolute bottom-0 right-0 w-1 h-1 border-b border-r pointer-events-none ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />
      </div>
    </div>
  );
};
export default LoadingBar;
