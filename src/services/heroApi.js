// Use full endpoint URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Fetch all hero slides from the API
 * @returns {Promise<Array>} Array of hero slides
 */
export const fetchHeroes = async () => {
	try {
		const url = `${API_BASE_URL}/heroes`;
		console.log('📞 [API] Calling heroes endpoint:', url);
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		console.log('📥 [API] Heroes response status:', response.status, response.statusText);

		// Clone response to avoid "body already read" error
		const contentType = response.headers.get('content-type') || '';

		if (!response.ok) {
			// Check if response is JSON or HTML
			if (contentType.includes('application/json')) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			} else {
				// If HTML error page, log the status
				const text = await response.text();
				console.error('❌ /api/heroes returned HTML error page');
				console.error('Response Status:', response.status);
				console.error('Response Preview:', text.substring(0, 500));
				throw new Error(`/api/heroes returned HTML error page (status: ${response.status}). Check if the endpoint exists.`);
			}
		}

		// Check if response is actually JSON
		if (!contentType.includes('application/json')) {
			const text = await response.text();
			console.error('❌ /api/heroes returned HTML instead of JSON');
			console.error('Response Content-Type:', contentType);
			console.error('Response Status:', response.status);
			console.error('Response Preview:', text.substring(0, 500));
			throw new Error(`/api/heroes returned HTML (status: ${response.status}). Check if the endpoint exists and is configured correctly.`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching heroes:', error);
		throw error;
	}
};

