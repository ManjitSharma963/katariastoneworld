import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/categoriesApi';

const COMMON_COLORS = ['white', 'black', 'beige', 'brown', 'blue', 'gray', 'gold', 'green'];

// Icon mapping for common categories
const getCategoryIcon = (categoryName) => {
	const name = categoryName.toLowerCase();
	if (name.includes('marble')) return 'fa-gem';
	if (name.includes('granite')) return 'fa-mountain';
	if (name.includes('tile')) return 'fa-square';
	if (name.includes('counter') || name.includes('table')) return 'fa-table';
	if (name.includes('chair')) return 'fa-chair';
	return 'fa-box';
};

export default function Filters({ filters, onChange }) {
	const [categories, setCategories] = useState([]);
	const [isLoadingCategories, setIsLoadingCategories] = useState(true);

	// Fetch categories from API
	useEffect(() => {
		const loadCategories = async () => {
			try {
				setIsLoadingCategories(true);
				const allCategories = await fetchCategories();
				if (Array.isArray(allCategories) && allCategories.length > 0) {
					// Map categories to filter format
					const mappedCategories = allCategories.map(cat => ({
						value: (cat.name || '').toLowerCase().replace(/\s+/g, '-'),
						label: cat.name || '',
						icon: getCategoryIcon(cat.name || '')
					}));
					setCategories(mappedCategories);
				}
			} catch (error) {
				console.error('Failed to load categories for filters:', error);
				// Keep empty array on error
				setCategories([]);
			} finally {
				setIsLoadingCategories(false);
			}
		};

		loadCategories();
	}, []);
	const update = (key, value) => {
		onChange({ ...filters, [key]: value });
	};

	const clearFilters = () => {
		onChange({ type: '', color: '' });
	};

	const toggleColor = (color) => {
		if (filters.color === color) {
			update('color', '');
		} else {
			update('color', color);
		}
	};

	const hasActiveFilters = filters.type || filters.color;

	return (
		<div className="filters-section-creative">
			<div className="filters-background-decoration"></div>
			
			<div className="filters-header-creative">
				<div className="filters-animated-icon">
					<div className="icon-ring"></div>
					<i className="fa-solid fa-sliders-h" />
				</div>
				<div className="filters-header-text">
					<h3 className="filters-title-creative">
						<span className="title-highlight">Discover</span> Your Perfect Match
					</h3>
					<p className="filters-subtitle-creative">
						Refine your search with smart filters
					</p>
				</div>
				{hasActiveFilters && (
					<button className="clear-filters-btn-creative" onClick={clearFilters}>
						<i className="fa-solid fa-times-circle" />
						<span>Reset</span>
					</button>
				)}
			</div>

			<div className="filters-content-creative">
				{/* Product Type - Chip Style - Dynamic from API */}
				<div className="filter-section-wrapper">
					<div className="filter-section-label">
						<i className="fa-solid fa-layer-group" />
						<span>Category</span>
					</div>
					{isLoadingCategories ? (
						<div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
							<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
							Loading categories...
						</div>
					) : (
						<div className="filter-chips-container">
							{/* All Types option */}
							<button
								key="all"
								className={`filter-chip ${filters.type === '' ? 'active' : ''}`}
								onClick={() => update('type', '')}
							>
								<i className="fa-solid fa-grid-2" />
								<span>All Categories</span>
								{filters.type === '' && (
									<i className="fa-solid fa-check check-icon" />
								)}
							</button>
							{/* Dynamic categories from API */}
							{categories.map((category) => (
								<button
									key={category.value}
									className={`filter-chip ${filters.type === category.value ? 'active' : ''}`}
									onClick={() => update('type', category.value)}
								>
									<i className={`fa-solid ${category.icon}`} />
									<span>{category.label}</span>
									{filters.type === category.value && (
										<i className="fa-solid fa-check check-icon" />
									)}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Color Filter - Visual Picker */}
				<div className="filter-section-wrapper">
					<div className="filter-section-label">
						<i className="fa-solid fa-palette" />
						<span>Color</span>
					</div>
					<div className="color-filter-container">
						<div className="color-chips-grid">
							{COMMON_COLORS.map((color) => (
								<button
									key={color}
									className={`color-chip ${filters.color === color ? 'active' : ''}`}
									onClick={() => toggleColor(color)}
									style={{ '--color-name': color }}
								>
									<span className="color-chip-indicator" style={{ backgroundColor: getColorHex(color) }}></span>
									<span className="color-chip-label">{color}</span>
									{filters.color === color && (
										<i className="fa-solid fa-check color-check-icon" />
									)}
								</button>
							))}
						</div>
						<div className="color-search-wrapper">
							<div className="color-search-input-wrapper">
								<i className="fa-solid fa-magnifying-glass search-icon" />
								<input
									className="color-search-input"
									type="text"
									placeholder="Or search for a specific color..."
									value={filters.color && !COMMON_COLORS.includes(filters.color) ? filters.color : ''}
									onChange={(e) => update('color', e.target.value)}
								/>
								{filters.color && !COMMON_COLORS.includes(filters.color) && (
									<button 
										className="clear-color-btn"
										onClick={() => update('color', '')}
									>
										<i className="fa-solid fa-times" />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function getColorHex(colorName) {
	const colorMap = {
		white: '#ffffff',
		black: '#1a1a1a',
		beige: '#f5f5dc',
		brown: '#8b4513',
		blue: '#4169e1',
		gray: '#808080',
		gold: '#ffd700',
		green: '#228b22'
	};
	return colorMap[colorName.toLowerCase()] || '#cccccc';
}


