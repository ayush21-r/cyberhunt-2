import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  fullscreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'LOADING SECURE ASSETS...',
  fullscreen = true,
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center bg-[#050505]/95 z-50 font-jetbrains select-none gap-4
        ${fullscreen ? 'fixed inset-0 w-screen h-screen' : 'absolute inset-0 w-full h-full min-h-[200px]'}
      `}
      role="progressbar"
      aria-live="polite"
      aria-label={message}
    >
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Rotating concentric radar graphic loader */}
      <div className="relative w-20 h-20 flex items-center justify-center select-none">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
        {/* Middle Ring */}
        <motion.div
          className="absolute w-14 h-14 border border-cyber-red/20 border-b-cyber-red rounded-full"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
        {/* Inner core */}
        <div className="text-cyber-cyan glow-cyan animate-pulse">
          <Shield size={24} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs tracking-widest font-sharetech uppercase text-cyber-cyan glow-cyan animate-pulse">
          {message}
        </span>
        <span className="text-[9px] font-mono text-white/30 tracking-widest">
          SYS_LINKING_CORE_NODES
        </span>
      </div>
    </div>
  );
};
export default LoadingOverlay;
