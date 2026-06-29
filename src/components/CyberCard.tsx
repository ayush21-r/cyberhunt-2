import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

interface CyberCardProps {
  title: string;
  status?: string;
  variant?: 'cyan' | 'red' | 'gray';
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
  ariaLabel?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  title,
  status,
  variant = 'cyan',
  children,
  className = '',
  headerRight,
  ariaLabel,
}) => {
  const isRed = variant === 'red';
  const isCyan = variant === 'cyan';

  const borderStyles = {
    cyan: 'border-cyber-cyan/35 shadow-[0_0_10px_rgba(0,229,255,0.05)] focus-within:border-cyber-cyan focus-within:shadow-[0_0_15px_rgba(0,229,255,0.2)]',
    red: 'border-cyber-red/35 shadow-[0_0_10px_rgba(255,30,30,0.05)] focus-within:border-cyber-red focus-within:shadow-[0_0_15px_rgba(255,30,30,0.2)]',
    gray: 'border-white/10 focus-within:border-white/30',
  };

  return (
    <section 
      className={`
        relative bg-cyber-sec/70 border text-left font-jetbrains overflow-hidden clip-corners outline-hidden transition-all duration-200
        ${borderStyles[variant]}
        ${className}
      `}
      aria-label={ariaLabel || title}
    >
      {/* Corner Bracket Accents */}
      <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l pointer-events-none ${isRed ? 'border-cyber-red' : isCyan ? 'border-cyber-cyan' : 'border-white/30'}`} />
      <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r pointer-events-none ${isRed ? 'border-cyber-red' : isCyan ? 'border-cyber-cyan' : 'border-white/30'}`} />
      <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l pointer-events-none ${isRed ? 'border-cyber-red' : isCyan ? 'border-cyber-cyan' : 'border-white/30'}`} />
      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r pointer-events-none ${isRed ? 'border-cyber-red' : isCyan ? 'border-cyber-cyan' : 'border-white/30'}`} />

      {/* Header bar */}
      <div className={`
        flex items-center justify-between px-4 py-2.5 border-b select-none font-sharetech
        ${isRed ? 'border-cyber-red/20 bg-cyber-red/5' : isCyan ? 'border-cyber-cyan/20 bg-cyber-cyan/5' : 'border-white/10 bg-white/5'}
      `}>
        <div className="flex items-center gap-2">
          {isRed ? (
            <AlertCircle size={14} className="text-cyber-red animate-pulse" aria-hidden="true" />
          ) : (
            <Shield size={14} className="text-cyber-cyan" aria-hidden="true" />
          )}
          <span className={`text-sm font-bold tracking-widest ${isRed ? 'text-cyber-red glow-red' : isCyan ? 'text-cyber-cyan glow-cyan' : 'text-cyber-white/80'}`}>
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {status && (
            <span 
              className={`
                text-xs font-mono uppercase tracking-widest px-1.5 py-0.5 border select-none
                ${isRed 
                  ? 'border-cyber-red/35 bg-cyber-red/10 text-cyber-red' 
                  : 'border-cyber-cyan/35 bg-cyber-cyan/10 text-cyber-cyan'}
              `}
              aria-label={`Status: ${status}`}
            >
              {status}
            </span>
          )}
          {headerRight}
        </div>
      </div>

      {/* Card Content container */}
      <div className="relative p-5 z-10 bg-[#0d1117]/40">
        {/* Subtle grid background inside the card */}
        <div className="absolute inset-0 bg-cyber-grid opacity-[0.02] pointer-events-none" />
        {children}
      </div>
    </section>
  );
};
export default CyberCard;
