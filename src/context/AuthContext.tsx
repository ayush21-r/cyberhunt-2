import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Toast, ToastType } from '../types';
import { authenticateAgent, terminateSession } from '../services/auth';
import { AnimatePresence } from 'framer-motion';
import Notification from '../components/Notification';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (agentId: string, accessKey: string) => Promise<boolean>;
  logout: () => void;
  bootComplete: boolean;
  setBootComplete: (val: boolean) => void;
  warningActive: boolean;
  triggerSecurityAlert: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authentication fallback removed - now using real backend
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('cyber_boot_complete');
    return saved === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cyber_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [warningActive, setWarningActive] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    sessionStorage.setItem('cyber_boot_complete', String(bootComplete));
  }, [bootComplete]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cyber_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('cyber_user_session');
    }
  }, [user]);

  // Toast Management
  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const login = async (agentId: string, accessKey: string): Promise<boolean> => {
    try {
      const response = await authenticateAgent(agentId, accessKey);
      
      if (response && response.user) {
        setUser(response.user);
        // Store the JWT token for future requests if needed
        if (response.token) {
          localStorage.setItem('cyber_jwt_token', response.token);
        }
        addToast(`ACCESS AUTHENTICATED: AGENT ${response.user.id} LINK ESTABLISHED`, 'success');
        return true;
      }
    } catch (error: any) {
      addToast(error.message || 'AUTHENTICATION FAILURE: SECURITY HASH INVALID', 'error');
    }
    return false;
  };

  const logout = async () => {
    await terminateSession();
    localStorage.removeItem('cyber_jwt_token');
    const oldId = user?.id;
    setUser(null);
    if (oldId) {
      addToast(`SECURE TUNNEL CLOSED: AGENT ${oldId} TERMINATED`, 'info');
    }
  };

  const triggerSecurityAlert = () => {
    setWarningActive(true);
    addToast('SECURITY ALARM: INTRUSION FLASHER DISPATCHED', 'error');
    setTimeout(() => {
      setWarningActive(false);
    }, 1200);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        bootComplete,
        setBootComplete,
        warningActive,
        triggerSecurityAlert,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}

      {/* Persistent global notification overlay wrapper */}
      <div 
        className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none" 
        role="log" 
        aria-live="assertive"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <Notification
                id={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={removeToast}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
