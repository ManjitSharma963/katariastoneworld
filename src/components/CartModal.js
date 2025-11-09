import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitBilling, formatCartItemsForBilling } from '../services/billingApi';
import '../landing.css';

export default function CartModal({ isOpen, onClose }) {
	const { cart, removeFromCart, updateSqft, increaseSqft, decreaseSqft, getCartCount, clearCart } = useCart();
	const navigate = useNavigate();
	const cartCount = getCartCount();
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
	const [customerName, setCustomerName] = useState(() => {
		const saved = localStorage.getItem('cartCustomerName');
		return saved || '';
	});
	const [addressLine1, setAddressLine1] = useState(() => {
		const saved = localStorage.getItem('cartAddressLine1');
		return saved || '';
	});
	const [city, setCity] = useState(() => {
		const saved = localStorage.getItem('cartCity');
		return saved || '';
	});
	const [state, setState] = useState(() => {
		const saved = localStorage.getItem('cartState');
		return saved || '';
	});
	const [pincode, setPincode] = useState(() => {
		const saved = localStorage.getItem('cartPincode');
		return saved || '';
	});
	const [gstin, setGstin] = useState(() => {
		const saved = localStorage.getItem('cartGstin');
		return saved || '';
	});
	const [email, setEmail] = useState(() => {
		const saved = localStorage.getItem('cartEmail');
		return saved || '';
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');

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
		const taxRateToSave = taxRate === '' ? 0 : (typeof taxRate === 'number' ? taxRate : parseFloat(taxRate) || 0);
		localStorage.setItem('cartTaxRate', taxRateToSave.toString());
	}, [taxRate]);

	useEffect(() => {
		localStorage.setItem('cartDiscountAmount', discountAmount.toString());
	}, [discountAmount]);

	useEffect(() => {
		localStorage.setItem('cartMobileNumber', mobileNumber);
	}, [mobileNumber]);

	useEffect(() => {
		localStorage.setItem('cartCustomerName', customerName);
	}, [customerName]);

	useEffect(() => {
		localStorage.setItem('cartAddressLine1', addressLine1);
	}, [addressLine1]);

	useEffect(() => {
		localStorage.setItem('cartCity', city);
	}, [city]);

	useEffect(() => {
		localStorage.setItem('cartState', state);
	}, [state]);

	useEffect(() => {
		localStorage.setItem('cartPincode', pincode);
	}, [pincode]);

	useEffect(() => {
		localStorage.setItem('cartGstin', gstin);
	}, [gstin]);

	useEffect(() => {
		localStorage.setItem('cartEmail', email);
	}, [email]);

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

	const subtotal = cart.reduce((sum, item) => {
		return sum + ((item.price || 0) * (item.sqftOrdered || 0));
	}, 0);
	const taxRateNum = taxRate === '' ? 0 : (typeof taxRate === 'number' ? taxRate : parseFloat(taxRate) || 0);
	const tax = (subtotal * taxRateNum) / 100;
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
							<span className="summary-label-clean">Tax ({taxRate === '' ? 0 : taxRate}%):</span>
							<div className="tax-input-wrapper">
								<input
									type="number"
									min="0"
									max="100"
									step="0.1"
									value={taxRate === '' ? '' : taxRate}
									onChange={(e) => {
										const val = e.target.value;
										// Allow empty string for typing
										if (val === '' || val === null || val === undefined) {
											setTaxRate('');
											return;
										}
										// Parse the value and validate range
										const parsed = parseFloat(val);
										if (!isNaN(parsed)) {
											const finalValue = Math.max(0, Math.min(100, parsed));
											setTaxRate(finalValue);
										} else {
											// If not a valid number, allow empty string for deletion
											setTaxRate('');
										}
									}}
									onBlur={(e) => {
										const val = e.target.value;
										// If empty on blur, set to 0
										if (val === '' || val === null || val === undefined) {
											setTaxRate(0);
											return;
										}
										// Remove leading zeros (e.g., 010 becomes 10, but keep 0 as 0)
										let cleaned = val.replace(/^0+/, '');
										// If all zeros were removed and result is empty, set to 0
										if (cleaned === '') {
											cleaned = '0';
										}
										const parsed = parseFloat(cleaned);
										if (!isNaN(parsed)) {
											const finalValue = Math.max(0, Math.min(100, parsed));
											setTaxRate(finalValue);
										} else {
											setTaxRate(0);
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
								placeholder="Enter mobile (10 digits)"
								value={mobileNumber}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, '').slice(0, 10);
									setMobileNumber(value);
								}}
								className="service-input-clean"
								style={{ width: '140px' }}
								maxLength={10}
							/>
						</div>
					</div>

					{/* Customer Information Section */}
					<div style={{ 
						background: '#f9fafb',
						padding: '16px',
						borderRadius: '12px',
						marginTop: '16px',
						border: '1px solid #e5e7eb',
						width: '100%',
						boxSizing: 'border-box'
					}}>
						<h3 style={{ 
							fontSize: '14px', 
							fontWeight: '700', 
							marginBottom: '12px',
							color: 'var(--accent)'
						}}>
							Customer Information
						</h3>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
								<label style={{ fontWeight: '600', fontSize: '13px' }}>Name: *</label>
								<input
									type="text"
									placeholder="Enter name"
									value={customerName}
									onChange={(e) => setCustomerName(e.target.value.slice(0, 100))}
									style={{
										width: '100%',
										padding: '6px 10px',
										border: '1px solid #ddd',
										borderRadius: '6px',
										fontSize: '13px',
										boxSizing: 'border-box'
									}}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
								<label style={{ fontWeight: '600', fontSize: '13px' }}>Email:</label>
								<input
									type="email"
									placeholder="Enter email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									style={{
										width: '100%',
										padding: '6px 10px',
										border: '1px solid #ddd',
										borderRadius: '6px',
										fontSize: '13px',
										boxSizing: 'border-box'
									}}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
								<label style={{ fontWeight: '600', fontSize: '13px' }}>Address: *</label>
								<input
									type="text"
									placeholder="Enter address line 1"
									value={addressLine1}
									onChange={(e) => setAddressLine1(e.target.value)}
									style={{
										width: '100%',
										padding: '6px 10px',
										border: '1px solid #ddd',
										borderRadius: '6px',
										fontSize: '13px',
										boxSizing: 'border-box'
									}}
								/>
							</div>
							<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 150px', minWidth: '120px' }}>
									<label style={{ fontWeight: '600', fontSize: '13px' }}>City: *</label>
									<input
										type="text"
										placeholder="City"
										value={city}
										onChange={(e) => setCity(e.target.value)}
										style={{
											width: '100%',
											padding: '6px 10px',
											border: '1px solid #ddd',
											borderRadius: '6px',
											fontSize: '13px',
											boxSizing: 'border-box'
										}}
									/>
								</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 150px', minWidth: '120px' }}>
									<label style={{ fontWeight: '600', fontSize: '13px' }}>State: *</label>
									<input
										type="text"
										placeholder="State"
										value={state}
										onChange={(e) => setState(e.target.value)}
										style={{
											width: '100%',
											padding: '6px 10px',
											border: '1px solid #ddd',
											borderRadius: '6px',
											fontSize: '13px',
											boxSizing: 'border-box'
										}}
									/>
								</div>
							</div>
							<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 150px', minWidth: '120px' }}>
									<label style={{ fontWeight: '600', fontSize: '13px' }}>Pincode: *</label>
									<input
										type="text"
										placeholder="Pincode"
										value={pincode}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, '').slice(0, 6);
											setPincode(value);
										}}
										style={{
											width: '100%',
											padding: '6px 10px',
											border: '1px solid #ddd',
											borderRadius: '6px',
											fontSize: '13px',
											boxSizing: 'border-box'
										}}
									/>
								</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 150px', minWidth: '120px' }}>
									<label style={{ fontWeight: '600', fontSize: '13px' }}>GSTIN:</label>
									<input
										type="text"
										placeholder="GSTIN (optional)"
										value={gstin}
										onChange={(e) => setGstin(e.target.value.slice(0, 20))}
										style={{
											width: '100%',
											padding: '6px 10px',
											border: '1px solid #ddd',
											borderRadius: '6px',
											fontSize: '13px',
											boxSizing: 'border-box'
										}}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="summary-total-clean" style={{ marginTop: '16px' }}>
						<span className="total-label-clean">Total</span>
						<span className="total-value-clean">₹ {total.toFixed(2)}</span>
					</div>

					{/* Checkout Button */}
					<button
						onClick={async () => {
							// Validate required fields
							if (!customerName || customerName.trim() === '') {
								setSubmitError('Please enter customer name');
								return;
							}
							if (!mobileNumber || mobileNumber.length !== 10) {
								setSubmitError('Please enter a valid mobile number (exactly 10 digits)');
								return;
							}
							if (!addressLine1 || addressLine1.trim() === '') {
								setSubmitError('Please enter address line 1');
								return;
							}
							if (!city || city.trim() === '') {
								setSubmitError('Please enter city');
								return;
							}
							if (!state || state.trim() === '') {
								setSubmitError('Please enter state');
								return;
							}
							if (!pincode || pincode.length !== 6) {
								setSubmitError('Please enter a valid 6-digit pincode');
								return;
							}

							setIsSubmitting(true);
							setSubmitError('');

							try {
								const subtotal = cart.reduce((sum, item) => {
									return sum + ((item.price || 0) * (item.sqftOrdered || 0));
								}, 0);
								const taxRateNum = taxRate === '' ? 0 : (typeof taxRate === 'number' ? taxRate : parseFloat(taxRate) || 0);
								const tax = (subtotal * taxRateNum) / 100;
								const total = Math.max(0, subtotal + tax - (discountAmount || 0));

								// Format address
								const address = `${addressLine1}, ${city}, ${state} - ${pincode}`;

								const billingData = {
									customerName: customerName.trim(),
									customerMobileNumber: mobileNumber,
									customerEmail: email.trim() || null,
									address: address,
									gstin: gstin.trim() || null,
									items: formatCartItemsForBilling(cart),
									taxPercentage: taxRateNum,
									discountAmount: discountAmount || 0,
									totalAmount: total
								};

								// Submit to billing API
								await submitBilling(billingData);

								// Success - clear all inputs and cart
								setCustomerName('');
								setMobileNumber('');
								setEmail('');
								setAddressLine1('');
								setCity('');
								setState('');
								setPincode('');
								setGstin('');
								setTaxRate(5);
								setDiscountAmount(0);
								clearCart();
								onClose();
								alert('Order submitted successfully!');
								navigate('/');
							} catch (error) {
								console.error('Billing API error:', error);
								setSubmitError('Failed to submit order. Please try again.');
								setIsSubmitting(false);
							}
						}}
						className="cart-checkout-btn-clean"
						disabled={isSubmitting || cart.length === 0}
						style={{ opacity: isSubmitting ? 0.6 : 1 }}
					>
						{isSubmitting ? (
							<>
								<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
								Submitting...
							</>
						) : (
							'Checkout'
						)}
					</button>
					{submitError && (
						<div style={{
							marginTop: '12px',
							padding: '12px',
							background: '#fee2e2',
							border: '1px solid #fca5a5',
							borderRadius: '8px',
							color: '#dc2626',
							fontSize: '14px',
							display: 'flex',
							alignItems: 'center',
							gap: '8px'
						}}>
							<i className="fa-solid fa-circle-exclamation" />
							<span>{submitError}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}



