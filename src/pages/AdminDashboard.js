import React, { useState } from 'react';

export default function AdminDashboard() {
	const [items, setItems] = useState([
		{ id: 'SKU-001', name: 'Carrara Marble', price: 180 },
		{ id: 'SKU-002', name: 'Black Galaxy Granite', price: 220 }
	]);
	const [draft, setDraft] = useState({ id: '', name: '', price: '' });

	const addItem = (e) => {
		e.preventDefault();
		if (!draft.id || !draft.name || !draft.price) return;
		setItems([...items, { ...draft, price: Number(draft.price) }]);
		setDraft({ id: '', name: '', price: '' });
	};

	const remove = (id) => setItems(items.filter((i) => i.id !== id));

	return (
		<div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gap: 16 }}>
			<h2>Admin dashboard</h2>
			<form onSubmit={addItem} style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 2fr 1fr auto' }}>
				<input placeholder="SKU" value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} />
				<input placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
				<input type="number" placeholder="Price" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
				<button type="submit">Add</button>
			</form>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>SKU</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Price</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((i) => (
						<tr key={i.id}>
							<td>{i.id}</td>
							<td>{i.name}</td>
							<td>₹ {i.price}</td>
							<td><button onClick={() => remove(i.id)}>Delete</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}


