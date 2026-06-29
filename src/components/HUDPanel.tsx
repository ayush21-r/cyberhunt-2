import React from 'react';
import { motion } from 'framer-motion';

interface HUDPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showRadar?: boolean;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  title,
  className = '',
  showRadar = false,
}) => {
  return (
    <div className={`relative border border-cyber-cyan/20 bg-cyber-sec/30 p-6 clip-corners font-jetbrains ${className}`}>
      {/* Outer corner crosshair markings */}
      <span className="absolute top-1.5 left-1.5 text-cyber-cyan text-xs font-bold font-monoSelect select-none opacity-40">+</span>
      <span className="absolute top-1.5 right-1.5 text-cyber-cyan text-xs font-bold font-monoSelect select-none opacity-40">+</span>
      <span className="absolute bottom-1.5 left-1.5 text-cyber-cyan text-xs font-bold font-monoSelect select-none opacity-40">+</span>
      <span className="absolute bottom-1.5 right-1.5 text-cyber-cyan text-xs font-bold font-monoSelect select-none opacity-40">+</span>

      {/* Thin horizontal rules extending slightly beyond corners */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-cyber-cyan/15" />
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-cyber-cyan/15" />
      <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-cyber-cyan/15" />
      <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-cyber-cyan/15" />

      {/* Decorative technical telemetry data */}
      <div className="absolute -top-3.5 left-6 bg-cyber-bg px-2 border border-cyber-cyan/35 text-[10px] text-cyber-cyan font-sharetech uppercase tracking-widest select-none">
        {title || 'HUD_MODULE_092'}
      </div>

      <div className="absolute -bottom-3.5 right-6 bg-cyber-bg px-2 border border-cyber-cyan/20 text-[9px] text-cyber-cyan/60 font-sharetech select-none">
        SYS_STATUS: // OK_LINK
      </div>

      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-4 h-[1px] bg-cyber-cyan" />
      <span className="absolute top-0 left-0 w-[1px] h-4 bg-cyber-cyan" />
      <span className="absolute top-0 right-0 w-4 h-[1px] bg-cyber-cyan" />
      <span className="absolute top-0 right-0 w-[1px] h-4 bg-cyber-cyan" />
      <span className="absolute bottom-0 left-0 w-4 h-[1px] bg-cyber-cyan" />
      <span className="absolute bottom-0 left-0 w-[1px] h-4 bg-cyber-cyan" />
      <span className="absolute bottom-0 right-0 w-4 h-[1px] bg-cyber-cyan" />
      <span className="absolute bottom-0 right-0 w-[1px] h-4 bg-cyber-cyan" />

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-6">
        {/* Radar graphic layout if requested */}
        {showRadar && (
          <div className="flex-shrink-0 w-36 h-36 border border-cyber-cyan/35 rounded-full relative flex items-center justify-center bg-cyan-950/15 overflow-hidden self-center select-none shadow-[0_0_15px_rgba(0,229,255,0.05)]">
            {/* Sweep radar lines */}
            <motion.div
              className="absolute inset-0 border-r border-cyber-cyan/40"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
            {/* Radar rings */}
            <div className="absolute w-24 h-24 border border-cyber-cyan/25 rounded-full" />
            <div className="absolute w-12 h-12 border border-cyber-cyan/15 rounded-full" />
            
            {/* Crosshairs */}
            <div className="absolute inset-x-0 h-[1px] bg-cyber-cyan/20" />
            <div className="absolute inset-y-0 w-[1px] bg-cyber-cyan/20" />

            {/* Target Blip */}
            <motion.div
              className="absolute w-2 h-2 bg-cyber-red rounded-full"
              style={{ top: '25%', left: '60%' }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-cyber-cyan rounded-full"
              style={{ top: '70%', left: '30%' }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
            />
            <span className="absolute bottom-1.5 text-[8px] font-sharetech text-cyber-cyan/80">AZIMUTH 18.25°</span>
          </div>
        )}

        {/* Panel body */}
        <div className="flex-grow w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
export default HUDPanel;
