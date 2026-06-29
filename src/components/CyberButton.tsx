import React from 'react';
import { motion } from 'framer-motion';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  glow = true,
  className = '',
  ...props
}) => {
  const baseStyle =
    'relative font-sharetech uppercase tracking-wider font-bold transition-all duration-200 clip-corners disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    cyan: 'bg-transparent text-cyber-cyan border border-cyber-cyan hover:bg-cyber-cyan/15 active:bg-cyber-cyan/25',
    red: 'bg-transparent text-cyber-red border border-cyber-red hover:bg-cyber-red/15 active:bg-cyber-red/25',
    gray: 'bg-transparent text-cyber-white/70 border border-cyber-white/30 hover:bg-cyber-white/10 hover:text-cyber-white',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-8 py-3.5',
  };

  const glowStyles = {
    cyan: 'shadow-[0_0_10px_rgba(0,229,255,0.15)] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:glow-border-cyan',
    red: 'shadow-[0_0_10px_rgba(255,30,30,0.15)] hover:shadow-[0_0_15px_rgba(255,30,30,0.4)] hover:glow-border-red',
    gray: '',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyle}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glow ? glowStyles[variant] : ''}
        ${className}
      `}
      {...(props as any)}
    >
      {/* Visual Glitch Hover lines */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 animate-scanline pointer-events-none" />
      
      {/* Corner accents */}
      <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l ${variant === 'red' ? 'border-cyber-red' : variant === 'cyan' ? 'border-cyber-cyan' : 'border-white/40'}`} />
      <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r ${variant === 'red' ? 'border-cyber-red' : variant === 'cyan' ? 'border-cyber-cyan' : 'border-white/40'}`} />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
export default CyberButton;
