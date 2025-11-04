import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const saved = localStorage.getItem('cart');
		if (saved) {
			try {
				setCart(JSON.parse(saved));
			} catch (e) {
				console.error('Failed to load cart from localStorage', e);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (item) => {
		setCart((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			if (existing) {
				return prev.map((i) =>
					i.id === item.id ? { ...i, sqftOrdered: (i.sqftOrdered || 1) + 1 } : i
				);
			}
			return [...prev, { ...item, sqftOrdered: 1 }];
		});
	};

	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((i) => i.id !== id));
	};

	const updateSqft = (id, sqft) => {
		if (sqft <= 0) {
			removeFromCart(id);
			return;
		}
		setCart((prev) =>
			prev.map((i) => (i.id === id ? { ...i, sqftOrdered: sqft } : i))
		);
	};

	const increaseSqft = (id) => {
		setCart((prev) =>
			prev.map((i) => 
				i.id === id ? { ...i, sqftOrdered: (i.sqftOrdered || 1) + 1 } : i
			)
		);
	};

	const decreaseSqft = (id) => {
		setCart((prev) =>
			prev.map((i) => {
				if (i.id === id) {
					const newSqft = Math.max(0, (i.sqftOrdered || 1) - 1);
					if (newSqft <= 0) {
						return null; // Will be filtered out
					}
					return { ...i, sqftOrdered: newSqft };
				}
				return i;
			}).filter(Boolean)
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	const getCartCount = () => {
		return cart.length;
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateSqft,
				increaseSqft,
				decreaseSqft,
				clearCart,
				getCartCount
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within CartProvider');
	}
	return context;
}

