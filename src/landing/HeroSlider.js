import React, { useEffect, useState } from 'react';

/** Shown when API returns no hero slides */
const FALLBACK_SLIDE_IMG =
	'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1920&q=80';

export default function HeroSlider({
	slides,
	intervalMs = 5000,
	heading,
	subtext
}) {
	const [index, setIndex] = useState(0);

	const displaySlides =
		slides && slides.length > 0
			? slides.map((s) => ({
					img: s.img,
					alt: s.title || 'Kataria Stone World'
			  }))
			: [{ img: FALLBACK_SLIDE_IMG, alt: 'Premium granite and marble Gurgaon' }];

	useEffect(() => {
		if (displaySlides.length <= 1) return;
		const id = setInterval(
			() => setIndex((i) => (i + 1) % displaySlides.length),
			intervalMs
		);
		return () => clearInterval(id);
	}, [displaySlides.length, intervalMs]);

	const prev = () =>
		setIndex((i) => (i - 1 + displaySlides.length) % displaySlides.length);
	const next = () => setIndex((i) => (i + 1) % displaySlides.length);

	return (
		<div className="hero-slider">
			{displaySlides.map((s, i) => (
				<div key={i} className={`slide ${i === index ? 'active' : ''}`}>
					<img src={s.img} alt={s.alt} />
				</div>
			))}
			<div className="slide-caption">
				<h1 className="hero-heading">{heading}</h1>
				<p className="hero-subtext">{subtext}</p>
			</div>
			{displaySlides.length > 1 && (
				<>
					<button
						type="button"
						className="nav-btn prev"
						onClick={prev}
						aria-label="Previous slide"
					>
						<i className="fa-solid fa-chevron-left" />
					</button>
					<button
						type="button"
						className="nav-btn next"
						onClick={next}
						aria-label="Next slide"
					>
						<i className="fa-solid fa-chevron-right" />
					</button>
				</>
			)}
		</div>
	);
}
