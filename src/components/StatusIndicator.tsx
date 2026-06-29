import React from 'react';
import type { UserStatus } from '../types';

interface StatusIndicatorProps {
  status: UserStatus | string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className = '' }) => {
  const getColors = () => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'text-[#fbbf24] border-[#fbbf24]/30 bg-[#fbbf24]/5';
      case 'SECURE':
        return 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5';
      case 'COMPROMISED':
        return 'text-cyber-red border-cyber-red/30 bg-cyber-red/5 animate-pulse';
      case 'OFFLINE':
        return 'text-white/40 border-white/10 bg-white/5';
      default:
        return 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5';
    }
  };

  const getAriaLabel = () => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'Agent status is Active, pending decryption task';
      case 'SECURE':
        return 'Agent status is Secure, firewall active';
      case 'COMPROMISED':
        return 'Warning: Agent status is Compromised!';
      case 'OFFLINE':
        return 'Agent connection is Offline';
      default:
        return `Agent status is: ${status}`;
    }
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 font-sharetech text-xs font-bold tracking-widest px-2.5 py-0.5 border clip-corners select-none
        ${getColors()}
        ${className}
      `}
      aria-label={getAriaLabel()}
    >
      <span 
        className={`w-1.5 h-1.5 rounded-full ${
          status.toUpperCase() === 'SECURE' ? 'bg-cyber-cyan shadow-[0_0_6px_#00e5ff]' :
          status.toUpperCase() === 'COMPROMISED' ? 'bg-cyber-red shadow-[0_0_6px_#ff1e1e] animate-ping' :
          status.toUpperCase() === 'ACTIVE' ? 'bg-[#fbbf24] shadow-[0_0_6px_#fbbf24]' :
          'bg-white/20'
        }`} 
        aria-hidden="true"
      />
      [{status}]
    </span>
  );
};
export default StatusIndicator;
