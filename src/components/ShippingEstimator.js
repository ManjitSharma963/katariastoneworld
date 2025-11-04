import React, { useMemo, useState } from 'react';

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

	const pricePerKmPerTon = 22; // ₹ per km per 1000 kg (illustrative)
	const fixedLoading = 450; // ₹ fixed

	const selectedCity = useMemo(
		() => CITIES.find((c) => c.name === city) || CITIES[0],
		[city]
	);

	const km = selectedCity.baseKm;
	const tons = Math.max(0, (parseFloat(weightKg) || 0) / 1000);
	const variableCost = km * pricePerKmPerTon * tons;
	const total = fixedLoading + variableCost;

	return (
		<div style={{ maxWidth: 480, margin: '0 auto' }}>
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
				<p>Estimated shipping: <strong>₹ {total.toFixed(2)}</strong></p>
				<p style={{ fontSize: 12, color: '#666' }}>Indicative only. Final transport rate varies by carrier, quantity, and access.</p>
			</div>
		</div>
	);
}


