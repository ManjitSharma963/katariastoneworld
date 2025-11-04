import React from 'react';

export default function LocateStore() {
	return (
		<section id="locate-store" className="locate-store">
			<div className="container store-content">
				<div className="store-text">
					<h2>Locate a Store <br /><span className="highlight">Near You</span></h2>
					<div className="store-stats">
						<div className="stat"><h3>100+</h3><p>Operating Dealers</p></div>
						<div className="stat"><h3>3+</h3><p>Exclusive Showrooms</p></div>
						<div className="stat"><h3>3+</h3><p>Experience Centres</p></div>
					</div>
					<a href="#contact" className="find-btn">Find Now <i className="fa-solid fa-arrow-right" /></a>
				</div>
				<div className="store-image">
					<img src="https://i.pinimg.com/1200x/a1/36/a1/a136a1634fcb0b94618b1517b2f63090.jpg" alt="Experience Center" />
				</div>
			</div>
		</section>
	);
}


