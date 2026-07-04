

import MOCK_USERS from '../../backend/users.json';


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
