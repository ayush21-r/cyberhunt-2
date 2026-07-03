import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Server, AlertTriangle } from 'lucide-react';
import { CyberInput } from '../components/CyberInput';
import { CyberButton } from '../components/CyberButton';
import { CyberCard } from '../components/CyberCard';
import { LoadingBar } from '../components/LoadingBar';
import AuthLayout from '../layouts/AuthLayout';
import { ROUTES } from '../lib/constants';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, triggerSecurityAlert } = useAuth();

  const [agentId, setAgentId] = useState<string>('');
  const [accessKey, setAccessKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authProgress, setAuthProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');


  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agentId.trim()) {
      setErrorMsg('AGENT ID REQUIRED');
      return;
    }
    if (!accessKey) {
      setErrorMsg('ACCESS KEY REQUIRED');
      return;
    }
    if (accessKey.length < 6) {
      setErrorMsg('KEY LENGTH MUST BE >= 6 CHARACTERS');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    setAuthProgress(10);
    setStatusText('CONTACTING AUTH_SERVER...');

    // Simulate progress increments
    const progressTimer1 = setTimeout(() => {
      setAuthProgress(40);
      setStatusText('SENT CRYPTO_HASH PROTOCOLS...');
    }, 450);

    const progressTimer2 = setTimeout(() => {
      setAuthProgress(75);
      setStatusText('DECRYPTING AGENT DATABASE ACCESS...');
    }, 900);

    try {
      const success = await login(agentId, accessKey);

      setAuthProgress(100);
      if (success) {
        setStatusText('AUTHENTICATION GRANTED. ACCESS INITIATING...');
        setTimeout(() => {
          navigate(ROUTES.DASHBOARD);
        }, 800);
      } else {
        clearTimeout(progressTimer1);
        clearTimeout(progressTimer2);
        setLoading(false);
        setAuthProgress(0);
        setErrorMsg('ACCESS_DENIED: HASH MISMATCH OR SECURE PIN INVALID');
        triggerSecurityAlert();
      }
    } catch (err) {
      setLoading(false);
      setAuthProgress(0);
      setErrorMsg('CONNECTION TIMED OUT // HOST RESOLVE ERROR');
      triggerSecurityAlert();
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center w-full max-w-4xl font-jetbrains">

        {/* Link telemetry status sidebar */}
        <div className="md:col-span-2 hidden md:flex flex-col h-full self-stretch justify-between text-left border border-cyber-border/20 bg-cyber-sec/20 p-5 clip-corners relative select-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber-cyan/30" />

          <div className="flex flex-col gap-4">
            <span className="font-sharetech text-xs text-cyber-cyan font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-cyber-cyan/15 pb-2">
              <Server size={14} className="animate-pulse" aria-hidden="true" /> LINK STATUS CORE
            </span>

            <div className="text-[10px] text-white/50 flex flex-col gap-2.5 leading-relaxed font-mono">
              <div>
                <span className="text-cyber-cyan">[SYS_INF]</span> STACK INITIALIZED: REACT_V19 + VITE
              </div>
              <div>
                <span className="text-cyber-cyan">[SYS_INF]</span> ADDR: 185.241.9.11:80
              </div>
              <div>
                <span className="text-cyber-cyan">[SYS_INF]</span> NODE STATE: ENCRYPTED_TUNNEL
              </div>
              <div>
                <span className="text-cyber-red">[ALR_SYS]</span> DETECTED LOGGING FAILURE OVERRIDE PENDING
              </div>
              <div>
                <span className="text-cyber-cyan">[SYS_INF]</span> COMPILING SECURE KEY EXCHANGE DIALS...
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4 text-[9px] text-[#f5f5f5]/30">
            SECURE LINK // 128-BIT DIFFIE HELLMAN KEY EXCHANGE
          </div>
        </div>

        {/* Primary Authentication form card */}
        <div className="md:col-span-3">
          <CyberCard
            title="AUTHENTICATION TERMINAL"
            status={loading ? 'VERIFYING' : 'SECURE_HOLD'}
            variant={errorMsg ? 'red' : 'cyan'}
          >
            {loading ? (
              <div
                className="py-12 px-2 flex flex-col gap-6 text-center font-sharetech select-none"
                role="status"
                aria-live="polite"
              >
                <div className="w-10 h-10 border border-cyber-cyan rounded-full border-t-transparent animate-spin self-center" aria-hidden="true" />
                <LoadingBar progress={authProgress} statusText={statusText} />
                <p className="text-[11px] text-[#f5f5f5]/50 font-mono tracking-wider">
                  DO NOT RE-ROUTE GATEWAYS OR TERMINATE CLIENT CONSOLE DURING AUTHENTICATION.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuthenticate} className="flex flex-col gap-5">
                <CyberInput
                  label="AGENT_ID"
                  id="agent-id"
                  placeholder="e.g. agent@email.com"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  error={errorMsg && errorMsg.includes('AGENT') ? errorMsg : undefined}
                  required
                  autoFocus
                />

                <CyberInput
                  label="ACCESS_KEY"
                  id="access-key"
                  type="password"
                  placeholder="••••••••••••"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  error={errorMsg && errorMsg.includes('KEY') ? errorMsg : undefined}
                  required
                />

                {errorMsg && !errorMsg.includes('AGENT') && !errorMsg.includes('KEY') && (
                  <div
                    className="p-3 border border-cyber-red bg-cyber-red/10 text-cyber-red text-xs font-sharetech clip-corners flex items-center gap-2 select-none"
                    role="alert"
                  >
                    <AlertTriangle size={14} className="animate-pulse flex-shrink-0" aria-hidden="true" />
                    <span className="tracking-wide uppercase font-bold">{errorMsg}</span>
                  </div>
                )}

                <div className="mt-4 font-sharetech">
                  <CyberButton variant={errorMsg ? 'red' : 'cyan'} type="submit" className="w-full cursor-pointer">
                    <Shield size={16} aria-hidden="true" />
                    <span>AUTHENTICATE LINK</span>
                  </CyberButton>
                </div>
              </form>
            )}
          </CyberCard>
        </div>

      </div>
    </AuthLayout>
  );
};
export default LoginPage;
