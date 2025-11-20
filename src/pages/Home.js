import React, { useState, useEffect } from 'react';
import '../landing.css';
import Header from '../landing/Header';
import HeroSlider from '../landing/HeroSlider';
import CategoryGrid from '../landing/CategoryGrid';
import MaterialShowcase from '../landing/MaterialShowcase';
import LocateStore from '../landing/LocateStore';
import ContactCTA from '../landing/ContactCTA';
import Footer from '../landing/Footer';
import {
	materialImages
} from '../landing/data';
import SEO from '../components/SEO';
import { fetchHeroes } from '../services/heroApi';
import { fetchInventory } from '../services/inventoryApi';
import { fetchCategories, fetchMaterialCategories } from '../services/categoriesApi';

export default function Home() {
	const [heroSlides, setHeroSlides] = useState([]);
	const [stoneProducts, setStoneProducts] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [materialCategories, setMaterialCategories] = useState([]);

	useEffect(() => {
		const loadHeroes = async () => {
			try {
				const heroes = await fetchHeroes();
				// Map API response to expected format if needed
				// Assuming API returns array with img, title, subtitle fields
				// Or image_url, title, subtitle based on database schema
				if (Array.isArray(heroes) && heroes.length > 0) {
					// Map API response to match expected format
					const mappedHeroes = heroes.map(hero => ({
						img: hero.image_url || hero.img || hero.imageUrl,
						title: hero.title || hero.heading || '',
						subtitle: hero.subtitle || hero.description || ''
					}));
					setHeroSlides(mappedHeroes);
				} else {
					// If API returns empty array, set empty array
					setHeroSlides([]);
				}
			} catch (error) {
				console.error('Failed to load heroes from API:', error);
				// Keep empty array on error - no fallback to hardcoded data
				setHeroSlides([]);
			}
		};

		loadHeroes();
	}, []);

	useEffect(() => {
		const loadStoneProducts = async () => {
			try {
				const inventory = await fetchInventory();
				if (Array.isArray(inventory)) {
					// Map API response to match expected format for CategoryGrid
					// API returns: productType, pricePerUnit, quantity, unit, primaryImageUrl
					const mappedProducts = inventory.map(product => ({
						title: product.name || product.title || '',
						img: product.primaryImageUrl || product.primary_image_url || product.img || product.image_url || '',
						sqftPerUnit: product.sqftPerUnit || product.sqft_per_unit || 30,
						price: product.pricePerUnit || product.pricePerSqft || product.price_per_sqft || 0,
						totalSqft: product.quantity || product.totalSqftStock || product.total_sqft_stock || 0,
						productType: product.productType || product.product_type || '',
						color: product.color || '',
						unit: product.unit || 'sqft'
					}));
					setStoneProducts(mappedProducts);
				}
			} catch (error) {
				console.error('Failed to load stone products from API:', error);
				// Keep empty array on error
			}
		};

		loadStoneProducts();
	}, []);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				// Fetch all categories from base endpoint for "Find Tiles by Category"
				const categories = await fetchCategories();
				if (Array.isArray(categories) && categories.length > 0) {
					const mappedCategories = categories.map(cat => ({
						title: cat.name || cat.title || '',
						img: cat.imageUrl || cat.image_url || cat.img || cat.primaryImageUrl || ''
					}));
					setAllCategories(mappedCategories);
				}
			} catch (error) {
				console.error('Failed to load categories from API:', error);
				// Keep empty array on error
				setAllCategories([]);
			}

			try {
				// Fetch material categories for "Explore Our Collections"
				const materials = await fetchMaterialCategories();
				if (Array.isArray(materials) && materials.length > 0) {
					const mappedMaterials = materials.map(cat => ({
						title: cat.name || cat.title || '',
						img: cat.imageUrl || cat.image_url || cat.img || cat.primaryImageUrl || ''
					}));
					setMaterialCategories(mappedMaterials);
				}
			} catch (error) {
				console.error('Failed to load material categories from API:', error);
				// Keep empty array on error
				setMaterialCategories([]);
			}
		};

		loadCategories();
	}, []);

	return (
		<>
			<SEO title="Premium Tiles & Stones in Gurgaon" keywords="tiles in Gurgaon, marble Gurgaon, granite Gurgaon, floor tiles, wall tiles, Kataria Stone World" />
			<Header />
			<HeroSlider slides={heroSlides} />
			<CategoryGrid
				title="Find Tiles by Category"
				subtitle="Kataria offers premium wall and floor tiles, combining advanced technology with elegant designs for lasting quality and easy maintenance."
				items={allCategories}
			/>
			{/* <CategoryGrid
				title="Explore Our Collections"
				subtitle="Discover a wide range of premium tiles, elegant marbles, and durable granites — crafted to elevate every corner of your home and workspace."
				items={materialCategories}
			/> */}
			<MaterialShowcase images={materialImages} />
			<CategoryGrid
				title="Premium Stone Collection"
				subtitle="Explore our handpicked selection of premium stones and tiles, each piece carefully selected for its quality and beauty."
				items={stoneProducts.slice(0, 4)}
				showInfo
				enableCart
				showSeeMore
				limitRows
			/>
			<CategoryGrid
				title="Explore Our Complete Collection"
				subtitle="Discover our full range of premium stones and tiles — expertly crafted to bring elegance, durability, and sophistication to your home, kitchen, or office spaces."
				items={stoneProducts.slice(4, 8)}
				showInfo
				enableCart
				showSeeMore
				limitRows
			/>
			<LocateStore />
			<ContactCTA />
			<Footer />
		</>
	);
}


