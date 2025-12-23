// Use full endpoint URL
//const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = process.env.REACT_APP_API_URL;


/**
 * Login and get access token
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {Promise<Object>} Response with access_token
 */
export const login = async (email, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				const errorData = await response.json();
				throw new Error(errorData.message || `Login failed: ${response.status}`);
			} else {
				const text = await response.text();
				throw new Error(`Login failed: ${response.status}`);
			}
		}

		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new Error('Invalid response format from server');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error during login:', error);
		throw error;
	}
};

/**
 * Get stored access token from localStorage
 * @returns {string|null} Access token or null
 */
export const getAccessToken = () => {
	return localStorage.getItem('access_token');
};

/**
 * Store access token in localStorage
 * @param {string} token - Access token
 */
export const setAccessToken = (token) => {
	localStorage.setItem('access_token', token);
};

/**
 * Remove access token from localStorage
 */
export const removeAccessToken = () => {
	localStorage.removeItem('access_token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
	return !!getAccessToken();
};

