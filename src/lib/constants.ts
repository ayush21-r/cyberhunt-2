export const APP_NAME = 'TECHALFA CYBER HUNT';

export const COLORS = {
  bg: '#050505',
  secBg: '#0d1117',
  red: '#ff1e1e',
  cyan: '#00e5ff',
  white: '#f5f5f5',
  borderRed: 'rgba(255, 0, 0, 0.35)',
  borderCyan: 'rgba(0, 229, 255, 0.35)',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export const API_ENDPOINTS = {
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  VERIFY_SESSION: '/api/v1/auth/session',
  GET_STATS: '/api/v1/user/stats',
  GET_LEADERBOARD: '/api/v1/user/leaderboard',
} as const;

export const ANIMATIONS = {
  GLITCH_SPEED: 1.5, // seconds
  SCANLINE_SPEED: 8, // seconds
  BOOT_DELAY: 1500, // milliseconds
};
