import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

export interface Config {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  JWT_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

// Helper to check and retrieve required string variables
function getEnvRequired(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.warn(`[WARNING] Config: Env variable "${key}" is not set. Using placeholder fallback.`);
    return `placeholder_${key.toLowerCase()}`;
  }
  return value;
}

export const config: Config = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: (process.env.NODE_ENV as any) || 'development',
  JWT_SECRET: getEnvRequired('JWT_SECRET'),
  SUPABASE_URL: getEnvRequired('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvRequired('SUPABASE_ANON_KEY'),
  SUPABASE_SERVICE_ROLE_KEY: getEnvRequired('SUPABASE_SERVICE_ROLE_KEY'),
};

export default config;
