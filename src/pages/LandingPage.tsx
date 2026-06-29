import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Award, Calendar, Cpu, Compass, BookOpen, AlertTriangle } from 'lucide-react';
import { CyberButton } from '../components/CyberButton';
import { GlitchHeading } from '../components/GlitchHeading';
import { HUDPanel } from '../components/HUDPanel';
import { Modal } from '../components/Modal';
import PageLayout from '../layouts/PageLayout';
import { ROUTES } from '../lib/constants';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [briefingOpen, setBriefingOpen] = useState<boolean>(false);

  return (
    <PageLayout>
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-8 md:py-16 text-center select-none max-w-7xl mx-auto w-full">
        {/* Operations Heading */}
        <div className="mb-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-1 uppercase tracking-widest text-xs md:text-sm font-sharetech text-cyber-cyan/80 font-bold"
          >
            // OPERATION_INITIATION //
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col select-none"
          >
            <GlitchHeading tag="h1" variant="red" className="text-4xl sm:text-6xl md:text-8xl tracking-widest font-black leading-none mb-2">
              TECHALFA
            </GlitchHeading>
            <GlitchHeading tag="h1" variant="cyan" className="text-3xl sm:text-5xl md:text-7xl tracking-widest font-black leading-none">
              CYBER HUNT
            </GlitchHeading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
            className="mt-4 border border-cyber-cyan/20 bg-cyan-950/10 px-4 py-1.5 clip-corners text-xs md:text-sm text-cyber-cyan tracking-widest uppercase font-sharetech"
          >
            CLASSIFIED INTEL // TECHNICAL TREASURE HUNT
          </motion.div>
        </div>

        {/* Dashboard Grid Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-6 mb-10 text-left items-stretch">
          
          {/* Mission Briefing Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <HUDPanel title="MISSION_BRIEFING" showRadar={true} className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4 font-jetbrains text-sm text-[#f5f5f5]/80">
                <div className="flex items-center gap-2 border-b border-cyber-cyan/15 pb-2 mb-2 font-sharetech text-cyber-cyan">
                  <Terminal size={16} aria-hidden="true" />
                  <span className="font-bold uppercase tracking-widest text-xs">DIRECTIVE_ID: CLASSIFIED_CODENAME_CYBERHUNT</span>
                </div>
                
                <p className="leading-relaxed">
                  Agents, a breach has been detected in the TechAlfa Secure Network. Sensitive blueprints and cryptography assets have been compartmentalized and scattered across the grid. Your objective is to hunt down these data fragments, solve encrypted nodes, and restore order.
                </p>
                
                <p className="leading-relaxed hidden sm:block">
                  This is not a simulator. You will face firewall decryptions, terminal hacking sequences, and complex logical puzzles. Fail and access credentials will be purged. Succeed and secure your rank on the military grid.
                </p>

                {/* Specs metadata */}
                <div className="grid grid-cols-2 gap-4 mt-4 bg-cyber-sec/40 p-4 border border-cyber-border/20 clip-corners font-sharetech text-xs tracking-wider uppercase">
                  <div className="flex items-center gap-2 text-cyber-white/70">
                    <Calendar size={14} className="text-cyber-cyan" aria-hidden="true" />
                    <span>LAUNCH: IMMEDIATE EFFECT</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-white/70">
                    <Cpu size={14} className="text-cyber-cyan" aria-hidden="true" />
                    <span>DIFFICULTY: HIGH LEVEL</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-white/70">
                    <Compass size={14} className="text-cyber-cyan" aria-hidden="true" />
                    <span>TARGET: CRYPTOGRAPHY CODES</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-white/70">
                    <Award size={14} className="text-cyber-cyan" aria-hidden="true" />
                    <span>BOUNTY: TOP SECURITY ACCESS</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 font-sharetech">
                <CyberButton 
                  variant="cyan" 
                  size="sm" 
                  onClick={() => setBriefingOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={briefingOpen}
                >
                  <BookOpen size={14} />
                  <span>EXPAND DETAILS</span>
                </CyberButton>
              </div>
            </HUDPanel>
          </motion.div>

          {/* Activity Feed sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border border-cyber-border bg-[#0d1117]/60 p-6 clip-corners flex flex-col justify-between h-full relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-red" />
              <span className="absolute top-2.5 right-3.5 text-[8px] font-sharetech text-cyber-red animate-pulse select-none">GRID_ALERT_MONITOR</span>

              <div>
                <div className="border-b border-cyber-border/20 pb-2.5 mb-4 select-none">
                  <span className="font-sharetech text-xs text-cyber-red font-bold tracking-widest uppercase flex items-center gap-1.5">
                    <AlertTriangle size={14} className="animate-pulse" aria-hidden="true" /> SYSTEM_DEGRADATION
                  </span>
                </div>

                {/* Feeds */}
                <div className="flex flex-col gap-3.5 font-mono text-[10px] text-white/50">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>SECURE_ROUTE_4</span>
                    <span className="text-cyber-cyan font-bold">[ONLINE]</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>FIREWALL_STATUS</span>
                    <span className="text-cyber-red font-bold animate-pulse">[COMPROMISED]</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>ACTIVE_THREADS</span>
                    <span className="text-cyber-white">[1,492 / SEC]</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>HASH_DECRYPT</span>
                    <span className="text-cyber-cyan font-bold">[RUNNING 74%]</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>INTRUSION_LEVEL</span>
                    <span className="text-cyber-red font-bold">[CRITICAL]</span>
                  </div>
                </div>

                <div className="mt-8 border border-cyber-red/25 bg-red-950/5 p-3 text-[10px] text-cyber-red font-mono leading-relaxed clip-corners relative select-none">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-red" />
                  <span className="font-bold tracking-wider block mb-1">WARNING: INTEL DECRYPTION LINK</span>
                  UNAUTHORIZED DE-COMPILATION OF THIS CLIENT FILE WILL RESULT IN PERMANENT AGENT BLACKLISTING.
                </div>
              </div>

              {/* Login trigger */}
              <div className="mt-8 font-sharetech">
                <CyberButton 
                  variant="red" 
                  className="w-full flex justify-center items-center gap-2 group cursor-pointer" 
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  <span>BEGIN MISSION</span>
                  <span className="text-xs group-hover:translate-x-1.5 transition-transform font-mono" aria-hidden="true">&gt;&gt;</span>
                </CyberButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Briefing details popup modal */}
        <Modal 
          isOpen={briefingOpen} 
          onClose={() => setBriefingOpen(false)} 
          title="MISSION PROTOCOL DIRECTIVES" 
          variant="cyan"
        >
          <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wide text-left">
            <p>
              1. **OPERATION HIERARCHY**: This event is structured into levels of varying cryptographic difficulty. Solve nodes sequentially to gain database credentials.
            </p>
            <p>
              2. **CLASSIFIED DECRYPTION**: Agents are allocated individual Access Keys. Do not leak credentials. Intruders will be permanently blacklisted.
            </p>
            <p>
              3. **SCORING COEFFICIENT**: Scores are determined by node completion speed and retry indices. Check your leaderboard placement regularly in the Agent HUD.
            </p>
            <p>
              4. **GRID COMMUNICATOR**: Announcements regarding server status will be broadcasted on the HUD interface under general feeds. Stay alerted.
            </p>
          </div>
        </Modal>
      </div>
    </PageLayout>
  );
};
export default LandingPage;
