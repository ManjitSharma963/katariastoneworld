import React from 'react';

export default function WhatsAppWidget({ phone = '918700000000', message = 'Hi! I am interested in tiles.' }) {
	const encoded = encodeURIComponent(message);
	const href = `https://wa.me/${phone}?text=${encoded}`;

	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			title="Chat on WhatsApp"
			style={{
				position: 'fixed',
				bottom: 24,
				right: 24,
				background: '#25D366',
				color: 'white',
				padding: '12px 16px',
				borderRadius: 24,
				textDecoration: 'none',
				boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
			}}
		>
			WhatsApp
		</a>
	);
}


