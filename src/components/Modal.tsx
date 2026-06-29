import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert } from 'lucide-react';
import { CyberButton } from './CyberButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'cyan' | 'red';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'cyan',
}) => {
  const isRed = variant === 'red';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`
              relative w-full max-w-xl bg-cyber-sec border p-6 overflow-hidden clip-corners shadow-2xl z-10
              ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}
            `}
          >
            {/* Corner accents */}
            <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />
            <span className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />
            <span className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />
            <span className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${isRed ? 'border-cyber-red' : 'border-cyber-cyan'}`} />

            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 font-sharetech select-none">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className={isRed ? 'text-cyber-red animate-pulse' : 'text-cyber-cyan'} />
                <span className={`text-base font-bold tracking-widest ${isRed ? 'text-cyber-red glow-red' : 'text-cyber-cyan glow-cyan'}`}>
                  {title}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-cyber-red transition-colors p-1 border border-transparent hover:border-cyber-red/20 clip-corners hover:bg-cyber-red/5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="text-sm text-cyber-white/95 font-mono mb-6 leading-relaxed select-text max-h-[60vh] overflow-y-auto pr-1">
              {children}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 font-sharetech border-t border-white/10 pt-4">
              <CyberButton variant="gray" size="sm" onClick={onClose}>
                DISMISS
              </CyberButton>
              <CyberButton variant={variant} size="sm" onClick={onClose}>
                ACCEPT DIRECTIVE
              </CyberButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
