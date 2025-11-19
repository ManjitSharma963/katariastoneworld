import React, { useState } from 'react';
import { login } from '../services/authApi';
import '../landing.css';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		if (!email.trim() || !password.trim()) {
			setError('Please enter both email and password');
			setIsLoading(false);
			return;
		}

		try {
			const response = await login(email.trim(), password);
			
			// Check if response has access_token
			if (response.access_token || response.token || response.accessToken) {
				const token = response.access_token || response.token || response.accessToken;
				// Store token
				localStorage.setItem('access_token', token);
				
				// Clear form
				setEmail('');
				setPassword('');
				
				// Call success callback
				if (onSuccess) {
					onSuccess(token);
				}
				
				// Close modal
				onClose();
			} else {
				setError('Invalid response from server. Please try again.');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError(err.message || 'Invalid email or password. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div 
			className="cart-modal-overlay" 
			onClick={handleOverlayClick}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 10000
			}}
		>
			<div 
				className="cart-modal" 
				onClick={(e) => e.stopPropagation()}
				style={{
					background: '#fff',
					borderRadius: '12px',
					padding: '32px',
					maxWidth: '400px',
					width: '90%',
					maxHeight: '90vh',
					overflow: 'auto'
				}}
			>
				<div style={{ marginBottom: '24px' }}>
					<h2 style={{ 
						fontSize: '24px', 
						fontWeight: '700', 
						color: 'var(--accent)',
						marginBottom: '8px'
					}}>
						Login Required
					</h2>
					<p style={{ color: '#666', fontSize: '14px' }}>
						Please login to proceed with billing
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ 
							display: 'block', 
							fontWeight: '600', 
							fontSize: '14px',
							marginBottom: '8px',
							color: '#333'
						}}>
							Email: *
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email address"
							required
							style={{
								width: '100%',
								padding: '10px 12px',
								border: '1px solid #ddd',
								borderRadius: '6px',
								fontSize: '14px',
								boxSizing: 'border-box'
							}}
							disabled={isLoading}
						/>
					</div>

					<div style={{ marginBottom: '20px' }}>
						<label style={{ 
							display: 'block', 
							fontWeight: '600', 
							fontSize: '14px',
							marginBottom: '8px',
							color: '#333'
						}}>
							Password: *
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter password"
							required
							style={{
								width: '100%',
								padding: '10px 12px',
								border: '1px solid #ddd',
								borderRadius: '6px',
								fontSize: '14px',
								boxSizing: 'border-box'
							}}
							disabled={isLoading}
						/>
					</div>

					{error && (
						<div style={{
							marginBottom: '16px',
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
							<span>{error}</span>
						</div>
					)}

					<div style={{ display: 'flex', gap: '12px' }}>
						<button
							type="button"
							onClick={onClose}
							disabled={isLoading}
							style={{
								flex: 1,
								padding: '12px',
								background: 'transparent',
								border: '1px solid #ddd',
								borderRadius: '8px',
								cursor: isLoading ? 'not-allowed' : 'pointer',
								fontWeight: '600',
								color: '#666',
								opacity: isLoading ? 0.6 : 1
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="cta"
							style={{
								flex: 1,
								padding: '12px',
								cursor: isLoading ? 'not-allowed' : 'pointer',
								opacity: isLoading ? 0.6 : 1
							}}
						>
							{isLoading ? (
								<>
									<i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
									Logging in...
								</>
							) : (
								'Login'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

