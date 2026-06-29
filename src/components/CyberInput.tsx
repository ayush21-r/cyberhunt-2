import React from 'react';

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: 'cyan' | 'red';
}

export const CyberInput: React.FC<CyberInputProps> = ({
  label,
  error,
  variant = 'cyan',
  className = '',
  id,
  ...props
}) => {
  const isRed = error || variant === 'red';

  return (
    <div className="w-full font-jetbrains flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className={`text-xs uppercase tracking-widest font-bold ${isRed ? 'text-cyber-red/80' : 'text-cyber-cyan/80'}`}>
        {label}
      </label>
      
      <div className="relative flex items-stretch">
        {/* Terminal label prompt prefix */}
        <div className={`
          flex items-center px-3 text-xs bg-cyber-sec/70 border-y border-l font-sharetech select-none
          ${isRed ? 'border-cyber-red/40 text-cyber-red' : 'border-cyber-cyan/40 text-cyber-cyan'}
          clip-corners-left
        `}>
          [{label}] &gt;
        </div>

        {/* Input Field */}
        <input
          id={id}
          className={`
            w-full bg-[#050505] text-[#f5f5f5] text-sm px-4 py-2.5 outline-hidden border border-l-0 transition-all duration-200
            ${isRed 
              ? 'border-cyber-red/40 focus:border-cyber-red focus:shadow-[0_0_10px_rgba(255,30,30,0.25)]' 
              : 'border-cyber-cyan/40 focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.25)]'}
            placeholder:text-white/20 font-mono
            ${className}
          `}
          {...props}
        />

        {/* Highlight Focus accents */}
        <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r pointer-events-none transition-all duration-200
          ${isRed ? 'border-cyber-red/60' : 'border-cyber-cyan/60'}`} 
        />
        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r pointer-events-none transition-all duration-200
          ${isRed ? 'border-cyber-red/60' : 'border-cyber-cyan/60'}`} 
        />
      </div>

      {error && (
        <span className="text-xs text-cyber-red font-sharetech mt-0.5 tracking-wider uppercase animate-pulse">
          ERROR: {error}
        </span>
      )}
    </div>
  );
};
export default CyberInput;
