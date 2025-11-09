import React, { useMemo, useState, useEffect } from 'react';
import Filters from '../components/Filters';
import Header from '../landing/Header';
import { useCart } from '../context/CartContext';
import { categoriesRooms, categoriesTypes } from '../landing/data';
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

// Helper function to determine color from title
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

// Helper function to estimate price based on type
const getPrice = (type, title) => {
	const titleLower = title.toLowerCase();
	if (type === 'marble') return titleLower.includes('carrara') || titleLower.includes('calacatta') ? 200 : 150;
	if (type === 'granite') return titleLower.includes('black') || titleLower.includes('white galaxy') ? 180 : 140;
	if (type === 'countertop') return 250;
	return 60; // tiles default
};

// Helper function to generate random stock sq ft
const getStockSqft = (type, idx) => {
	// Generate varied stock amounts based on product type
	const baseStock = {
		marble: [150, 200, 180, 220, 175, 190, 210],
		granite: [120, 160, 140, 180, 135, 170, 155],
		tiles: [500, 600, 550, 650, 580, 620, 590],
		countertop: [80, 100, 90, 110, 95, 105, 85]
	};
	
	const stocks = baseStock[type] || [200, 250, 230, 270, 240, 260, 220];
	return stocks[idx % stocks.length];
};

// Combine all products into a unified list
const getAllProducts = (stoneProducts = []) => {
	const allProducts = [];

	// Add stone products from API
	stoneProducts.forEach((product, idx) => {
		const productName = product.name || product.title || '';
		// API returns camelCase: productType, pricePerSqft, totalSqftStock, primaryImageUrl
		const type = (product.productType || product.product_type || '').toLowerCase() || getProductType(productName);
		allProducts.push({
			id: product.id || `stone-${idx}`,
			name: productName,
			type: type,
			color: (product.color || '').toLowerCase() || getColor(productName),
			price: product.pricePerSqft || product.price_per_sqft || getPrice(type, productName),
			primaryImageUrl: product.primaryImageUrl || product.primary_image_url || product.img || product.image_url || '',
			img: product.primaryImageUrl || product.primary_image_url || product.img || product.image_url || '',
			totalSqft: product.totalSqftStock || product.total_sqft_stock || getStockSqft(type, idx)
		});
	});

	// Add room categories
	categoriesRooms.forEach((product, idx) => {
		allProducts.push({
			id: `room-${idx}`,
			name: product.title,
			type: 'tiles',
			color: 'multi',
			price: 55,
			img: product.img,
			totalSqft: getStockSqft('tiles', idx + 10)
		});
	});

	// Add type categories
	categoriesTypes.forEach((product, idx) => {
		const type = getProductType(product.title);
		allProducts.push({
			id: `type-${idx}`,
			name: product.title,
			type: type,
			color: 'multi',
			price: getPrice(type, product.title),
			img: product.img,
			totalSqft: getStockSqft(type, idx + 20)
		});
	});

	return allProducts;
};

export default function ProductList() {
	const [filters, setFilters] = useState({ type: '', color: '' });
	const [stoneProducts, setStoneProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart } = useCart();

	// Fetch stone products from API
	useEffect(() => {
		const loadStoneProducts = async () => {
			try {
				setIsLoading(true);
				const inventory = await fetchInventory();
				if (Array.isArray(inventory)) {
					setStoneProducts(inventory);
				}
			} catch (error) {
				console.error('Failed to load stone products from API:', error);
				// Keep empty array on error
			} finally {
				setIsLoading(false);
			}
		};

		loadStoneProducts();
	}, []);

	const allProducts = useMemo(() => {
		return getAllProducts(stoneProducts);
	}, [stoneProducts]);

	const products = useMemo(() => {
		return allProducts.filter((p) => {
			if (filters.type && p.type !== filters.type) return false;
			if (filters.color && !p.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
			return true;
		});
	}, [allProducts, filters]);

	const handleAddToCart = (product) => {
		addToCart({
			id: product.id,
			title: product.name,
			img: product.primaryImageUrl || product.img,
			price: product.price,
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
							</div>
							<div className="product-content">
								<h3 className="product-name">{p.name}</h3>
								<div className="product-meta">
									<span style={{ textTransform: 'capitalize' }}>{p.type}</span>
									<span style={{ textTransform: 'capitalize' }}>{p.color}</span>
								</div>
								<div className="product-price">
									₹{p.price}
									<span className="price-unit">/ sq ft</span>
								</div>
								{p.totalSqft && (
									<div className="product-sqft">
										<i className="fa-solid fa-warehouse" />
										{p.totalSqft} sq ft in stock
									</div>
								)}
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


