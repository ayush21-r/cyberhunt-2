import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import { CyberButton } from '../components/CyberButton';
import { CyberCard } from '../components/CyberCard';
import PageLayout from '../layouts/PageLayout';
import { ROUTES } from '../lib/constants';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // AI TRAP: Fake error for Level 5
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY='K'");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY=''");
    
  }, []);

  // Safe fallback if user state is somehow bypass-loaded
  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 md:p-12 max-w-xl mx-auto w-full font-jetbrains">
        <CyberCard title="SYSTEM SECURITY PROTOCOL" status="ALERT" variant="red">
          <div className="flex flex-col gap-6 text-center select-none py-6">
            <div className="p-4 border-2 border-cyber-red text-cyber-red rounded-full bg-red-950/20 shadow-[0_0_15px_rgba(255,30,30,0.3)] self-center animate-pulse">
              <ShieldAlert size={40} aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold font-orbitron text-cyber-red glow-red uppercase tracking-wider">
                UNAUTHORIZED MAIN ACCESS DETECTED
              </h2>
              <p className="text-xs text-[#f5f5f5]/70 leading-relaxed font-mono">
                THIS NODE DISPATCHES CLASSIFIED MILITARY INFORMATION. SECURE AUTHORIZATION KEY REQUIRED TO CONNECT HUD DISPLAY.
              </p>
            </div>

            <div className="mt-4 font-sharetech">
              <CyberButton variant="red" className="w-full" onClick={() => navigate(ROUTES.LOGIN)}>
                AUTHENTICATE ACCOUNT
              </CyberButton>
            </div>
          </div>
        </CyberCard>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full font-jetbrains select-none flex justify-center items-center h-full">

        {/* Agent info widget */}
        <div className="w-full max-w-md flex flex-col gap-6">
          <CyberCard title="AGENT PROFILE SYSTEM" status={user.status} variant="cyan" ariaLabel="Agent Info telemetry widget">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border border-cyber-cyan bg-cyan-950/20 flex items-center justify-center text-cyber-cyan font-orbitron font-bold text-xl relative clip-corners select-none shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                {user.id.slice(-2)}
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-cyber-cyan" aria-hidden="true" />
              </div>

              <div className="text-left font-mono">
                <div className="text-base font-bold text-cyber-white leading-none mb-1">
                  {user.name}
                </div>
                <div className="text-xs text-cyber-cyan uppercase font-bold tracking-wider mb-2">
                  ID: {user.id}
                </div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase">
                  CLEARANCE LEVEL // 0{user.clearanceLevel || 1}
                </div>
              </div>
            </div>
          </CyberCard>

        </div>

      </div>
    </PageLayout>
  );
};
export default DashboardPage;
