import React from 'react';

/** Replace with your own showroom / team photo — place file in public/images/ */
const ABOUT_IMAGE =
	'https://i.pinimg.com/736x/a0/9e/94/a09e94c2637e00029fe3ea5dcf51035c.jpg';
export default function HomeAbout() {
	return (
		<section className="home-about" aria-labelledby="home-about-heading">
			<div className="home-about-card">
				<div className="home-about__visual">
					<div className="home-about__visual-slants" aria-hidden="true" />
					<div className="home-about__visual-img">
						<img
							src={ABOUT_IMAGE}
							alt="Premium granite and marble slabs at our Gurgaon stone yard"
							width={600}
							height={750}
							loading="lazy"
							decoding="async"
						/>
					</div>
					<span className="home-about__step-num" aria-hidden="true">
						01
					</span>
				</div>
				<div className="home-about__body">
					<div className="home-about__body-main">
						<p className="home-about__step-label">Who we are</p>
						<h2 id="home-about-heading" className="home-about-title">
							Your Trusted Stone Supplier in Gurgaon
						</h2>
						<p className="home-about-lead">
							Quality you can see — from slab selection to delivery.
						</p>
						<p className="home-about-text">
							We are one of the leading suppliers of granite and marble in Gurgaon,
							providing premium quality stones for flooring, kitchen countertops, wall
							cladding, and outdoor applications. Our collection includes durable
							granite, elegant marble, and luxury Italian marble to match every design
							and budget.
						</p>
					</div>
					<div className="home-about__icon-wrap" aria-hidden="true">
						<i className="fa-solid fa-gem" />
					</div>
				</div>
			</div>
		</section>
	);
}
