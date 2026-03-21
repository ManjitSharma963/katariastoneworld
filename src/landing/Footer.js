import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const localBusinessJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'Kataria Stone World',
	description:
		'Premium granite, marble, nano tiles and stone supplier on Sohna Road, Bhondsi, Gurgaon.',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Sohna Road, Bhondsi',
		addressLocality: 'Gurgaon',
		addressRegion: 'Haryana',
		addressCountry: 'IN'
	},
	telephone: ['+91-8107707064', '+91-9996657779'],
	url: 'https://www.katariastoneworld.com'
};

export default function Footer() {
	return (
		<footer className="footer">
			<Helmet>
				<script type="application/ld+json">
					{JSON.stringify(localBusinessJsonLd)}
				</script>
			</Helmet>

			<div className="footer-container">
				<div className="footer-links">
					<div className="footer-col">
						<h3>Products</h3>
						<ul>
							<li>Bathroom</li>
							<li>Kitchen</li>
							<li>Living Room</li>
							<li>Bedroom</li>
							<li>Outdoor</li>
							<li>Commercial Spaces</li>
							<li>Staircases</li>
							<li>Countertops Slabs</li>
							<li>Elevation Tiles</li>
						</ul>
					</div>
					<div className="footer-col">
						<h3>Categories</h3>
						<ul>
							<li>Glazed Vitrified Tiles</li>
							<li>Gres Tiles</li>
							<li>Polished Vitrified Tiles</li>
							<li>Ceramic Wall Tiles</li>
							<li>Faucets and Sanitaryware</li>
							<li>Tile Adhesive</li>
						</ul>
					</div>
					<div className="footer-col">
						<h3>Company</h3>
						<ul>
							<li>About us</li>
							<li>Code of Conduct</li>
							<li>Career</li>
							<li>
								<Link to="/blog">Blog</Link>
							</li>
							<li>Contact Us</li>
						</ul>
					</div>
					<div className="footer-col">
						<h3>Visit us</h3>
						<ul>
							<li>
								<strong>Kataria Stone World</strong>
								<br />
								Sohna Road, Bhondsi
								<br />
								Gurgaon, Haryana
							</li>
							<li>
								<strong>Call</strong>
								<br />
								<span className="footer-phone-row">
									<a href="tel:+918107707064" className="footer-tel">
										8107707064
									</a>
									<span className="footer-phone-sep"> / </span>
									<a href="tel:+919996657779" className="footer-tel">
										9996657779
									</a>
								</span>
							</li>
							<li>
								<a
									href="https://maps.app.goo.gl/Dnr5Z46ZmsnxV7YDA"
									target="_blank"
									rel="noreferrer"
								>
									Google Maps — directions
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="download-app">
					<span>Download App</span>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
						alt="Google Play"
					/>
					<img
						src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
						alt="App Store"
					/>
				</div>
			</div>
		</footer>
	);
}
