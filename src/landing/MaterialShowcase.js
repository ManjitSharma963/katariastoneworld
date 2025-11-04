import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MaterialShowcase({ images }) {
	const navigate = useNavigate();
	const trackRef = useRef(null);
	const [index, setIndex] = useState(0);
	const itemCount = images.length;
	const maxIndex = Math.max(0, itemCount - 3);

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i < maxIndex ? i + 1 : 0));
		}, 4000);
		return () => clearInterval(id);
	}, [maxIndex]);

	useEffect(() => {
		if (!trackRef.current) return;
		const itemWidth = trackRef.current.children[0]?.offsetWidth || 0;
		const translateX = -index * (itemWidth + 20);
		trackRef.current.style.transform = `translateX(${translateX}px)`;
	}, [index]);

	const prev = () => setIndex((i) => (i > 0 ? i - 1 : maxIndex));
	const next = () => setIndex((i) => (i < maxIndex ? i + 1 : 0));

	const handleProductClick = () => {
		navigate('/products');
	};

	return (
		<section className="material-showcase">
			<h2>Our Premium Collections</h2>
			<div className="material-slider">
				<button className="mat-btn prev" onClick={prev}><i className="fa-solid fa-chevron-left" /></button>
				<div className="material-track" ref={trackRef}>
					{images.map((src, idx) => (
						<div 
							className="material-item" 
							key={idx}
							onClick={handleProductClick}
							style={{ cursor: 'pointer' }}
						>
							<img src={src} alt={`Material ${idx + 1}`} />
						</div>
					))}
				</div>
				<button className="mat-btn next" onClick={next}><i className="fa-solid fa-chevron-right" /></button>
			</div>
		</section>
	);
}


