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

// Mock database for authentication fallback
const MOCK_USERS: Record<string, Omit<User, 'id'>> = {
  'AGENT_ALPHA': {
    name: 'Sarah Connor',
    rank: '04',
    score: 1450,
    team: 'NET_RUNNERS',
    status: 'ACTIVE',
    clearanceLevel: 4,
  },
  'AGENT_ZERO': {
    name: 'David Lightman',
    rank: '01',
    score: 1980,
    team: 'WAR_GAMES',
    status: 'SECURE',
    clearanceLevel: 5,
  },
  'AGENT_V': {
    name: 'Valerie Hudson',
    rank: '12',
    score: 870,
    team: 'GRID_PHANTOMS',
    status: 'ACTIVE',
    clearanceLevel: 3,
  },
  'AGENT_NEO': {
    name: 'Thomas Anderson',
    rank: '02',
    score: 1850,
    team: 'THE_MATRIX',
    status: 'COMPROMISED',
    clearanceLevel: 5,
  }
};

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
    // 1. Fire service API call (placeholder only)
    await authenticateAgent(agentId, accessKey);

    // 2. Perform client-side mock authentication
    const normalizedId = agentId.toUpperCase().trim();
    const mockUser = MOCK_USERS[normalizedId];

    if (mockUser && accessKey.length >= 6) {
      setUser({
        id: normalizedId,
        ...mockUser,
      });
      addToast(`ACCESS AUTHENTICATED: AGENT ${normalizedId} LINK ESTABLISHED`, 'success');
      return true;
    }

    addToast('AUTHENTICATION FAILURE: SECURITY HASH INVALID', 'error');
    return false;
  };

  const logout = async () => {
    await terminateSession();
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
