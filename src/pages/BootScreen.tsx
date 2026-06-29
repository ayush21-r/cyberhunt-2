import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingBar from '../components/LoadingBar';
import TypingText from '../components/TypingText';
import AuthLayout from '../layouts/AuthLayout';

export const BootScreen: React.FC = () => {
  const { setBootComplete } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const [logIndex, setLogIndex] = useState<number>(0);
  const [granted, setGranted] = useState<boolean>(false);

  const logs = [
    'INITIALIZING SECURE MAINFRAME CONNECTION...',
    'CONNECTING TO CENTRAL INTELLIGENCE NODE: 10.92.148.91...',
    'RESOLVING HOST NAME: TECHALFA_COVERT_SERVER...',
    'SHIELD FIREWALL: BYPASSING GATEWAYS... [OK]',
    'LOADING DECRYPTION CORE (AES-256-GCM)...',
    'DECRYPTING MISSION ASSETS: CYBER_HUNT_ARCHIVE.tar.gz...',
    'WARNING: ENCRYPTED FILES CORRUPTED? AUTOCORRECTING BLOCK HASHES...',
    'BLOCK INTEGRITY: VERIFIED [SHA-512 SECURE]',
    'VERIFYING CLASSIFIED AGENT CREDENTIAL PATHS...',
    'ESTABLISHING ENCRYPTED HUD DISPLAY...',
    'ESTABLISHING COMMAND CONTROL INTERFACE...',
  ];

  // Loader interval loop
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setGranted(true);
      }, 500);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 350);

    return () => clearInterval(interval);
  }, [progress]);

  // Sync log feeds with loader progress
  useEffect(() => {
    const nextLogIndex = Math.floor((progress / 100) * logs.length);
    if (nextLogIndex > logIndex && nextLogIndex < logs.length) {
      setLogIndex(nextLogIndex);
    }
  }, [progress, logIndex]);

  // Navigate to main site on completion
  useEffect(() => {
    if (granted) {
      const timer = setTimeout(() => {
        setBootComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [granted, setBootComplete]);

  // Bypass keydown ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBootComplete(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setBootComplete]);

  return (
    <AuthLayout>
      <div 
        className="w-full max-w-2xl border border-cyber-cyan/35 bg-cyber-sec/45 p-6 md:p-8 clip-corners shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-label="Secure Mainframe Initialization Dialog"
      >
        {/* Border highlights */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-cyan pointer-events-none" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyber-cyan pointer-events-none" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyber-cyan pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-cyan pointer-events-none" />

        {granted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-72 flex flex-col items-center justify-center text-center gap-4 font-sharetech select-none"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-4 border-2 border-cyber-cyan text-cyber-cyan rounded-full bg-cyan-950/15 shadow-[0_0_20px_rgba(0,229,255,0.3)] glow-border-cyan"
            >
              <ShieldCheck size={48} className="animate-pulse" aria-hidden="true" />
            </motion.div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-cyber-cyan tracking-widest glow-cyan uppercase font-orbitron animate-pulse">
                ACCESS GRANTED
              </h1>
              <p className="text-xs text-white/50 font-mono mt-2 tracking-widest uppercase">
                ESTABLISHING SECURE PROTOCOLS. STANDBY...
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Terminal logs header */}
            <div className="flex items-center justify-between border-b border-cyber-cyan/20 pb-4 select-none font-sharetech">
              <div className="flex items-center gap-3">
                <Terminal className="text-cyber-cyan animate-pulse" size={20} aria-hidden="true" />
                <span className="text-sm font-bold text-cyber-cyan tracking-widest uppercase">
                  SECURE CONSOLE LINK: OFFLINE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBootComplete(true)}
                className="text-[10px] text-cyber-cyan border border-cyber-cyan/35 hover:border-cyber-cyan hover:bg-cyber-cyan/10 px-2 py-0.5 clip-corners transition-all duration-150 font-bold cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-cyber-cyan"
                aria-label="Skip secure boot load sequences"
              >
                BYPASS BOOT [ESC]
              </button>
            </div>

            {/* Scroll logs */}
            <div 
              className="h-44 text-xs font-mono text-white/70 overflow-hidden text-left flex flex-col gap-1.5 leading-relaxed selection:bg-cyan-500/20 pr-2"
              role="log"
              aria-live="polite"
            >
              {logs.slice(0, logIndex + 1).map((log, idx) => {
                const isWarning = log.includes('WARNING');
                return (
                  <div key={idx} className={isWarning ? 'text-cyber-red font-bold animate-pulse' : ''}>
                    {idx === logIndex ? (
                      <TypingText
                        text={log}
                        speed={15}
                        showCursor={true}
                        cursorColor={isWarning ? 'red' : 'cyan'}
                      />
                    ) : (
                      <span>&gt; {log}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Loading blocks */}
            <LoadingBar
              progress={progress}
              statusText={progress === 100 ? 'DECRYPT_ASSETS: COMPLETE' : 'DECRYPTING CORE FILES...'}
            />
          </div>
        )}

        <div className="absolute -bottom-6 left-2 font-sharetech text-[9px] text-cyber-cyan/50 tracking-widest uppercase select-none">
          SYS_SECURE_AUTH // BLK_LEN_512 // ROT_NODE_049
        </div>
      </div>
    </AuthLayout>
  );
};
export default BootScreen;
