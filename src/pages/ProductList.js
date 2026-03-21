import React, { useMemo, useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import { useCart } from '../context/CartContext';
import { fetchWebsiteProducts } from '../services/inventoryApi';
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

// Map website-products API to unified format: { name, slug, description, primaryImageUrl, isActive }
const mapProductsFromAPI = (websiteProducts = []) => {
	return websiteProducts
		.filter((p) => p.isActive !== false)
		.map((product, idx) => {
			const productName = product.name || '';
			const type = getProductType(productName);
			return {
				id: product.slug || product.id || `product-${idx}`,
				name: productName,
				type,
				color: getColor(productName),
				price: 0,
				pricePerSqftAfter: 0,
				primaryImageUrl: product.primaryImageUrl || '',
				img: product.primaryImageUrl || '',
				totalSqft: 0,
				unit: 'sqft',
				description: product.description || ''
			};
		});
};

export default function ProductList() {
	const [stoneProducts, setStoneProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart } = useCart();

	// Fetch products from api/website-products
	useEffect(() => {
		const loadProducts = async () => {
			try {
				setIsLoading(true);
				const list = await fetchWebsiteProducts();
				setStoneProducts(Array.isArray(list) ? list : []);
			} catch (error) {
				console.error('Failed to load products from API:', error);
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

	const products = allProducts;

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
			<SEO
				title="Marble, Granite & Tiles"
				description="Browse premium granite, Italian marble & nano tiles at Kataria Stone World — Bhondsi, Sohna Road Gurgaon."
				keywords="products, granite, marble, tiles, Gurgaon, Sohna Road, Bhondsi, Kataria Stone World"
			/>
			<Header />
			<div className="products-page">
				<div className="products-container">
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
							No products are listed at the moment. Please check back soon or contact us for availability.
						</p>
					</div>
				)}
				</div>
			</div>
		</>
	);
}


