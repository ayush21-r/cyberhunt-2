import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface NotificationProps {
  id: string;
  message: string;
  type?: 'info' | 'error' | 'success';
  onClose: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type = 'info',
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const typeStyles = {
    info: 'border-cyber-cyan bg-cyan-950/20 text-cyber-cyan shadow-[0_0_10px_rgba(0,229,255,0.1)]',
    error: 'border-cyber-red bg-red-950/20 text-cyber-red shadow-[0_0_10px_rgba(255,30,30,0.1)] animate-bounce',
    success: 'border-emerald-500 bg-emerald-950/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={16} className="text-cyber-red animate-pulse" />;
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-400" />;
      default:
        return <Info size={16} className="text-cyber-cyan" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`
        relative border px-4 py-3.5 flex items-start gap-3 clip-corners w-72 md:w-80 select-none font-sharetech
        ${typeStyles[type]}
      `}
    >
      <div className="mt-0.5">{getIcon()}</div>
      
      <div className="flex-grow text-xs font-jetbrains font-bold uppercase tracking-wider leading-relaxed">
        <span className="opacity-60 text-[10px] font-sharetech block mb-0.5">
          {type === 'error' ? 'SYSTEM_ALERT' : type === 'success' ? 'SYSTEM_EVENT' : 'SYSTEM_LOG'}
        </span>
        {message}
      </div>

      <button
        onClick={() => onClose(id)}
        className="opacity-50 hover:opacity-100 hover:text-cyber-red transition-all p-0.5"
      >
        <X size={14} />
      </button>

      {/* Decorative scanline indicator */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </motion.div>
  );
};
export default Notification;
