import React from 'react';

const PRODUCT_TYPES = [
	{ value: '', label: 'All Types', icon: 'fa-grid-2' },
	{ value: 'marble', label: 'Marble', icon: 'fa-gem' },
	{ value: 'granite', label: 'Granite', icon: 'fa-mountain' },
	{ value: 'tiles', label: 'Tiles', icon: 'fa-square' },
	{ value: 'countertop', label: 'Counter Top', icon: 'fa-table' }
];

const COMMON_COLORS = ['white', 'black', 'beige', 'brown', 'blue', 'gray', 'gold', 'green'];

export default function Filters({ filters, onChange }) {
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
				{/* Product Type - Chip Style */}
				<div className="filter-section-wrapper">
					<div className="filter-section-label">
						<i className="fa-solid fa-layer-group" />
						<span>Product Type</span>
					</div>
					<div className="filter-chips-container">
						{PRODUCT_TYPES.map((type) => (
							<button
								key={type.value}
								className={`filter-chip ${filters.type === type.value ? 'active' : ''}`}
								onClick={() => update('type', type.value)}
							>
								<i className={`fa-solid ${type.icon}`} />
								<span>{type.label}</span>
								{filters.type === type.value && (
									<i className="fa-solid fa-check check-icon" />
								)}
							</button>
						))}
					</div>
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


