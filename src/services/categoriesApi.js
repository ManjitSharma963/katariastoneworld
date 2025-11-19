// Use full endpoint URL
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Fetch all categories from the API
 * @param {string} categoryType - Optional: Filter by 'room' or 'material'
 * @returns {Promise<Array>} Array of categories
 */
export const fetchCategories = async (categoryType = null) => {
	try {
		let url = `${API_BASE_URL}/categories`;
		
		// Add query parameter if category type is specified
		if (categoryType) {
			url += `?category_type=${categoryType}`;
		}
		
		console.log('📞 [API] Calling categories endpoint:', url);
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		console.log('📥 [API] Categories response status:', response.status, response.statusText);

		// Get content type first (before reading body)
		const contentType = response.headers.get('content-type') || '';

		if (!response.ok) {
			// Check if response is JSON or HTML
			if (contentType.includes('application/json')) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			} else {
				// If HTML, it's likely a proxy issue
				const text = await response.text();
				if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
					console.error('❌ /api/categories returned HTML instead of JSON');
					console.error('Received HTML error page - backend may not be running');
					throw new Error('Backend server issue: Request to /api/categories returned HTML. Check if backend is running on http://localhost:8080');
				}
				throw new Error(`API error (status: ${response.status})`);
			}
		}

		// Check content type before parsing
		if (!contentType.includes('application/json')) {
			const text = await response.text();
			console.error('❌ /api/categories returned HTML instead of JSON');
			console.error('Response Content-Type:', contentType);
			console.error('Response Status:', response.status);
			console.error('Response Preview:', text.substring(0, 500));
			throw new Error(`/api/categories returned HTML (status: ${response.status}). Check if the endpoint exists and is configured correctly.`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

/**
 * Fetch room categories only
 * @returns {Promise<Array>} Array of room categories
 */
export const fetchRoomCategories = async () => {
	return fetchCategories('room');
};

/**
 * Fetch material categories only
 * @returns {Promise<Array>} Array of material categories
 */
export const fetchMaterialCategories = async () => {
	return fetchCategories('material');
};

