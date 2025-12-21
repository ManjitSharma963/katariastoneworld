import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitBilling, formatCartItemsForBilling } from '../services/billingApi';
import LoginModal from './LoginModal';
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
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [pendingBillingData, setPendingBillingData] = useState(null);

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

					<div className="summary-total-clean" style={{ marginTop: '16px' }}>
						<span className="total-label-clean">Total</span>
						<span className="total-value-clean">₹ {total.toFixed(2)}</span>
					</div>

					{/* Submit for Enquiry Button */}
					<button
						onClick={() => {
							// Calculate totals
							const subtotal = cart.reduce((sum, item) => {
								return sum + ((item.price || 0) * (item.sqftOrdered || 0));
							}, 0);
							const totalSqft = cart.reduce((sum, item) => {
								return sum + (item.sqftOrdered || 0);
							}, 0);

							// Format WhatsApp message
							let message = '📦 PRODUCT SUMMARY\n\n';
							
							cart.forEach((item) => {
								const sqft = item.sqftOrdered || 0;
								const itemTotal = (item.price || 0) * sqft;
								message += `${item.title} - ${sqft.toLocaleString()} sq ft - ₹${itemTotal.toLocaleString()}\n`;
							});

							message += `\nTOTAL - ${totalSqft.toLocaleString()} sq ft - ₹${subtotal.toLocaleString()}`;

							// Encode message for URL
							const encodedMessage = encodeURIComponent(message);
							const whatsappNumber = '919996965755';
							const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

							// Navigate to WhatsApp directly
							window.location.href = whatsappUrl;
						}}
						className="cart-checkout-btn-clean"
						disabled={cart.length === 0}
					>
						Submit for Enquiry
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
			<LoginModal
				isOpen={showLoginModal}
				onClose={() => {
					setShowLoginModal(false);
					setPendingBillingData(null);
				}}
				onSuccess={async (token) => {
					// After successful login, proceed with billing submission
					if (pendingBillingData) {
						setIsSubmitting(true);
						setSubmitError('');
						setShowLoginModal(false);
						
						try {
							console.log('Submitting billing data...', pendingBillingData);
							
							// Add timeout to prevent infinite loading
							const timeoutPromise = new Promise((_, reject) => 
								setTimeout(() => reject(new Error('Request timeout: Server took too long to respond')), 30000)
							);
							
							// Submit to billing API with timeout
							const billingPromise = submitBilling(pendingBillingData);
							await Promise.race([billingPromise, timeoutPromise]);

							console.log('Billing submitted successfully');
							
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
							setPendingBillingData(null);
							onClose();
							alert('Order submitted successfully!');
							// Stay on current page - don't navigate to home
						} catch (error) {
							console.error('Billing API error:', error);
							setIsSubmitting(false);
							
							// Check if error is due to invalid token
							if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('token'))) {
								// Token invalid - remove it and show login again
								localStorage.removeItem('access_token');
								setShowLoginModal(true);
								setSubmitError('Session expired. Please login again.');
							} else if (error.message && error.message.includes('timeout')) {
								setSubmitError('Request timeout: Server took too long to respond. Please check your connection and try again.');
							} else if (error.message && error.message.includes('Failed to fetch')) {
								setSubmitError('Network error: Unable to connect to server. Please check your internet connection.');
							} else {
								setSubmitError(error.message || 'Failed to submit order. Please try again.');
							}
						}
					}
				}}
			/>
		</div>
	);
}



