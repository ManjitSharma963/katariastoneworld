import React from 'react';

export default function Footer() {
	return (
		<footer className="footer">
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
							<li>Contact Us</li>
						</ul>
					</div>
					<div className="footer-col">
						<h3>Contact Info</h3>
						<ul>
							<li>
								<strong>Address:</strong><br />
								10, Badshahpur Sohna Rd Hwy,<br />
								Bhondsi, Gurugram, Haryana 122102
							</li>
							<li>
								<strong>Mobile:</strong><br />
								<a href="tel:+918107707064">+91 81077 07064</a>
							</li>
							<li>
								<strong>Location:</strong><br />
								<a href="https://maps.app.goo.gl/Dnr5Z46ZmsnxV7YDA" target="_blank" rel="noreferrer">
									View on Google Maps
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="download-app">
					<span>Download App</span>
					<img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
					<img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
				</div>
			</div>
		</footer>
	);
}

