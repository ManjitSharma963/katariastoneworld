// Use full endpoint URL
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Submit billing data to the API
 * @param {Object} billingData - The billing data object
 * @param {string} billingData.customerMobileNumber - Customer mobile number
 * @param {Array} billingData.items - Array of cart items
 * @param {number} billingData.taxPercentage - Tax percentage
 * @param {number} billingData.discountAmount - Discount amount
 * @param {number} billingData.totalAmount - Total amount
 * @returns {Promise} API response
 */
export const submitBilling = async (billingData) => {
	try {
		const response = await fetch(`${API_BASE_URL}/bills`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(billingData),
		});

		if (!response.ok) {
			// Check if response is JSON or HTML
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			} else {
				// If HTML error page, log the status
				const text = await response.text();
				console.error('❌ /api/bills returned HTML error page');
				console.error('Response Status:', response.status);
				console.error('Response Preview:', text.substring(0, 500));
				throw new Error(`/api/bills returned HTML error page (status: ${response.status}). Check if the endpoint exists.`);
			}
		}

		// Check if response is actually JSON
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			const text = await response.text();
			console.error('❌ /api/bills returned HTML instead of JSON');
			console.error('Response Content-Type:', contentType);
			console.error('Response Status:', response.status);
			console.error('Response Preview:', text.substring(0, 500));
			throw new Error(`/api/bills returned HTML (status: ${response.status}). Check if the endpoint exists and is configured correctly.`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error submitting billing:', error);
		throw error;
	}
};

/**
 * Format cart items for billing API
 * @param {Array} cartItems - Cart items from context
 * @returns {Array} Formatted items for API
 */
export const formatCartItemsForBilling = (cartItems) => {
	return cartItems.map((item) => ({
		itemName: item.title || item.name || 'Unknown Item',
		category: item.type || 'Unknown',
		pricePerUnit: item.price || 0,
		quantity: item.sqftOrdered || 1,
	}));
};

