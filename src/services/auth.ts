import { API_ENDPOINTS } from '../lib/constants';

/**
 * Service to handle agent security session authentication commands.
 */

/**
 * Authenticates the agent with ID and security PIN.
 * @param agentId The unique identifier of the agent.
 * @param accessKey The security cryptographic pin.
 * @returns A promise resolving to the user profile or null if failed.
 * 
 * TODO: Integrate with backend endpoint: POST `${API_ENDPOINTS.LOGIN}`
 * - Process hash exchange and securely send payload.
 * - Store the JWT or Session token inside HttpOnly cookies or secure client storage.
 * - Hook up response intercepts to fetch and map errors.
 */
export async function authenticateAgent(agentId: string, accessKey: string): Promise<any> {
  console.log(`[API TODO] POST ${API_ENDPOINTS.LOGIN} with ID:`, agentId, 'Key length:', accessKey.length);
  
  // Return undefined for now, client side will fall back to mock context verification.
  return Promise.resolve(undefined);
}

/**
 * Terminates the active agent secure tunnel.
 * 
 * TODO: Integrate with backend endpoint: POST `${API_ENDPOINTS.LOGOUT}`
 * - Revoke active JWT session on the server.
 * - Clear client side security cookies and local stores.
 */
export async function terminateSession(): Promise<void> {
  console.log(`[API TODO] POST ${API_ENDPOINTS.LOGOUT}`);
  return Promise.resolve();
}

/**
 * Validates the existing session on client load.
 * 
 * TODO: Integrate with backend endpoint: GET `${API_ENDPOINTS.VERIFY_SESSION}`
 * - Send cookie/bearer token to check authorization clearance.
 */
export async function verifyActiveSession(): Promise<any> {
  console.log(`[API TODO] GET ${API_ENDPOINTS.VERIFY_SESSION}`);
  return Promise.resolve(undefined);
}
