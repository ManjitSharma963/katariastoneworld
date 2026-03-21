import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import './GraniteLanding.css';

const PAGE_TITLE = 'Nano Tiles in Gurgaon | Affordable & Stylish Tile Solutions';
const META_DESCRIPTION =
	'High-quality nano tiles in Gurgaon — durable, cost-effective & stylish. Ideal for homes, offices & commercial spaces. Low maintenance, long-lasting shine — Kataria Stone World.';

export default function NanoTilesLanding() {
	return (
		<>
			<SEO
				fullTitle
				title={PAGE_TITLE}
				description={META_DESCRIPTION}
				keywords="nano tiles Gurgaon, vitrified tiles, floor tiles Gurgaon, affordable tiles, stylish tiles, commercial tiles, Kataria Stone World, nano tile shop"
			/>
			<Header />
			<article className="landing-article landing-article--nano">
				<div className="landing-article-inner">
					<div className="landing-visual" aria-hidden="true">
						<span className="landing-visual-icon">🧱</span>
					</div>
					<h1 className="landing-article-title">{PAGE_TITLE}</h1>
					<div className="landing-article-body">
						<p>
							We offer high-quality nano tiles in Gurgaon that are durable,
							cost-effective, and stylish. Perfect for modern homes, offices, and
							commercial spaces with low maintenance and long-lasting shine.
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
