import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { warningActive } = useAuth();
  
  // Floating matrix server particles
  const particles = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#f5f5f5] overflow-x-hidden font-jetbrains select-none crt-overlay flex items-center justify-center p-4">
      {/* Visual CRT effects */}
      <div className="crt-scanline" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid opacity-50 z-0 pointer-events-none" aria-hidden="true" />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {particles.map((_, i) => {
          const size = Math.random() * 3 + 1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 25 + 15;
          const color = Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 30, 30, 0.12)';
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                left: `${initialX}%`,
                top: `${initialY}%`,
                boxShadow: `0 0 ${size * 2}px ${color}`,
              }}
              animate={{
                y: [0, -300, 0],
                x: [0, Math.random() * 80 - 40, 0],
                opacity: [0.1, 0.7, 0.1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* Global Alarm Warning overlay */}
      <AnimatePresence>
        {warningActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.1, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#ff1e1e]/20 z-50 pointer-events-none flex items-center justify-center border-4 border-[#ff1e1e]"
            role="alert"
            aria-live="assertive"
          >
            <div className="px-6 py-4 bg-black border-2 border-[#ff1e1e] text-[#ff1e1e] font-orbitron text-xl glow-red tracking-widest flex items-center gap-3 shadow-lg">
              <AlertTriangle className="animate-pulse" />
              <span>WARNING: SECURITY BREACH DETECTED</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};
export default AuthLayout;
