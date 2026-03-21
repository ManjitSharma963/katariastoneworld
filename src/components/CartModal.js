import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../landing.css';

export default function CartModal({ isOpen, onClose }) {
	const { cart, removeFromCart, updateSqft, increaseSqft, decreaseSqft, getCartCount } = useCart();
	const navigate = useNavigate();
	const cartCount = getCartCount();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (cartCount === 0) {
		return (
			<div className="cart-modal-overlay" onClick={handleOverlayClick}>
				<div className="cart-modal" onClick={(e) => e.stopPropagation()}>
					<div className="cart-modal-header-new">
						<button className="cart-modal-close-left" onClick={onClose}>
							<i className="fa-solid fa-times" />
						</button>
						<h2 className="cart-modal-title">
							My Cart (0)
						</h2>
						<button 
							onClick={() => {
								onClose();
								navigate('/');
							}} 
							className="cart-modal-home"
						>
							<i className="fa-solid fa-house" />
						</button>
					</div>
					<div className="cart-modal-content-new" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
						<div style={{ textAlign: 'center', padding: '40px 20px' }}>
							<i className="fa-solid fa-cart-shopping" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }} />
							<h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
								Your cart is empty
							</h3>
							<p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
								Start adding items to your cart to see them here.
							</p>
							<button onClick={onClose} className="cart-checkout-btn" style={{ background: 'var(--accent)' }}>
								Continue Shopping <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }} />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="cart-modal-overlay" onClick={handleOverlayClick}>
			<div className="cart-modal" onClick={(e) => e.stopPropagation()}>
				<div className="cart-modal-header-clean">
					<button className="cart-modal-back-btn" onClick={onClose}>
						<i className="fa-solid fa-arrow-left" />
					</button>
					<h2 className="cart-modal-title-clean">
						My Cart
					</h2>
					<button className="cart-modal-add-btn">
						<i className="fa-solid fa-plus" />
					</button>
				</div>
				<div className="cart-modal-content-clean">
					<div className="cart-items-list-clean">
						{cart.map((item) => (
							<div key={item.id} className="cart-item-card-clean">
								<button
									className="cart-item-remove-clean"
									onClick={() => removeFromCart(item.id)}
									title="Remove Item"
								>
									<i className="fa-solid fa-xmark" />
								</button>
								<img src={item.img} alt={item.title} className="cart-item-image-clean" />
								<div className="cart-item-info-clean">
									<h3 className="cart-item-name-clean">{item.title}</h3>
									{item.type && <p className="cart-item-category-clean">{item.type}</p>}
								</div>
								<div className="cart-item-qty-clean">
									<button
										className="qty-btn-clean minus"
										onClick={() => decreaseSqft(item.id)}
										disabled={(item.sqftOrdered || 1) <= 1}
									>
										<i className="fa-solid fa-minus" />
									</button>
									<input
										type="number"
										min="1"
										max={item.totalSqft || 999999}
										value={item.sqftOrdered || 1}
										onChange={(e) => {
											const val = parseInt(e.target.value) || 1;
											const maxSqft = item.totalSqft || 999999;
											updateSqft(item.id, Math.min(Math.max(1, val), maxSqft));
										}}
										className="qty-input-clean"
									/>
									<button
										className="qty-btn-clean plus"
										onClick={() => {
											const maxSqft = item.totalSqft || 999999;
											if ((item.sqftOrdered || 1) < maxSqft) {
												increaseSqft(item.id);
											}
										}}
										disabled={(item.sqftOrdered || 1) >= (item.totalSqft || 999999)}
									>
										<i className="fa-solid fa-plus" />
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="summary-total-clean" style={{ marginTop: '16px' }}>
						<span className="total-label-clean">Total</span>
						<span className="total-value-clean">{cart.reduce((sum, item) => sum + (item.sqftOrdered || 0), 0).toLocaleString()} sq ft</span>
					</div>

					{/* Submit for Enquiry Button */}
					<button
						onClick={() => {
							const totalSqft = cart.reduce((sum, item) => {
								return sum + (item.sqftOrdered || 0);
							}, 0);

							// Format WhatsApp message
							let message = '📦 PRODUCT SUMMARY\n\n';
							
							cart.forEach((item) => {
								const sqft = item.sqftOrdered || 0;
								message += `${item.title} - ${sqft.toLocaleString()} sq ft\n`;
							});

							message += `\nTOTAL - ${totalSqft.toLocaleString()} sq ft`;

							// Encode message for URL
							const encodedMessage = encodeURIComponent(message);
							const whatsappNumber = '919996965755';
							const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

							// Open WhatsApp in a new tab so this site stays open
							window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
						}}
						className="cart-checkout-btn-clean"
						disabled={cart.length === 0}
					>
						Submit for Enquiry
					</button>
				</div>
			</div>
		</div>
	);
}



