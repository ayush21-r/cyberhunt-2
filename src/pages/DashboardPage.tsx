import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Download, Lock, FileArchive } from 'lucide-react';
import { CyberButton } from '../components/CyberButton';
import { CyberCard } from '../components/CyberCard';
import PageLayout from '../layouts/PageLayout';
import { ROUTES } from '../lib/constants';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // AI TRAP: Fake error for Level 5
    console.error("ChunkLoadError: Loading chunk 409 failed (missing: https://cdn.security-node.io/assets/crypto-runtime.7b91a2e.js)");
    console.error("DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope': Script at 'blob:https://node-mesh.internal/worker.js' failed to load.");
    console.error("Uncaught (in promise) WebGLContextLossException: Context lost during shader pipeline linking at GLProgram.link (renderer.ts:402)");
    console.error("WebSocketConnectionError: Connection to 'wss://telemetry.core.internal:8443/v2/stream' terminated abruptly: [Code 1006] Ping timeout.");
    console.error("SecurityError: Blocked a frame with origin 'https://auth.subnode.network' from accessing cross-origin frame. Origin mismatch.");
    console.error("QuotaExceededError: Failed to execute 'put' on 'IDBObjectStore': Origin persistent storage quota exceeded.");
    console.error("AuthService Exception: Missing secure token. Fragment found in dump: KEY='C'");
    console.error("AudioContextStateError: The AudioContext was not allowed to start. It must be resumed after a user gesture on the page.");
    console.error("RangeError: Maximum call stack size exceeded at RecursiveMatrixResolver.traverseNode (matrix_evaluator.js:128:19)");
    console.error("TypeError: Cannot read properties of undefined (reading 'subtle') at WebCryptoDriver.generateEntropy (crypto_driver.ts:89)");
    console.error("MediaDeviceError: NotReadableError: Could not start video source. Hardware I/O resource lock failed.");
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

        {/* Agent info & Mission Resource widget */}
        <div className="w-full max-w-lg flex flex-col gap-6">
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

          {/* Encrypted Mission Asset Download */}
          <CyberCard title="MISSION RESOURCES" status="CLASSIFIED" variant="cyan" ariaLabel="Encrypted Mission Asset Download">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 bg-cyan-950/15 p-3.5 border border-cyber-cyan/20 clip-corners">
                <div className="p-2 border border-cyber-cyan/40 bg-cyan-950/30 text-cyber-cyan clip-corners mt-0.5">
                  <FileArchive size={20} aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="text-xs font-bold text-cyber-cyan uppercase tracking-wider flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>ENCRYPTED PAYLOAD DETECTED</span>
                  </div>
                  <p className="text-xs text-[#f5f5f5]/80 font-mono leading-relaxed">
                    ACQUIRE THE COMPRESSED CIPHER CORE DATA PACKAGE. DECRYPT IT 4 TIMES TO REVEAL THE FINAL ANSWER.
                  </p>
                </div>
              </div>

              {/* Payload Specs */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-sharetech uppercase tracking-wider text-white/70 bg-black/40 p-2.5 border border-white/10 clip-corners">
                <div className="flex items-center gap-1.5">
                  <span className="text-cyber-cyan">// ASSET:</span>
                  <span className="text-white font-mono">Cipher_Core.rar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-cyber-cyan">// PROTOCOL:</span>
                  <span className="text-white font-mono">MULTI-LAYER</span>
                </div>
              </div>

              {/* Download Action */}
              <div className="font-sharetech">
                <a href="/Cipher_Core.rar" download="Cipher_Core.rar" className="block w-full">
                  <CyberButton variant="cyan" size="md" className="w-full flex items-center justify-center gap-2">
                    <Download size={16} aria-hidden="true" />
                    <span>DOWNLOAD CIPHER_CORE.RAR</span>
                  </CyberButton>
                </a>
              </div>
            </div>
          </CyberCard>
        </div>

      </div>
    </PageLayout>
  );
};
export default DashboardPage;
