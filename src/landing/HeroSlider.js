import React, { useEffect, useState } from 'react';

export default function HeroSlider({ slides, intervalMs = 5000 }) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (slides.length === 0) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
		return () => clearInterval(id);
	}, [slides.length, intervalMs]);

	const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
	const next = () => setIndex((i) => (i + 1) % slides.length);

	// Return null if no slides
	if (!slides || slides.length === 0) {
		return null;
	}

	return (
		<div className="hero-slider">
			{slides.map((s, i) => (
				<div key={i} className={`slide ${i === index ? 'active' : ''}`}>
					<img src={s.img} alt={s.title} />
					<div className="slide-caption">
						<h2>{s.title}</h2>
						<p>{s.subtitle}</p>
					</div>
				</div>
			))}
			<button className="nav-btn prev" onClick={prev}><i className="fa-solid fa-chevron-left" /></button>
			<button className="nav-btn next" onClick={next}><i className="fa-solid fa-chevron-right" /></button>
		</div>
	);
}


