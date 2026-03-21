import React from 'react';
import { Helmet } from 'react-helmet-async';

/** Homepage / site defaults — match public/index.html for crawlers that read first paint */
export const SITE_TITLE =
	'Granite & Marble Shop in Sohna Road Gurgaon | Kataria Stone World';
export const SITE_DESCRIPTION =
	'Buy premium granite, Italian marble & tiles in Bhondsi Gurgaon. Best prices. Call now!';
/**
 * Keyword groups (homepage / site default):
 * Primary — granite shop Gurgaon, marble shop Gurgaon
 * Local — granite Bhondsi, marble Sohna Road
 * Buyer intent — granite near me, marble dealer near me
 * Premium — Italian marble Gurgaon
 */
export const DEFAULT_KEYWORDS =
	'granite shop Gurgaon, marble shop Gurgaon, granite Bhondsi, marble Sohna Road, granite near me, marble dealer near me, Italian marble Gurgaon, granite Gurgaon, marble Gurgaon, nano tiles, imported marble, Bhondsi, stone supplier Gurgaon, floor tiles, wall tiles, Kataria Stone World';

/**
 * Per-page SEO (react-helmet-async). For SPA: also keep public/index.html in sync for static crawlers.
 * @param {string} [title] - Page title segment; full title becomes `${title} | Kataria Stone World` unless fullTitle is true
 * @param {string} [description] - Meta description (defaults to SITE_DESCRIPTION)
 * @param {string} [keywords] - Meta keywords
 * @param {boolean} [fullTitle] - If true, `title` is used as the complete <title> (no suffix)
 */
export default function SEO({ title, description, keywords, fullTitle = false }) {
	const metaTitle = fullTitle
		? title || SITE_TITLE
		: title
			? `${title} | Kataria Stone World`
			: SITE_TITLE;
	const metaDescription = description || SITE_DESCRIPTION;
	const metaKeywords = keywords || DEFAULT_KEYWORDS;

	return (
		<Helmet>
			<html lang="en" />
			<title>{metaTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta name="robots" content="index, follow" />
			{/* Open Graph — helps previews & some crawlers */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={metaTitle} />
			<meta property="og:description" content={metaDescription} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={metaTitle} />
			<meta name="twitter:description" content={metaDescription} />
		</Helmet>
	);
}
