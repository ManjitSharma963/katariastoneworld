import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Helper function to determine product type from title
const getProductType = (title) => {
	if (!title) return 'tiles';
	const titleLower = title.toLowerCase();
	if (titleLower.includes('marble')) return 'marble';
	if (titleLower.includes('granite')) return 'granite';
	if (titleLower.includes('tile')) return 'tiles';
	if (titleLower.includes('countertop') || titleLower.includes('counter top')) return 'countertop';
	return 'tiles'; // default
};

// Helper function to estimate price based on type
const getPrice = (type, title) => {
	if (!title) {
		if (type === 'countertop') return 250;
		return 60;
	}
	const titleLower = title.toLowerCase();
	if (type === 'marble') return titleLower.includes('carrara') || titleLower.includes('calacatta') ? 200 : 150;
	if (type === 'granite') return titleLower.includes('black') || titleLower.includes('white galaxy') ? 180 : 140;
	if (type === 'countertop') return 250;
	return 60; // tiles default
};

// Helper function to generate stock sq ft
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

export default function CategoryGrid({ title, subtitle, items, showInfo = false, enableCart = false, showSeeMore = false, limitRows = false }) {
	const { addToCart } = useCart();
	const navigate = useNavigate();

	const handleProductClick = () => {
		navigate('/products');
	};

	const handleAddToCart = (e, item, idx) => {
		e.stopPropagation(); // Prevent navigation when clicking add to cart button
		const itemTitle = item.title || item.name || '';
		const type = (item.productType || '').toLowerCase() || getProductType(itemTitle);
		const price = item.price || getPrice(type, itemTitle);
		const totalSqft = item.totalSqft || getStockSqft(type, idx);
		addToCart({
			id: item.id || `item-${idx}-${Date.now()}`,
			title: itemTitle || `Product ${idx + 1}`,
			img: item.primaryImageUrl || item.img,
			price: price,
			sqftPerUnit: item.sqftPerUnit || 30, // Default 30 sqft per unit for stone slabs
			totalSqft: totalSqft
		});
	};

	const handleSeeMore = () => {
		navigate('/products');
	};

	return (
		<section className="categories" id={title ? undefined : 'categories'}>
			<div className="container">
				{title && <h2 className="section-title">{title}</h2>}
				{subtitle && <p className="section-subtitle">{subtitle}</p>}
				<div className={`category-grid ${limitRows ? 'category-grid-single-row' : ''}`}>
					{items.map((it, idx) => (
						<div 
							key={idx} 
							className="category-card" 
							onClick={handleProductClick}
							style={{ cursor: 'pointer' }}
						>
							<img src={it.primaryImageUrl || it.img} alt={it.title || it.name} />
							{showInfo ? (
								<div className="category-info">
									<h3 className="category-title">{it.title || it.name}</h3>
									{enableCart && (() => {
										const itemTitle = it.title || it.name || '';
										const type = (it.productType || '').toLowerCase() || getProductType(itemTitle);
										const price = it.price || getPrice(type, itemTitle);
										const totalSqft = it.totalSqft || getStockSqft(type, idx);
										return (
											<>
												<div style={{ fontSize: '14px', color: '#333', fontWeight: '600', marginTop: '8px', marginBottom: '4px' }}>
													₹{price} <span style={{ fontSize: '12px', color: '#666', fontWeight: '400' }}>/ sq ft</span>
												</div>
												<p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', marginBottom: '4px' }}>
													<i className="fa-solid fa-warehouse" style={{ marginRight: '4px', fontSize: '11px' }} />
													{totalSqft} sq ft in stock
												</p>
												{it.sqftPerUnit && (
													<p style={{ fontSize: '12px', color: '#666', fontWeight: '400', marginBottom: '8px' }}>
														<i className="fa-solid fa-ruler-combined" style={{ marginRight: '4px', fontSize: '11px' }} />
														{it.sqftPerUnit} sq ft per unit
													</p>
												)}
												<button
													className="add-to-cart-btn"
													onClick={(e) => handleAddToCart(e, it, idx)}
												>
													<i className="fa-solid fa-cart-plus" style={{ marginRight: '6px' }} />
													Add to Cart
												</button>
											</>
										);
									})()}
								</div>
							) : (
								<>
									{(it.title || it.name) && <h3>{it.title || it.name}</h3>}
									{enableCart && (() => {
										const itemTitle = it.title || it.name || '';
										const type = (it.productType || '').toLowerCase() || getProductType(itemTitle);
										const price = it.price || getPrice(type, itemTitle);
										const totalSqft = it.totalSqft || getStockSqft(type, idx);
										return (
											<>
												<div style={{ fontSize: '14px', color: '#333', fontWeight: '600', marginTop: '8px', marginBottom: '4px' }}>
													₹{price} <span style={{ fontSize: '12px', color: '#666', fontWeight: '400' }}>/ sq ft</span>
												</div>
												<p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>
													<i className="fa-solid fa-warehouse" style={{ marginRight: '4px', fontSize: '11px' }} />
													{totalSqft} sq ft in stock
												</p>
												<button
													className="add-to-cart-btn"
													onClick={(e) => handleAddToCart(e, it, idx)}
												>
													<i className="fa-solid fa-cart-plus" style={{ marginRight: '6px' }} />
													Add to Cart
												</button>
											</>
										);
									})()}
								</>
							)}
						</div>
					))}
				</div>
				{showSeeMore && (
					<div className="see-more-wrapper">
						<button className="see-more-btn" onClick={handleSeeMore}>
							See More
							<i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }} />
						</button>
					</div>
				)}
			</div>
		</section>
	);
}


