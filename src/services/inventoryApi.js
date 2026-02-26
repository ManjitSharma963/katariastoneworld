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

/**
 * Fetch all inventory/stone products from the API (legacy)
 * @returns {Promise<Array>} Array of stone products
 */
export const fetchInventory = async () => {
	try {
		const url = `${API_BASE_URL}/inventory`;
		console.log('📞 [API] Calling inventory endpoint:', url);
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		console.log('📥 [API] Inventory response status:', response.status, response.statusText);

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
					console.error('❌ /api/inventory returned HTML instead of JSON');
					console.error('Received HTML error page - backend may not be running');
					throw new Error('Backend server issue: Request to /api/inventory returned HTML. Check if backend is running on https://www.katariastoneworld.com');
				}
				throw new Error(`API error (status: ${response.status})`);
			}
		}

		// Check content type before parsing
		if (!contentType.includes('application/json')) {
			const text = await response.text();
			if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
				console.error('❌ /api/inventory returned HTML instead of JSON');
				console.error('Received HTML instead of JSON - backend may not be running');
				console.error('Response preview:', text.substring(0, 300));
				throw new Error('Backend server issue: Request to /api/inventory returned HTML. Check if backend is running on https://www.katariastoneworld.com');
			}
			throw new Error(`API returned non-JSON response (Content-Type: ${contentType})`);
		}

		// Parse JSON
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching inventory:', error);
		throw error;
	}
};

