import React, { useMemo, useState } from 'react';
import SEO from './SEO';

const CITIES = [
	{ name: 'Gurgaon', baseKm: 0 },
	{ name: 'Delhi', baseKm: 35 },
	{ name: 'Noida', baseKm: 55 },
	{ name: 'Faridabad', baseKm: 30 },
	{ name: 'Ghaziabad', baseKm: 60 }
];

export default function ShippingEstimator() {
	const [city, setCity] = useState('Gurgaon');
	const [weightKg, setWeightKg] = useState('');

	const selectedCity = useMemo(
		() => CITIES.find((c) => c.name === city) || CITIES[0],
		[city]
	);

	const km = selectedCity.baseKm;

	return (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
			<SEO title="Shipping Estimator" description="Estimate distance and delivery for stone and tiles — Kataria Stone World, Gurgaon." />
			<h3>Location-based shipping</h3>
			<label>
				Destination
				<select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%' }}>
					{CITIES.map((c) => (
						<option key={c.name} value={c.name}>{c.name}</option>
					))}
				</select>
			</label>
			<label>
				Total shipment weight (kg)
				<input
					type="number"
					min="0"
					value={weightKg}
					onChange={(e) => setWeightKg(e.target.value)}
					style={{ width: '100%' }}
				/>
			</label>
			<div style={{ marginTop: 12 }}>
				<p>Distance: <strong>{km}</strong> km</p>
				<p style={{ fontSize: 12, color: '#666' }}>Indicative only. Final transport rate varies by carrier, quantity, and access.</p>
			</div>
		</div>
	);
}


