import { API_ENDPOINTS } from '../lib/constants';

/**
 * Service to handle agent metrics and scoreboard operations.
 */

/**
 * Fetches the user stats details for the authenticated agent.
 * @param agentId The unique agent ID to query.
 * 
 * TODO: Integrate with backend endpoint: GET `${API_ENDPOINTS.GET_STATS.replace(':id', agentId)}`
 * - Map server metrics (score, solved nodes count, clearance indices) into UI User structure.
 */
export async function getAgentStats(agentId: string): Promise<any> {
  console.log(`[API TODO] GET ${API_ENDPOINTS.GET_STATS} for agent:`, agentId);
  return Promise.resolve(undefined);
}

/**
 * Fetches the global scoreboard standings.
 * 
 * TODO: Integrate with backend endpoint: GET `${API_ENDPOINTS.GET_LEADERBOARD}`
 * - Query top-ranked team data and agent point metrics for display in HUD dashboard tables.
 * - Establish websocket triggers if live-updating scoreboard logs are required.
 */
export async function getScoreboardStanding(): Promise<any[]> {
  console.log(`[API TODO] GET ${API_ENDPOINTS.GET_LEADERBOARD}`);
  return Promise.resolve([]);
}
