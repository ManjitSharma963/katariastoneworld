import React from 'react';

/** Placeholder images — swap URLs anytime for your own photos */
const APPLICATIONS = [
	{
		title: 'Kitchen Countertops',
		image:
			'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80',
		alt: 'Modern kitchen with stone countertops'
	},
	{
		title: 'Living Room Flooring',
		image:
			'https://i.pinimg.com/1200x/d4/3a/3d/d43a3d6c989ce540b24ee3086ddaef1e.jpg',
		alt: 'Elegant living room with polished flooring'
	},
	{
		title: 'Bathroom Walls & Floors',
		image:
			'https://i.pinimg.com/736x/f8/00/02/f800027ac7dec4edb50162a686d46f3f.jpg',
		alt: 'Stylish bathroom with marble-style surfaces'
	},
	{
		title: 'Outdoor Landscaping',
		image:
			'https://i.pinimg.com/1200x/21/01/dd/2101dd492d12dd0b86d96c59ea70a807.jpg',
		alt: 'Outdoor patio and stone landscaping'
	},
	{
		title: 'Commercial Buildings',
		image:
			'https://i.pinimg.com/1200x/dc/3c/0c/dc3c0c062e0b53b0e96b4b85b004a6cf.jpg',
		alt: 'Commercial office building exterior'
	}
];

export default function ApplicationsSection() {
	return (
		<section
			className="home-applications"
			aria-labelledby="applications-heading"
		>
			<div className="container applications-wrap">
				<header className="applications-header">
					<h2 id="applications-heading" className="applications-title">
						Perfect for Every Space
					</h2>
					<p className="applications-lead">Our stones are ideal for:</p>
				</header>
				<ul className="applications-cards">
					{APPLICATIONS.map((item, idx) => (
						<li key={idx} className="application-card">
							<div className="application-card-image-wrap">
								<img
									src={item.image}
									alt={item.alt}
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="application-card-body">
								<p className="application-card-title">{item.title}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
