import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import SEO from './SEO';
import './InquiryForm.css';
import { submitBilling, formatCartItemsForBilling } from '../services/billingApi';

export default function InquiryForm() {
	const location = useLocation();
	const navigate = useNavigate();
	const isFromCart = location.state?.fromCart || false;
	const cartData = location.state || {};
	
	const [form, setForm] = useState({ 
		name: '', 
		phone: cartData.customerMobileNumber || '', 
		email: '', 
		message: '' 
	});
	const [status, setStatus] = useState('idle');
	const [errors, setErrors] = useState({});

	const update = (key, value) => {
		setForm({ ...form, [key]: value });
		// Clear error when user starts typing
		if (errors[key]) {
			setErrors({ ...errors, [key]: '' });
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!form.name.trim()) {
			newErrors.name = 'Full name is required';
		}
		if (!form.phone.trim()) {
			newErrors.phone = 'Phone number is required';
		} else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(form.phone.replace(/\s/g, ''))) {
			newErrors.phone = 'Please enter a valid phone number';
		}
		if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = 'Please enter a valid email address';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		
		if (!validateForm()) {
			setStatus('error');
			return;
		}

		try {
			setStatus('loading');
			
			// If coming from cart, submit billing data to API
			if (isFromCart && cartData.cart && cartData.cart.length > 0) {
				try {
					const billingData = {
						customerMobileNumber: form.phone || cartData.customerMobileNumber || '',
						items: formatCartItemsForBilling(cartData.cart),
						taxPercentage: cartData.taxPercentage || 0,
						discountAmount: cartData.discountAmount || 0,
						totalAmount: cartData.totalAmount || 0
					};

					// Submit to billing API
					await submitBilling(billingData);
					
					// Show success and redirect after 2 seconds
					setStatus('success');
					setTimeout(() => {
						navigate('/');
					}, 2000);
					return;
				} catch (apiError) {
					console.error('Billing API error:', apiError);
					setStatus('error');
					setErrors({ submit: 'Failed to submit billing. Please try again.' });
					return;
				}
			}
			
			// Regular inquiry form - send via WhatsApp
			// Format message for WhatsApp
			const whatsappMessage = `*New Quotation Request*\n\n` +
				`*Name:* ${form.name}\n` +
				`*Phone:* ${form.phone}\n` +
				(form.email ? `*Email:* ${form.email}\n` : '') +
				(form.message ? `*Message:*\n${form.message}\n` : '') +
				`\nPlease contact me regarding this quotation request.`;

			// Encode message for WhatsApp URL
			const encodedMessage = encodeURIComponent(whatsappMessage);
			const whatsappNumber = '918107707064'; // Replace with your WhatsApp business number
			const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
			// hello world
			// Open WhatsApp in new tab
			window.open(whatsappUrl, '_blank');
			
			// Wait a moment for UX
			await new Promise((r) => setTimeout(r, 500));
			
			setStatus('success');
			setForm({ name: '', phone: '', email: '', message: '' });
			setErrors({});
			
			// Reset success message after 5 seconds
			setTimeout(() => {
				setStatus('idle');
			}, 5000);
		} catch (err) {
			setStatus('error');
		}
	};

	return (
		<>
			<SEO title="Get a Quotation - Request Quote" />
			<Header />
			<div className="inquiry-page">
				<div className="inquiry-container">
					<div className="inquiry-form-wrapper">
						<div className="inquiry-header">
							<div className="inquiry-icon-wrapper">
								<i className="fa-solid fa-file-invoice-dollar" />
							</div>
							<h1 className="inquiry-title">{isFromCart ? 'Complete Your Order' : 'Get a Quotation'}</h1>
							<p className="inquiry-subtitle">
								{isFromCart 
									? 'Please provide your details to complete the billing process'
									: 'Fill out the form below and we\'ll get back to you with a personalized quote'
								}
							</p>
						</div>

						<form onSubmit={onSubmit} className="inquiry-form">
							<div className="form-group">
								<label htmlFor="name" className="form-label">
									Full Name <span className="required">*</span>
								</label>
								<div className="input-wrapper">
									<i className="fa-solid fa-user input-icon" />
									<input
										id="name"
										type="text"
										placeholder="Enter your full name"
										value={form.name}
										onChange={(e) => update('name', e.target.value)}
										className={`form-input ${errors.name ? 'error' : ''}`}
										required
									/>
								</div>
								{errors.name && <span className="error-message">{errors.name}</span>}
							</div>

							<div className="form-group">
								<label htmlFor="phone" className="form-label">
									Phone Number <span className="required">*</span>
								</label>
								<div className="input-wrapper">
									<i className="fa-solid fa-phone input-icon" />
									<input
										id="phone"
										type="tel"
										placeholder="Enter your phone number"
										value={form.phone}
										onChange={(e) => update('phone', e.target.value)}
										className={`form-input ${errors.phone ? 'error' : ''}`}
										required
									/>
								</div>
								{errors.phone && <span className="error-message">{errors.phone}</span>}
							</div>

							<div className="form-group">
								<label htmlFor="email" className="form-label">
									Email <span className="optional">(optional)</span>
								</label>
								<div className="input-wrapper">
									<i className="fa-solid fa-envelope input-icon" />
									<input
										id="email"
										type="email"
										placeholder="Enter your email address"
										value={form.email}
										onChange={(e) => update('email', e.target.value)}
										className={`form-input ${errors.email ? 'error' : ''}`}
									/>
								</div>
								{errors.email && <span className="error-message">{errors.email}</span>}
							</div>

							<div className="form-group">
								<label htmlFor="message" className="form-label">
									What do you need?
								</label>
								<div className="textarea-wrapper">
									<i className="fa-solid fa-message textarea-icon" />
									<textarea
										id="message"
										placeholder="Quantity, size, type, location, or any specific requirements..."
										value={form.message}
										onChange={(e) => update('message', e.target.value)}
										className="form-textarea"
										rows={5}
									/>
								</div>
							</div>

							{isFromCart && cartData.cart && cartData.cart.length > 0 && (
								<div style={{ 
									background: '#f9fafb', 
									padding: '20px', 
									borderRadius: '12px', 
									marginBottom: '24px',
									border: '1px solid #e5e7eb'
								}}>
									<h3 style={{ marginBottom: '16px', color: 'var(--accent)', fontSize: '18px' }}>Order Summary</h3>
									<div style={{ marginBottom: '8px' }}>
										<strong>Items:</strong> {cartData.cart.length}
									</div>
									<div style={{ marginBottom: '8px' }}>
										<strong>Tax:</strong> {cartData.taxPercentage || 0}%
									</div>
									<div style={{ marginBottom: '8px' }}>
										<strong>Discount:</strong> ₹{(cartData.discountAmount || 0).toLocaleString()}
									</div>
									<div style={{ 
										paddingTop: '12px', 
										borderTop: '2px solid #e5e7eb',
										marginTop: '8px',
										fontSize: '18px',
										fontWeight: '700'
									}}>
										<strong>Total Amount:</strong> ₹{(cartData.totalAmount || 0).toFixed(2)}
									</div>
								</div>
							)}

							<button 
								type="submit" 
								className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
								disabled={status === 'loading'}
							>
								{status === 'loading' ? (
									<>
										<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
										{isFromCart ? 'Submitting Order...' : 'Sending...'}
									</>
								) : (
									<>
										<i className={`fa-solid ${isFromCart ? 'fa-check-circle' : 'fa-paper-plane'}`} style={{ marginRight: '8px' }} />
										{isFromCart ? 'Complete Order' : 'Request Quote'}
									</>
								)}
							</button>

							{status === 'success' && (
								<div className="success-message">
									<i className="fa-solid fa-circle-check" />
									<span>
										{isFromCart 
											? 'Order submitted successfully! Redirecting to home page...'
											: 'Thanks! We\'ve opened WhatsApp. Please send the message to complete your request.'
										}
									</span>
								</div>
							)}
							{status === 'error' && (
								<div className="error-message-box">
									<i className="fa-solid fa-circle-exclamation" />
									<span>{errors.submit || 'Please check the form and try again.'}</span>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}


