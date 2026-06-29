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
  const totalBlocks = 20;
  const activeBlocks = Math.round((progress / 100) * totalBlocks);
  const inactiveBlocks = totalBlocks - activeBlocks;

  const filledBlocks = '█'.repeat(activeBlocks);
  const emptyBlocks = '░'.repeat(inactiveBlocks);

  return (
    <div className={`w-full font-sharetech text-left ${className}`}>
      {statusText && (
        <div className="flex justify-between items-center text-xs mb-1.5 uppercase tracking-widest">
          <span className={isRed ? 'text-cyber-red' : 'text-cyber-cyan'}>{statusText}</span>
          <span className="text-white/60">{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className={`
        relative border px-1 py-1.5 flex items-center bg-[#050505]
        ${isRed 
          ? 'border-cyber-red/40 text-cyber-red glow-red' 
          : 'border-cyber-cyan/40 text-cyber-cyan glow-cyan'}
      `}>
        {/* Repeating text/block layout */}
        <span className="text-xs md:text-sm font-mono overflow-hidden select-none tracking-tighter md:tracking-normal w-full block">
          {filledBlocks}
          <span className="opacity-30">{emptyBlocks}</span>
        </span>

        {/* Glow scanner line */}
        <div className={`absolute top-0 bottom-0 left-0 w-2 opacity-50
          ${isRed ? 'bg-cyber-red shadow-[0_0_10px_#ff1e1e]' : 'bg-cyber-cyan shadow-[0_0_10px_#00e5ff]'}
        `}
        style={{ left: `${progress}%`, transition: 'left 0.1s ease-out' }}
        />
      </div>
    </div>
  );
};
export default LoadingBar;
