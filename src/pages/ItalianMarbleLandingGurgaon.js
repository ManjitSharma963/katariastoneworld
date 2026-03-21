import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import './GraniteLanding.css';

const PAGE_TITLE = 'Italian Marble in Gurgaon | Premium Imported Marble Supplier';
const META_DESCRIPTION =
	'Italian marble in Gurgaon — Carrara, Calacatta & premium imported slabs for luxury interiors. Quality, thickness & design options at Kataria Stone World, Sohna Road & Bhondsi.';

export default function ItalianMarbleLandingGurgaon() {
	return (
		<>
			<SEO
				fullTitle
				title={PAGE_TITLE}
				description={META_DESCRIPTION}
				keywords="Italian marble Gurgaon, imported marble, Carrara marble, Calacatta, marble supplier Sohna Road, luxury marble Bhondsi, Kataria Stone World"
			/>
			<Header />
			<article className="landing-article landing-article--marble">
				<div className="landing-article-inner">
					<div className="landing-visual" aria-hidden="true">
						<span className="landing-visual-icon">🏛️</span>
					</div>
					<h1 className="landing-article-title">{PAGE_TITLE}</h1>
					<div className="landing-article-body">
						<p>
							Italian marble prices in Gurgaon vary depending on quality,
							thickness, and design. Premium imported marble is ideal for luxury
							interiors and adds long-term value to your property. At Kataria Stone
							World, we stock a curated range of Italian marble for flooring,
							walls, and feature surfaces — ideal for homes and commercial spaces
							seeking timeless elegance.
						</p>
					</div>
					<div className="landing-article-cta">
						<Link to="/products" className="landing-btn primary">
							View stone collection
						</Link>
						<Link
							to={{ pathname: '/', hash: 'contact' }}
							className="landing-btn outline"
						>
							Visit showroom
						</Link>
					</div>
				</div>
			</article>
			<Footer />
		</>
	);
}
