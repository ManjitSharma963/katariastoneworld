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
									<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
										<span style={{ fontWeight: '600' }}>Sub Total:</span>
										<span style={{ fontWeight: '700' }}>₹ {subtotal.toLocaleString()}</span>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
										<span style={{ fontWeight: '600' }}>Tax (%):</span>
										<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
														// ParseFloat automatically handles leading zeros (010 becomes 10)
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
												style={{
													width: '70px',
													padding: '6px 10px',
													border: '1px solid #ddd',
													borderRadius: '6px',
													textAlign: 'center',
													fontSize: '14px',
													fontWeight: '600'
												}}
											/>
											<span style={{ fontWeight: '700', minWidth: '80px', textAlign: 'right' }}>₹ {tax.toFixed(2)}</span>
										</div>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
										<span style={{ fontWeight: '600' }}>Discount Amount:</span>
										<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
											<input
												type="number"
												min="0"
												step="1"
												value={discountAmount}
												onChange={(e) => setDiscountAmount(Math.max(0, parseFloat(e.target.value) || 0))}
												style={{
													width: '100px',
													padding: '6px 10px',
													border: '1px solid #ddd',
													borderRadius: '6px',
													textAlign: 'center',
													fontSize: '14px',
													fontWeight: '600'
												}}
											/>
											<span style={{ fontWeight: '700', minWidth: '80px', textAlign: 'right', color: '#10b981' }}>- ₹ {(discountAmount || 0).toLocaleString()}</span>
										</div>
									</div>
									<div style={{ 
										paddingTop: '16px', 
										borderTop: '1px solid #e5e7eb', 
										marginTop: '12px' 
									}}>
										<h3 style={{ 
											fontSize: '16px', 
											fontWeight: '700', 
											marginBottom: '16px',
											color: 'var(--accent)'
										}}>
											Customer Information
										</h3>
										<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
											<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
												<label style={{ fontWeight: '600', fontSize: '14px' }}>Name: *</label>
												<input
													type="text"
													placeholder="Enter customer name"
													value={customerName}
													onChange={(e) => setCustomerName(e.target.value.slice(0, 100))}
													style={{
														width: '100%',
														padding: '8px 12px',
														border: '1px solid #ddd',
														borderRadius: '6px',
														fontSize: '14px',
														boxSizing: 'border-box'
													}}
												/>
											</div>
											<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
												<label style={{ fontWeight: '600', fontSize: '14px' }}>Mobile Number: *</label>
												<input
													type="tel"
													placeholder="Enter mobile number"
													value={mobileNumber}
													onChange={(e) => {
														const value = e.target.value.replace(/\D/g, '').slice(0, 15);
														setMobileNumber(value);
													}}
													style={{
														width: '100%',
														padding: '8px 12px',
														border: '1px solid #ddd',
														borderRadius: '6px',
														fontSize: '14px',
														boxSizing: 'border-box'
													}}
												/>
											</div>
											<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
												<label style={{ fontWeight: '600', fontSize: '14px' }}>Email:</label>
												<input
													type="email"
													placeholder="Enter email address"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													style={{
														width: '100%',
														padding: '8px 12px',
														border: '1px solid #ddd',
														borderRadius: '6px',
														fontSize: '14px',
														boxSizing: 'border-box'
													}}
												/>
											</div>
											<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
												<label style={{ fontWeight: '600', fontSize: '14px' }}>Address Line 1: *</label>
												<input
													type="text"
													placeholder="Enter address line 1"
													value={addressLine1}
													onChange={(e) => setAddressLine1(e.target.value)}
													style={{
														width: '100%',
														padding: '8px 12px',
														border: '1px solid #ddd',
														borderRadius: '6px',
														fontSize: '14px',
														boxSizing: 'border-box'
													}}
												/>
											</div>
											<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
												<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px', minWidth: '150px' }}>
													<label style={{ fontWeight: '600', fontSize: '14px' }}>City: *</label>
													<input
														type="text"
														placeholder="Enter city"
														value={city}
														onChange={(e) => setCity(e.target.value)}
														style={{
															width: '100%',
															padding: '8px 12px',
															border: '1px solid #ddd',
															borderRadius: '6px',
															fontSize: '14px',
															boxSizing: 'border-box'
														}}
													/>
												</div>
												<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px', minWidth: '150px' }}>
													<label style={{ fontWeight: '600', fontSize: '14px' }}>State: *</label>
													<input
														type="text"
														placeholder="Enter state"
														value={state}
														onChange={(e) => setState(e.target.value)}
														style={{
															width: '100%',
															padding: '8px 12px',
															border: '1px solid #ddd',
															borderRadius: '6px',
															fontSize: '14px',
															boxSizing: 'border-box'
														}}
													/>
												</div>
											</div>
											<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
												<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px', minWidth: '150px' }}>
													<label style={{ fontWeight: '600', fontSize: '14px' }}>Pincode: *</label>
													<input
														type="text"
														placeholder="Enter pincode"
														value={pincode}
														onChange={(e) => {
															const value = e.target.value.replace(/\D/g, '').slice(0, 6);
															setPincode(value);
														}}
														style={{
															width: '100%',
															padding: '8px 12px',
															border: '1px solid #ddd',
															borderRadius: '6px',
															fontSize: '14px',
															boxSizing: 'border-box'
														}}
													/>
												</div>
												<div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px', minWidth: '150px' }}>
													<label style={{ fontWeight: '600', fontSize: '14px' }}>GSTIN:</label>
													<input
														type="text"
														placeholder="Enter GSTIN (optional)"
														value={gstin}
														onChange={(e) => setGstin(e.target.value.slice(0, 20))}
														style={{
															width: '100%',
															padding: '8px 12px',
															border: '1px solid #ddd',
															borderRadius: '6px',
															fontSize: '14px',
															boxSizing: 'border-box'
														}}
													/>
												</div>
											</div>
										</div>
									</div>
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
							onClick={async () => {
								// Validate required fields
								if (!customerName || customerName.trim() === '') {
									setSubmitError('Please enter customer name');
									return;
								}
								if (!mobileNumber || mobileNumber.length < 10) {
									setSubmitError('Please enter a valid mobile number (minimum 10 digits)');
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

								setSubmitError('');

								// Calculate billing data
								const subtotal = cart.reduce((sum, item) => {
									return sum + ((item.price || 0) * (item.sqftOrdered || 0));
								}, 0);
								const tax = (subtotal * taxRate) / 100;
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
									taxPercentage: taxRate,
									discountAmount: discountAmount || 0,
									totalAmount: total
								};

								// Check for access token
								const accessToken = getAccessToken();
								
								if (!accessToken) {
									// No token - show login modal and save billing data
									setPendingBillingData(billingData);
									setShowLoginModal(true);
									return;
								}

								// Token exists - proceed with billing
								setIsSubmitting(true);

								try {
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
									alert('Order submitted successfully!');
									navigate('/');
								} catch (error) {
									console.error('Billing API error:', error);
									// Check if error is due to invalid token
									if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('token'))) {
										// Token invalid - remove it and show login
										localStorage.removeItem('access_token');
										setPendingBillingData(billingData);
										setShowLoginModal(true);
										setSubmitError('Session expired. Please login again.');
									} else {
										setSubmitError('Failed to submit order. Please try again.');
									}
									setIsSubmitting(false);
								}
							}}
							className="cta"
							style={{ cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1 }}
							disabled={isSubmitting || cart.length === 0}
						>
							{isSubmitting ? (
								<>
									<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
									Submitting...
								</>
							) : (
								<>
							Proceed to Checkout <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px', fontSize: '12px' }} />
								</>
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

