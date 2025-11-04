import React, { useState } from 'react';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import SEO from './SEO';
import './InquiryForm.css';

export default function InquiryForm() {
	const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
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
							<h1 className="inquiry-title">Get a Quotation</h1>
							<p className="inquiry-subtitle">
								Fill out the form below and we'll get back to you with a personalized quote
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

							<button 
								type="submit" 
								className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
								disabled={status === 'loading'}
							>
								{status === 'loading' ? (
									<>
										<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
										Sending...
									</>
								) : (
									<>
										<i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }} />
										Request Quote
									</>
								)}
							</button>

							{status === 'success' && (
								<div className="success-message">
									<i className="fa-solid fa-circle-check" />
									<span>Thanks! We've opened WhatsApp. Please send the message to complete your request.</span>
								</div>
							)}
							{status === 'error' && (
								<div className="error-message-box">
									<i className="fa-solid fa-circle-exclamation" />
									<span>Please check the form and try again.</span>
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


