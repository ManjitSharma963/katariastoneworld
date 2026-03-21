import React, { useState } from 'react';
import SEO from './SEO';

export default function Calculator() {
	const [lengthFeet, setLengthFeet] = useState('');
	const [widthFeet, setWidthFeet] = useState('');

	const length = parseFloat(lengthFeet) || 0;
	const width = parseFloat(widthFeet) || 0;

	const area = length * width;

	return (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<SEO title="Square Foot Calculator" description="Calculate area in sq ft for your tile and stone project — Kataria Stone World, Sohna Road Gurgaon." />
			<h2>Square-foot calculator</h2>
			<div style={{ display: 'grid', gap: 12 }}>
				<label>
					Length (ft)
					<input
						type="number"
						value={lengthFeet}
						onChange={(e) => setLengthFeet(e.target.value)}
						min="0"
						step="0.01"
						style={{ width: '100%' }}
					/>
				</label>
				<label>
					Width (ft)
					<input
						type="number"
						value={widthFeet}
						onChange={(e) => setWidthFeet(e.target.value)}
						min="0"
						step="0.01"
						style={{ width: '100%' }}
					/>
				</label>
			</div>
			<div style={{ marginTop: 16 }}>
				<p>Area: <strong>{area.toFixed(2)}</strong> sq ft</p>
			</div>
		</div>
	);
}


