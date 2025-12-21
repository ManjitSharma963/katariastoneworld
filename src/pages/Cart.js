import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import SEO from '../components/SEO';
import { submitBilling, formatCartItemsForBilling } from '../services/billingApi';
import { getAccessToken } from '../services/authApi';
import LoginModal from '../components/LoginModal';

export default function Cart() {
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
		localStorage.setItem('cartTaxRate', taxRate.toString());
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

	if (cartCount === 0) {
		return (
			<>
				<SEO title="Shopping Cart" />
				<Header />
				<div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh' }}>
					<i className="fa-solid fa-cart-shopping" style={{ fontSize: '64px', color: 'var(--muted)', marginBottom: '20px' }} />
					<h2 style={{ fontFamily: '"Playfair Display", serif', color: 'var(--accent)', marginBottom: '12px' }}>
						Your cart is empty
					</h2>
					<p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
						Start adding items to your cart to see them here.
					</p>
					<button 
						onClick={() => navigate('/')} 
						className="cta" 
						style={{ display: 'inline-block', cursor: 'pointer' }}
					>
						Continue Shopping <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px', fontSize: '12px' }} />
					</button>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<SEO title="Shopping Cart" />
			<Header />
			<div style={{ padding: '100px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
				<h1 style={{ fontFamily: '"Playfair Display", serif', color: 'var(--accent)', marginBottom: '32px' }}>
					Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
				</h1>
				<div style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
					{cart.map((item) => (
						<div
							key={item.id}
							style={{
								display: 'flex',
								gap: '20px',
								padding: '20px',
								background: '#fff',
								borderRadius: '12px',
								boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
							}}
						>
							<img
								src={item.img}
								alt={item.title}
								style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
							/>
							<div style={{ flex: 1 }}>
								<h3 style={{ color: 'var(--accent)', marginBottom: '8px' }}>{item.title}</h3>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
									{item.price > 0 && (
										<p style={{ color: 'var(--muted)', fontSize: '14px' }}>
											₹ {item.price.toLocaleString()} per unit
										</p>
									)}
									{item.totalSqft && (
										<p style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
											<i className="fa-solid fa-warehouse" style={{ marginRight: '6px', fontSize: '12px' }} />
											{item.totalSqft} sq ft in stock
										</p>
									)}
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
										<label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted)' }}>
											Square Feet:
										</label>
										<button
											onClick={() => decreaseSqft(item.id)}
											disabled={(item.sqftOrdered || 1) <= 1}
											style={{
												width: '32px',
												height: '32px',
												border: '1px solid #ddd',
												background: '#fff',
												borderRadius: '6px',
												cursor: (item.sqftOrdered || 1) <= 1 ? 'not-allowed' : 'pointer',
												opacity: (item.sqftOrdered || 1) <= 1 ? 0.5 : 1,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<i className="fa-solid fa-minus" style={{ fontSize: '12px' }} />
										</button>
										<input
											type="number"
											min="1"
											max={item.totalSqft || 999999}
											value={item.sqftOrdered || 1}
											onChange={(e) => {
												const val = parseInt(e.target.value) || 1;
												const maxSqft = item.totalSqft || 999999;
												updateSqft(item.id, Math.min(val, maxSqft));
											}}
											style={{
												width: '80px',
												padding: '8px',
												border: '1px solid #ddd',
												borderRadius: '6px',
												textAlign: 'center',
												fontSize: '14px',
												fontWeight: '600'
											}}
										/>
										<button
											onClick={() => {
												const maxSqft = item.totalSqft || 999999;
												if ((item.sqftOrdered || 1) < maxSqft) {
													increaseSqft(item.id);
												}
											}}
											disabled={(item.sqftOrdered || 1) >= (item.totalSqft || 999999)}
											style={{
												width: '32px',
												height: '32px',
												border: '1px solid #ddd',
												background: '#fff',
												borderRadius: '6px',
												cursor: (item.sqftOrdered || 1) >= (item.totalSqft || 999999) ? 'not-allowed' : 'pointer',
												opacity: (item.sqftOrdered || 1) >= (item.totalSqft || 999999) ? 0.5 : 1,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<i className="fa-solid fa-plus" style={{ fontSize: '12px' }} />
										</button>
									</div>
									<button
										onClick={() => removeFromCart(item.id)}
										style={{
											background: 'transparent',
											border: '1px solid #dc2626',
											color: '#dc2626',
											padding: '6px 12px',
											borderRadius: '6px',
											cursor: 'pointer',
											fontSize: '14px',
											fontWeight: '600',
											display: 'flex',
											alignItems: 'center',
											gap: '6px'
										}}
									>
										<i className="fa-solid fa-trash" />
										<span>Delete</span>
									</button>
								</div>
							</div>
							{item.price > 0 && (
								<div style={{ textAlign: 'right' }}>
									<p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)' }}>
										₹ {((item.price || 0) * (item.sqftOrdered || 0)).toLocaleString()}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '24px', borderTop: '2px solid #eee' }}>
					{(() => {
						const totalSqft = cart.reduce((sum, item) => {
							return sum + (item.sqftOrdered || 0);
						}, 0);
						const subtotal = cart.reduce((sum, item) => {
							return sum + ((item.price || 0) * (item.sqftOrdered || 0));
						}, 0);
						const tax = (subtotal * taxRate) / 100;
						const total = Math.max(0, subtotal + tax - (discountAmount || 0));

						return (
							<>
								<div style={{
									background: '#f9fafb',
									padding: '20px',
									borderRadius: '12px',
									border: '1px solid #e5e7eb'
								}}>
									<div style={{ 
										display: 'flex', 
										justifyContent: 'space-between', 
										paddingTop: '16px',
										borderTop: '2px solid #e5e7eb',
										marginTop: '8px'
									}}>
										<span style={{ fontWeight: '700', fontSize: '18px' }}>Total:</span>
										<span style={{ fontWeight: '700', fontSize: '24px', color: 'var(--accent)' }}>₹ {total.toFixed(2)}</span>
									</div>
								</div>
								{totalSqft > 0 && (
							<div style={{
								background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
								color: 'white',
								padding: '16px 24px',
								borderRadius: '12px',
								textAlign: 'center'
							}}>
								<p style={{ fontSize: '14px', marginBottom: '4px', opacity: 0.9 }}>Total Square Feet</p>
								<h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: '700', margin: 0 }}>
									{totalSqft.toLocaleString()} sq ft
								</h2>
							</div>
								)}
							</>
						);
					})()}
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<button
							onClick={clearCart}
							style={{
								background: 'transparent',
								border: '1px solid var(--muted)',
								color: 'var(--muted)',
								padding: '10px 20px',
								borderRadius: '8px',
								cursor: 'pointer',
								fontWeight: '600'
							}}
						>
							Clear Cart
						</button>
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
							className="cta"
							style={{ cursor: 'pointer' }}
							disabled={cart.length === 0}
						>
							Submit for Enquiry <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px', fontSize: '12px' }} />
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
			<Footer />
			<LoginModal
				isOpen={showLoginModal}
				onClose={() => {
					setShowLoginModal(false);
					setPendingBillingData(null);
				}}
				onSuccess={async (token) => {
					// After successful login, proceed with billing
					if (pendingBillingData) {
						setIsSubmitting(true);
						setSubmitError('');
						try {
							await submitBilling(pendingBillingData);
							
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
							alert('Order submitted successfully!');
							navigate('/');
						} catch (error) {
							console.error('Billing API error:', error);
							setSubmitError('Failed to submit order. Please try again.');
							setIsSubmitting(false);
						}
					}
				}}
			/>
		</>
	);
}

