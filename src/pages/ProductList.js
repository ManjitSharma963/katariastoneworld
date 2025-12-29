import React, { useMemo, useState, useEffect } from 'react';
import Filters from '../components/Filters';
import Header from '../landing/Header';
import { useCart } from '../context/CartContext';
import { fetchInventory } from '../services/inventoryApi';
import './ProductList.css';

// Helper function to determine product type from title
const getProductType = (title) => {
	const titleLower = title.toLowerCase();
	if (titleLower.includes('marble')) return 'marble';
	if (titleLower.includes('granite')) return 'granite';
	if (titleLower.includes('tile')) return 'tiles';
	if (titleLower.includes('countertop') || titleLower.includes('counter top')) return 'countertop';
	return 'tiles'; // default
};

// Helper function to determine color from title (fallback if API doesn't provide)
const getColor = (title) => {
	const titleLower = title.toLowerCase();
	if (titleLower.includes('black')) return 'black';
	if (titleLower.includes('white')) return 'white';
	if (titleLower.includes('gold')) return 'gold';
	if (titleLower.includes('brown')) return 'brown';
	if (titleLower.includes('blue')) return 'blue';
	if (titleLower.includes('pink')) return 'pink';
	if (titleLower.includes('beige')) return 'beige';
	if (titleLower.includes('gray') || titleLower.includes('grey')) return 'gray';
	if (titleLower.includes('green')) return 'green';
	if (titleLower.includes('red')) return 'red';
	return 'multi'; // default
};

// Map API products to unified format - only use data from API
const mapProductsFromAPI = (stoneProducts = []) => {
	return stoneProducts.map((product, idx) => {
		const productName = product.name || product.title || '';
		// API returns: productType, pricePerUnit, quantity, unit, primaryImageUrl
		const type = (product.productType || product.product_type || '').toLowerCase() || getProductType(productName);
		const unit = product.unit || 'sqft'; // Default to sqft if not provided
		
		// Get price with priority: pricePerSqftAfter > price_per_sqft_after > pricePerSqft > price_per_sqft > pricePerUnit
		const pricePerSqftAfter = product.pricePerSqftAfter || product.price_per_sqft_after || product.pricePerSqft || product.price_per_sqft || product.pricePerUnit || 0;
		
		return {
			id: product.id || `product-${idx}`,
			name: productName,
			type: type,
			color: (product.color || '').toLowerCase() || getColor(productName),
			price: pricePerSqftAfter,
			pricePerSqftAfter: pricePerSqftAfter, // Store for display
			primaryImageUrl: product.primaryImageUrl || product.primary_image_url || product.img || product.image_url || '',
			img: product.primaryImageUrl || product.primary_image_url || product.img || product.image_url || '',
			totalSqft: product.quantity || product.totalSqftStock || product.total_sqft_stock || 0,
			unit: unit // Store unit for display
		};
	});
};

export default function ProductList() {
	const [filters, setFilters] = useState({ type: '', color: '' });
	const [stoneProducts, setStoneProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart } = useCart();

	// Fetch products from API only
	useEffect(() => {
		const loadProducts = async () => {
			try {
				setIsLoading(true);
				const inventory = await fetchInventory();
				if (Array.isArray(inventory)) {
					setStoneProducts(inventory);
				} else {
					setStoneProducts([]);
				}
			} catch (error) {
				console.error('Failed to load products from API:', error);
				// Keep empty array on error - no hardcoded fallback
				setStoneProducts([]);
			} finally {
				setIsLoading(false);
			}
		};

		loadProducts();
	}, []);

	// Map API products to unified format
	const allProducts = useMemo(() => {
		return mapProductsFromAPI(stoneProducts);
	}, [stoneProducts]);

	const products = useMemo(() => {
		return allProducts.filter((p) => {
			// Category/Type filter - flexible matching
			if (filters.type) {
				const productType = (p.type || '').toLowerCase().replace(/\s+/g, '-');
				const filterType = filters.type.toLowerCase();
				// Match exact or if product type contains filter type
				if (productType !== filterType && !productType.includes(filterType) && !filterType.includes(productType)) {
					return false;
				}
			}
			// Color filter
			if (filters.color && !p.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
			return true;
		});
	}, [allProducts, filters]);

	const handleAddToCart = (product) => {
		addToCart({
			id: product.id,
			title: product.name,
			img: product.primaryImageUrl || product.img,
			price: product.pricePerSqftAfter,
			type: product.type, // Product type for badge display
			sqftPerUnit: 30, // Default sqft per unit for cart calculations
			totalSqft: product.totalSqft // Total stock available
		});
	};

	return (
		<>
			<Header />
			<div className="products-page">
				<div className="products-container">
			<Filters filters={filters} onChange={setFilters} />

				{isLoading ? (
					<div className="no-products">
						<div className="no-products-icon">
							<i className="fa-solid fa-spinner fa-spin" />
						</div>
						<h3 className="no-products-title">Loading products...</h3>
					</div>
				) : (
					<div className="products-grid">
					{products.map((p) => (
						<div key={p.id} className="product-card">
							<div className="product-image-wrapper">
								<img src={p.primaryImageUrl || p.img} alt={p.name} className="product-image" />
								<div className="product-badge">{p.type}</div>
								<div className="product-color-badge">{p.color}</div>
							</div>
							<div className="product-content">
								<h3 className="product-name">{p.name}</h3>
								{/*<div className="product-meta">
									<span style={{ textTransform: 'capitalize' }}>{p.type}</span>
								</div>*/}
								
								<button 
									className="product-enquire-btn"
									onClick={() => handleAddToCart(p)}
								>
									<i className="fa-solid fa-cart-plus" />
									Add to Cart
								</button>
							</div>
						</div>
					))}
					</div>
				)}

				{!isLoading && products.length === 0 && (
					<div className="no-products">
						<div className="no-products-icon">
							<i className="fa-solid fa-inbox" />
						</div>
						<h3 className="no-products-title">No products found</h3>
						<p className="no-products-text">
							No products match the selected filters. Try adjusting your filters to see more results.
						</p>
					</div>
				)}
				</div>
			</div>
		</>
	);
}


