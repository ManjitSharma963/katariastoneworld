import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';

export default function Header() {
	const { getCartCount } = useCart();
	const cartCount = getCartCount();
	const [isCartOpen, setIsCartOpen] = useState(false);

	return (
		<>
			<header className="site-header" role="banner">
				<div className="nav">
					<Link to="/" className="brand">
						<div className="logo">K</div>
						<div>
							<div className="title">Kataria Stone World</div>
							<div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
								Tiles • Granite • Marble
							</div>
						</div>
					</Link>
					<nav className="nav-links" aria-label="Main navigation">
						<Link to="/">Home</Link>
						<a href="#categories">Categories</a>
						<Link to="/products">Products</Link>
						<Link to="/inquiry">Contact</Link>
					</nav>
					<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
						<button
							onClick={() => setIsCartOpen(true)}
							className="cart-icon-wrapper"
							title="Shopping Cart"
							style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
						>
							<i className="fa-solid fa-cart-shopping" />
							{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
						</button>
						<Link to="/inquiry" className="cta">
							Request Quote <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px', fontSize: '12px' }} />
						</Link>
					</div>
				</div>
			</header>
			<CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</>
	);
}

