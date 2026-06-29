export type UserStatus = 'ACTIVE' | 'OFFLINE' | 'COMPROMISED' | 'SECURE';

export interface User {
  name: string;
  id: string;
  rank: string;
  score: number;
  team: string;
  status: UserStatus;
  clearanceLevel: number;
}

export type ToastType = 'info' | 'error' | 'success';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
