import React from 'react';

const PHONES = [
	{ label: '8107707064', href: 'tel:+918107707064' },
	{ label: '9996657779', href: 'tel:+919996657779' }
];

export default function ContactCTA() {
	return (
		<section
			id="contact"
			className="contact"
			aria-labelledby="cta-heading"
		>
			<h2 id="cta-heading">Visit Kataria Stone World Today</h2>
			<p className="contact-intro">
				Explore our premium collection of granite, marble, and tiles at our
				showroom in Sohna Road, Bhondsi, Gurgaon.
			</p>
			<div className="contact-phones" role="group" aria-label="Call us">
				<span className="contact-phones-label" aria-hidden="true">
					📞 Call Now:
				</span>{' '}
				{PHONES.map((p, i) => (
					<span key={p.href}>
						{i > 0 && <span className="contact-phone-sep"> / </span>}
						<a href={p.href} className="contact-phone-link">
							{p.label}
						</a>
					</span>
				))}
			</div>
			<a
				href="https://wa.me/918107707064"
				className="cta"
				target="_blank"
				rel="noopener noreferrer"
			>
				Chat on WhatsApp
			</a>
		</section>
	);
}
