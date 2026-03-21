import { API_BASE_URL } from './apiConfig';

/**
 * Fetch website products from api/website-products (public, no authentication required).
 * Returns list of { name, slug, description, primaryImageUrl, isActive }
 * @returns {Promise<Array>} Array of website products
 */
export const fetchWebsiteProducts = async () => {
	try {
		const url = `${API_BASE_URL}/website-products`;
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const contentType = response.headers.get('content-type') || '';
		if (!response.ok) {
			if (contentType.includes('application/json')) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}
			throw new Error(`API error (status: ${response.status})`);
		}
		if (!contentType.includes('application/json')) {
			const text = await response.text();
			if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
				throw new Error('Backend returned HTML instead of JSON.');
			}
			throw new Error(`API returned non-JSON (Content-Type: ${contentType})`);
		}
		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error('Error fetching website products:', error);
		throw error;
	}
};
