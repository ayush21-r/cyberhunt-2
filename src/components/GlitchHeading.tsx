import React from 'react';

interface GlitchHeadingProps {
  children: string;
  tag?: 'h1' | 'h2' | 'h3';
  variant?: 'red' | 'cyan' | 'white';
  className?: string;
}

export const GlitchHeading: React.FC<GlitchHeadingProps> = ({
  children,
  tag = 'h1',
  variant = 'red',
  className = '',
}) => {
  const Tag = tag;

  const colorStyles = {
    red: 'text-cyber-red glow-red',
    cyan: 'text-cyber-cyan glow-cyan',
    white: 'text-cyber-white',
  };

  return (
    <div className="relative inline-block select-none">
      {/* Glitch underlying shadow layer - Red */}
      <Tag
        className={`
          absolute top-0 left-0 w-full h-full text-cyber-red opacity-70 font-orbitron uppercase tracking-wider
          animate-glitch pointer-events-none select-none
          ${className}
        `}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px, 1px)' }}
      >
        {children}
      </Tag>

      {/* Glitch underlying shadow layer - Cyan */}
      <Tag
        className={`
          absolute top-0 left-0 w-full h-full text-cyber-cyan opacity-70 font-orbitron uppercase tracking-wider
          animate-glitch pointer-events-none select-none
          ${className}
        `}
        style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)', transform: 'translate(2px, -1px)' }}
        aria-hidden="true"
      >
        {children}
      </Tag>

      {/* Main text layer */}
      <Tag
        className={`
          relative z-10 font-orbitron uppercase tracking-wider font-extrabold
          ${colorStyles[variant]}
          ${className}
        `}
      >
        {children}
      </Tag>
    </div>
  );
};
export default GlitchHeading;
