import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, Send, ShieldAlert } from 'lucide-react';
import { CyberButton } from '../components/CyberButton';
import { CyberCard } from '../components/CyberCard';
import PageLayout from '../layouts/PageLayout';
import { ROUTES } from '../lib/constants';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, triggerSecurityAlert, addToast } = useAuth();

  const [timeRemaining, setTimeRemaining] = useState<number>(3 * 3600 + 42 * 60 + 15); // 3h 42m 15s
  const [consoleInput, setConsoleInput] = useState<string>('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'AGENT LOGGED IN SUCCESSFULLY.',
    'ESTABLISHED SECURE TUNNEL TO TECHALFA COMMAND.',
    'FIREWALL HASH DETECTOR COMPILING...',
    'SYNCING DECIPHER KEYS WITH TARGET HUB...',
    'ALL TARGET SYSTEM GRIDS ACQUIRED.',
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll logs to bottom
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  const formatCountdown = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const runCommand = (cmd: string) => {
    const uppercaseCmd = cmd.toUpperCase().trim();
    let response = '';

    if (uppercaseCmd === 'ALERT' || uppercaseCmd === 'WARNING') {
      triggerSecurityAlert();
      response = 'OVERRIDE: INTRUSION FLASHER DISPATCHED.';
    } else if (uppercaseCmd === 'HELP') {
      response = 'SYSTEM COMMANDS: HELP // STATUS // CLEAR // LOGOUT';
      addToast('CONSOLE: DISPATCHED HELP DIAGNOSTICS', 'info');
    } else if (uppercaseCmd === 'CLEAR') {
      setConsoleLogs([]);
      addToast('CONSOLE: ACTIVITY LOGS WIPED', 'info');
      return;
    } else if (uppercaseCmd === 'LOGOUT') {
      navigate(ROUTES.LOGIN);
      return;
    } else if (uppercaseCmd === 'STATUS') {
      response = `AGENT:${user?.id} // SCORE:${user?.score} // RANK: #${user?.rank} // CRYPTO_OK`;
      addToast('CONSOLE: LINK INTEGRITY ENCRYPTED', 'success');
    } else {
      response = `COMMAND NOT RECOGNIZED: "${uppercaseCmd}". TYPE "HELP" FOR ACCREDITED DIRECTIVES.`;
      addToast(`CONSOLE ERROR: UNKNOWN COMMAND "${uppercaseCmd}"`, 'error');
    }

    setConsoleLogs((prev) => [...prev, `> ${uppercaseCmd}`, response]);
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    runCommand(consoleInput);
    setConsoleInput('');
  };

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

  const rankings = [
    { rank: '01', id: 'AGENT_ZERO', team: 'WAR_GAMES', score: 1980, active: true },
    { rank: '02', id: 'AGENT_NEO', team: 'THE_MATRIX', score: 1850, active: false },
    { rank: '04', id: 'AGENT_ALPHA', team: 'NET_RUNNERS', score: 1450, active: true },
    { rank: '07', id: 'AGENT_TRINITY', team: 'THE_MATRIX', score: 1220, active: false },
    { rank: '12', id: 'AGENT_V', team: 'GRID_PHANTOMS', score: 870, active: true },
  ];

  return (
    <PageLayout>
      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full font-jetbrains select-none">
        
        {/* Top telemetry widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Agent info widget */}
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
                  CLEARANCE LEVEL // 0{user.clearanceLevel}
                </div>
              </div>
            </div>
          </CyberCard>

          {/* Task count down */}
          <CyberCard title="ACTIVE TASK PROTOCOLS" status="IN_PROGRESS" variant="cyan" ariaLabel="Target sectors countdown timer">
            <div className="text-left flex flex-col gap-1 font-mono">
              <span className="text-[10px] text-white/50 tracking-widest uppercase">COUNTDOWN TO SHUTDOWN</span>
              <div className="text-2xl font-bold font-orbitron text-cyber-red tracking-widest glow-red animate-pulse">
                {formatCountdown(timeRemaining)}
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3 pt-2.5 border-t border-white/5">
                <span className="text-white/60">GRID SECTOR:</span>
                <span className="text-cyber-cyan font-bold tracking-wider uppercase">SECTOR_91-DELTA</span>
              </div>
            </div>
          </CyberCard>

          {/* Current standings scoreboard summary */}
          <CyberCard title="SCOREBOARD PLACEMENT" status="STATS" variant="cyan" ariaLabel="Agent standings point panel">
            <div className="grid grid-cols-2 gap-4 text-left font-mono">
              <div className="flex flex-col">
                <span className="text-[9px] text-white/50 uppercase">CURRENT RANK</span>
                <span className="text-2xl font-bold font-orbitron text-cyber-cyan glow-cyan">#{user.rank}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/50 uppercase">TOTAL POINTS</span>
                <span className="text-2xl font-bold font-orbitron text-cyber-cyan glow-cyan">{user.score}</span>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Console layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Main scoreboard grid */}
          <div className="lg:col-span-2">
            <CyberCard title="COVERT SYSTEM LEADERBOARD" status="GRID_RANK" variant="cyan" ariaLabel="System leaderboards metrics grid">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-cyber-cyan/20 text-cyber-cyan uppercase font-sharetech tracking-wider text-sm select-none">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Agent ID</th>
                      <th className="py-2.5 px-3">Accredited Team</th>
                      <th className="py-2.5 px-3 text-right">Decrypted Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rankings.map((u) => {
                      const isSelf = u.id === user.id;
                      return (
                        <tr
                          key={u.id}
                          className={`transition-colors duration-150 ${isSelf ? 'bg-cyber-cyan/10 text-cyber-cyan font-bold' : 'hover:bg-white/5 text-white/70'}`}
                        >
                          <td className="py-3.5 px-3 font-orbitron">{u.rank}</td>
                          <td className="py-3.5 px-3 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${u.active ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-white/20'}`} aria-hidden="true" />
                            <span>{u.id}</span>
                            {isSelf && <span className="text-[9px] border border-cyber-cyan bg-cyan-950/40 px-1 py-0.5 font-sharetech tracking-widest text-cyber-cyan uppercase ml-2">[YOU]</span>}
                          </td>
                          <td className="py-3.5 px-3">{u.team}</td>
                          <td className="py-3.5 px-3 text-right font-orbitron text-cyber-white">{u.score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CyberCard>
          </div>

          {/* Interactive Shell terminal logs */}
          <div className="flex flex-col justify-between">
            <CyberCard title="HUD_COMMAND_LINE" status="ONLINE" className="h-full flex flex-col justify-between" variant="cyan" ariaLabel="Classified diagnostics shell panel">
              <div className="flex flex-col gap-4 justify-between h-[320px]">
                {/* Output logger */}
                <div 
                  className="flex-grow bg-black/50 border border-white/5 p-3 font-mono text-[10px] overflow-y-auto text-left leading-relaxed text-cyber-cyan selection:bg-cyan-500/20 h-full flex flex-col gap-2 rounded-xs select-text"
                  role="log"
                  aria-live="polite"
                >
                  {consoleLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith('>') ? 'text-[#f5f5f5]/80' : log.includes('ERROR') || log.includes('OVERRIDE') ? 'text-cyber-red font-bold animate-pulse' : 'text-cyber-cyan'}>
                      {log}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>

                {/* Overrides commands */}
                <div className="flex flex-wrap gap-2 text-[10px] select-none font-sharetech px-1 text-white/50">
                  <span>QUICK OVERRIDES:</span>
                  <button
                    type="button"
                    onClick={() => runCommand('HELP')}
                    className="text-cyber-cyan hover:underline cursor-pointer font-bold focus:outline-hidden"
                  >
                    [HELP]
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand('STATUS')}
                    className="text-cyber-cyan hover:underline cursor-pointer font-bold focus:outline-hidden"
                  >
                    [STATUS]
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand('ALERT')}
                    className="text-cyber-cyan hover:underline cursor-pointer font-bold focus:outline-hidden"
                  >
                    [ALERT]
                  </button>
                  <button
                    type="button"
                    onClick={() => runCommand('CLEAR')}
                    className="text-cyber-cyan hover:underline cursor-pointer font-bold focus:outline-hidden"
                  >
                    [CLEAR]
                  </button>
                </div>

                {/* Submit override form */}
                <form onSubmit={handleConsoleSubmit} className="flex gap-2">
                  <div className="relative flex-grow flex items-center border border-cyber-cyan/35 bg-black focus-within:border-cyber-cyan focus-within:shadow-[0_0_10px_rgba(0,229,255,0.25)]">
                    <span className="pl-3.5 text-xs text-cyber-cyan select-none" aria-hidden="true">&gt;</span>
                    <input
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="ENTER OVERRIDE"
                      className="w-full bg-transparent text-[#f5f5f5] text-xs px-2.5 py-3 outline-hidden font-mono uppercase"
                      aria-label="Secure command shell input"
                    />
                  </div>
                  <CyberButton variant="cyan" type="submit" size="sm" className="px-3" glow={false}>
                    <Send size={14} aria-hidden="true" />
                  </CyberButton>
                </form>
              </div>
            </CyberCard>
          </div>

        </div>

        {/* Global Warning flashing clicker */}
        <div className="mt-8 flex justify-center font-sharetech select-none">
          <CyberButton variant="red" size="sm" onClick={triggerSecurityAlert}>
            <AlertTriangle size={15} className="animate-pulse" aria-hidden="true" />
            <span>SIMULATE SYSTEM SECURITY INTRUSION</span>
          </CyberButton>
        </div>

      </div>
    </PageLayout>
  );
};
export default DashboardPage;
