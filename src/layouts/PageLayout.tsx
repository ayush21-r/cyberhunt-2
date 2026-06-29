import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, Shield, AlertTriangle, LogOut, Radio, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME, ROUTES } from '../lib/constants';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { user, logout, warningActive } = useAuth();
  const [time, setTime] = useState<string>('');
  const navigate = useNavigate();

  // Clock updates every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
        ' ' +
        now.toLocaleTimeString('en-US', { hour12: false }) +
        ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Floating background node particles
  const particles = Array.from({ length: 25 });

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#f5f5f5] overflow-x-hidden font-jetbrains select-none crt-overlay flex flex-col justify-between">
      {/* CRT Overlay screens */}
      <div className="crt-scanline" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="absolute inset-0 cyber-grid opacity-60 z-0 pointer-events-none" aria-hidden="true" />

      {/* Floating telemetry particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {particles.map((_, i) => {
          const size = Math.random() * 3 + 1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 30 + 20;
          const color = Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 30, 30, 0.15)';
          
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
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.2, 0.8, 0.2],
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

      {/* Global Intrusion warning red flashes */}
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

      {/* Persistent Terminal Header */}
      <header className="sticky top-0 z-40 w-full border-b border-cyber-border bg-[#050505]/95 backdrop-blur-xs px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4 font-sharetech select-none">
        <div className="flex items-center gap-3">
          <div className="p-1.5 border border-cyber-cyan text-cyber-cyan glow-border-cyan clip-corners bg-cyber-sec/40">
            <Terminal size={18} aria-hidden="true" />
          </div>
          <div className="text-left">
            <span className="font-orbitron font-bold text-cyber-red tracking-wider glow-red">
              {APP_NAME.split(' ')[0]}
            </span>
            <span className="ml-2 px-1.5 py-0.5 border border-cyber-red/30 bg-cyber-red/10 text-cyber-red text-xs font-jetbrains uppercase tracking-widest">
              {APP_NAME.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </div>

        {/* Secure connection monitor */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-[#f5f5f5]/70">
          <Radio size={14} className="text-cyber-cyan animate-pulse" aria-hidden="true" />
          <span className="font-jetbrains">
            CHANNEL: <span className="text-cyber-cyan font-bold">[SECURE_LINK_ESTABLISHED]</span>
          </span>
          <div className={`w-2 h-2 rounded-full ${warningActive ? 'bg-cyber-red shadow-[0_0_8px_#ff1e1e]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'} animate-pulse`} aria-hidden="true" />
        </div>

        {/* DateTime and session disconnect */}
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-cyber-cyan/80">
            <Clock size={14} aria-hidden="true" />
            <time className="font-mono">{time || 'SYS_CLOCK_LOADING'}</time>
          </div>

          {user ? (
            <div className="flex items-center gap-3 border-l border-cyber-border/40 pl-4">
              <span className="text-cyber-red font-mono font-bold" aria-label={`Logged in as ${user.id}`}>
                [{user.id}]
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[#f5f5f5]/60 hover:text-cyber-red transition-all duration-200 border border-transparent hover:border-cyber-red/20 px-2 py-0.5 clip-corners hover:bg-cyber-red/10 cursor-pointer font-bold"
                aria-label="Disconnect secure session"
              >
                <LogOut size={13} aria-hidden="true" />
                <span className="hidden sm:inline">DISCONNECT</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="flex items-center gap-1.5 text-cyber-cyan border border-cyber-cyan/30 hover:border-cyber-cyan px-3 py-1 clip-corners hover:bg-cyber-cyan/10 transition-all duration-200 font-bold cursor-pointer"
            >
              <Shield size={13} aria-hidden="true" />
              <span>AUTHENTICATE</span>
            </button>
          )}
        </div>
      </header>

      {/* Primary Content wrapper */}
      <main className="relative z-10 w-full min-h-[calc(100vh-65px)] flex flex-col flex-grow">
        {children}
      </main>

      {/* persistent footer */}
      <footer className="w-full border-t border-cyber-border/30 bg-[#050505]/95 text-center py-4 text-xs text-[#f5f5f5]/40 font-jetbrains tracking-widest relative z-10 flex flex-col sm:flex-row items-center justify-between px-8 gap-2">
        <span>CLASSIFIED INFORMATION - INTERNAL USE ONLY - RESTRICTED ACCESS LEVEL III</span>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            className="text-cyber-cyan/60 hover:text-cyber-cyan cursor-pointer transition-colors duration-200" 
            onClick={() => navigate(ROUTES.HOME)}
          >
            MISSION_RECAP
          </button>
          <span>© SECURE_NETWORK_2026</span>
        </div>
      </footer>
    </div>
  );
};
export default PageLayout;
