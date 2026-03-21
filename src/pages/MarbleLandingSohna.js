import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import './GraniteLanding.css';

const PAGE_TITLE = 'Marble Shop in Sohna Road Gurgaon | Premium Marble Supplier';
const META_DESCRIPTION =
	'Premium marble in Sohna Road Gurgaon — white marble, designer stones for flooring, walls & interiors. Luxury homes & modern designs at Kataria Stone World.';

export default function MarbleLandingSohna() {
	return (
		<>
			<SEO
				fullTitle
				title={PAGE_TITLE}
				description={META_DESCRIPTION}
				keywords="marble Sohna Road, marble Gurgaon, marble shop, Italian marble, white marble, marble flooring, marble walls, Kataria Stone World, premium marble supplier"
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
							Discover a wide range of premium marble in Sohna Road Gurgaon.
							From white marble to designer stones, we offer elegant options for
							flooring, walls, and interiors. Ideal for luxury homes and modern
							designs.
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
