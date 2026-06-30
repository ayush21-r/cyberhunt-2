import { API_ENDPOINTS } from '../lib/constants';

const API_BASE_URL = 'http://localhost:5000';

export async function authenticateAgent(agentId: string, accessKey: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ agentId, accessKey })
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      return data;
    } else {
      throw new Error(data.message || 'Authentication failed');
    }
  } catch (error: any) {
    console.error('Login request failed:', error);
    throw error;
  }
}

export async function terminateSession(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, { method: 'POST' });
  } catch (error) {
    console.error('Logout request failed:', error);
  }
  return Promise.resolve();
}

export async function verifyActiveSession(): Promise<any> {
  // Not heavily used without a verify route, but keeping signature
  return Promise.resolve(undefined);
}
