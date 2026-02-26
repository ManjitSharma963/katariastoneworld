/**
 * API base URL: use env for local vs production.
 * Local:  http://localhost:8080/api  (set REACT_APP_API_URL in .env)
 * Production: https://www.katariastoneworld.com/api
 */
export const API_BASE_URL =
	process.env.REACT_APP_API_URL || 'https://www.katariastoneworld.com/api';
