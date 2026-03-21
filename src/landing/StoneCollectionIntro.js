import React from 'react';

/** Placeholder images — same card style as “Perfect for Every Space”; swap URLs anytime */
const STONE_TYPES = [
	{
		name: 'Granite Slabs',
		description: 'Strong and durable for kitchens and outdoors',
		image:
			'https://i.pinimg.com/1200x/47/5e/7a/475e7a399fcdcdc5f41a219b11dedb51.jpg',
		alt: 'Granite slabs and natural stone surfaces'
	},
	{
		name: 'Natural Marble',
		description: 'Elegant and timeless flooring solutions',
		image:
			'https://i.pinimg.com/1200x/d3/5a/1a/d35a1ac7b0f56d6c3d577a6e39656aa8.jpg',
		alt: 'Natural marble flooring and interior'
	},
	{
		name: 'Italian Marble',
		description: 'Premium luxury for modern interiors',
		image:
			'https://i.pinimg.com/736x/f8/5c/15/f85c15bc4f5db5534f36990a106acb0d.jpg',
		alt: 'Luxury Italian marble interior'
	},
	{
		name: 'Nano Tiles',
		description: 'Affordable and stylish tile solutions',
		image:
			'https://i.pinimg.com/1200x/82/33/94/823394096de86b36c6d9c3727d624a24.jpg',
		alt: 'Modern nano and vitrified tiles'
	}
];

export default function StoneCollectionIntro() {
	return (
		<section
			className="stone-collection-intro"
			aria-labelledby="stone-collection-heading"
		>
			<div className="container applications-wrap">
				<header className="applications-header">
					<h2 id="stone-collection-heading" className="applications-title">
						Our Stone Collection
					</h2>
				</header>
				<ul className="applications-cards applications-cards--four">
					{STONE_TYPES.map((item, idx) => (
						<li key={idx} className="application-card">
							<div className="application-card-image-wrap">
								<img
									src={item.image}
									alt={item.alt}
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="application-card-body">
								<p className="application-card-title">{item.name}</p>
								<p className="application-card-desc">{item.description}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
