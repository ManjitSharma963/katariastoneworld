import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../landing.css';

export default function CartModal({ isOpen, onClose }) {
	const { cart, removeFromCart, updateSqft, increaseSqft, decreaseSqft, getCartCount, clearCart } = useCart();
	const cartCount = getCartCount();
	const [showBreakdown, setShowBreakdown] = useState(true);
	const [taxRate, setTaxRate] = useState(() => {
		const saved = localStorage.getItem('cartTaxRate');
		return saved ? parseFloat(saved) : 5;
	});
	const [discountAmount, setDiscountAmount] = useState(() => {
		const saved = localStorage.getItem('cartDiscountAmount');
		return saved ? parseFloat(saved) : 0;
	});
	const [mobileNumber, setMobileNumber] = useState(() => {
		const saved = localStorage.getItem('cartMobileNumber');
		return saved || '';
	});

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

	useEffect(() => {
		localStorage.setItem('cartTaxRate', taxRate.toString());
	}, [taxRate]);

	useEffect(() => {
		localStorage.setItem('cartDiscountAmount', discountAmount.toString());
	}, [discountAmount]);

	useEffect(() => {
		localStorage.setItem('cartMobileNumber', mobileNumber);
	}, [mobileNumber]);

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
						<Link to="/" onClick={onClose} className="cart-modal-home">
							<i className="fa-solid fa-house" />
						</Link>
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

	const totalSqft = cart.reduce((sum, item) => {
		return sum + (item.sqftOrdered || 0);
	}, 0);

	const subtotal = cart.reduce((sum, item) => {
		return sum + ((item.price || 0) * (item.sqftOrdered || 0));
	}, 0);
	const tax = (subtotal * taxRate) / 100;
	const total = Math.max(0, subtotal + tax - (discountAmount || 0));

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
									<div className="cart-item-pricing-clean">
										<span className="cart-item-price-clean">₹ {((item.price || 0) * (item.sqftOrdered || 0)).toLocaleString()}</span>
									</div>
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

					{/* Summary Section */}
					<div className="cart-summary-clean">
						<div className="summary-row-clean">
							<span className="summary-label-clean">Subtotal</span>
							<span className="summary-value-clean">₹ {subtotal.toLocaleString()}</span>
						</div>
						<div className="summary-row-clean editable-tax">
							<span className="summary-label-clean">Tax ({taxRate}%):</span>
							<div className="tax-input-wrapper">
								<input
									type="number"
									min="0"
									max="100"
									step="0.1"
									value={taxRate}
									onChange={(e) => {
										const val = e.target.value;
										if (val === '' || val === null || val === undefined) {
											setTaxRate(0);
										} else {
											const parsed = parseFloat(val);
											if (!isNaN(parsed)) {
												setTaxRate(Math.max(0, Math.min(100, parsed)));
											} else {
												setTaxRate(0);
											}
										}
									}}
									onBlur={(e) => {
										const val = e.target.value;
										if (val === '' || val === null || val === undefined) {
											setTaxRate(0);
										} else {
											const parsed = parseFloat(val);
											if (!isNaN(parsed)) {
												setTaxRate(Math.max(0, Math.min(100, parsed)));
											} else {
												setTaxRate(0);
											}
										}
									}}
									className="tax-input-clean"
								/>
								<span className="summary-value-clean tax-amount">₹ {tax.toFixed(2)}</span>
							</div>
						</div>
						<div className="summary-row-clean editable-service">
							<span className="summary-label-clean">Discount Amount:</span>
							<div className="service-input-wrapper">
								<input
									type="number"
									min="0"
									step="1"
									value={discountAmount}
									onChange={(e) => setDiscountAmount(Math.max(0, parseFloat(e.target.value) || 0))}
									className="service-input-clean"
								/>
								<span className="summary-value-clean service-amount" style={{ color: '#10b981' }}>- ₹ {(discountAmount || 0).toLocaleString()}</span>
							</div>
						</div>
						<div className="summary-row-clean editable-service">
							<span className="summary-label-clean">Mobile Number:</span>
							<input
								type="tel"
								placeholder="Enter mobile"
								value={mobileNumber}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, '').slice(0, 10);
									setMobileNumber(value);
								}}
								className="service-input-clean"
								style={{ width: '140px' }}
							/>
						</div>
						<div className="summary-total-clean">
							<span className="total-label-clean">Total</span>
							<span className="total-value-clean">₹ {total.toFixed(2)}</span>
						</div>
					</div>

					{/* Checkout Button */}
					<Link
						to="/inquiry"
						onClick={onClose}
						className="cart-checkout-btn-clean"
					>
						Checkout
					</Link>
				</div>
			</div>
		</div>
	);
}



