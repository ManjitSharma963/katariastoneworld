import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import './GraniteLanding.css';

const PAGE_TITLE = 'Granite Dealer in Bhondsi Gurgaon | Best Granite Shop Near Me';
const META_DESCRIPTION =
	'High-quality granite slabs in Bhondsi Gurgaon for kitchens, flooring & outdoor use. Durable, scratch-resistant granite in multiple colors — Kataria Stone World, Sohna Road.';

export default function GraniteLandingBhondsi() {
	return (
		<>
			<SEO
				fullTitle
				title={PAGE_TITLE}
				description={META_DESCRIPTION}
				keywords="granite Bhondsi, granite Gurgaon, granite dealer Sohna Road, granite slabs, granite kitchen, granite flooring, Kataria Stone World, best granite shop near me"
			/>
			<Header />
			<article className="landing-article">
				<div className="landing-article-inner">
					<h1 className="landing-article-title">{PAGE_TITLE}</h1>
					<div className="landing-article-body">
						<p>
							We provide high-quality granite slabs in Bhondsi Gurgaon for
							kitchens, flooring, and outdoor use. Our granite is durable,
							scratch-resistant, and available in multiple colors and finishes.
							Perfect for homes and builders looking for long-lasting stone
							solutions.
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
