import { API_ENDPOINTS } from '../lib/constants';

// Simulated database of users so the app works purely on the frontend (Netlify friendly)
const MOCK_USERS = [
  { id: "AGENT_ALPHA", password: "secret123" },
  { id: "AGENT_ZERO", password: "admin456" },
  { id: "TESTUSER", password: "password123" },
  { id: "AGENT_NEO", password: "password123" },
  { id: "CYBER_1", password: "pass_cyber_1" },
  { id: "CYBER_2", password: "pass_cyber_2" },
  { id: "CYBER_3", password: "pass_cyber_3" },
  { id: "CYBER_4", password: "pass_cyber_4" },
  { id: "CYBER_5", password: "pass_cyber_5" },
  { id: "CYBER_6", password: "pass_cyber_6" },
  { id: "CYBER_7", password: "pass_cyber_7" },
  { id: "CYBER_8", password: "pass_cyber_8" },
  { id: "CYBER_9", password: "pass_cyber_9" },
  { id: "CYBER_10", password: "pass_cyber_10" }
];

export async function authenticateAgent(agentId: string, accessKey: string): Promise<any> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(u => 
    u.id.toLowerCase() === agentId.trim().toLowerCase() && u.password === accessKey
  );

  if (user) {
    // Return a fake token and the user object
    return {
      success: true,
      token: "fake-jwt-token-for-netlify-demo",
      user: { id: user.id },
      message: 'AUTHENTICATION SUCCESSFUL'
    };
  } else {
    throw new Error('Invalid agent ID or access key');
  }
}

export async function terminateSession(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return Promise.resolve();
}

export async function verifyActiveSession(): Promise<any> {
  return Promise.resolve(undefined);
}
