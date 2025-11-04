import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
	const metaTitle = title ? `${title} | Stone & Tiles` : 'Stone & Tiles - Quality Marble, Granite, Tiles';
	const metaDescription = description || 'Premium marble, granite, and tiles in Gurgaon. Best prices, fast delivery, expert guidance.';
	const metaKeywords = keywords || 'tiles in Gurgaon, marble Gurgaon, granite Gurgaon, floor tiles, wall tiles';

	return (
		<Helmet>
			<title>{metaTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
		</Helmet>
	);
}


