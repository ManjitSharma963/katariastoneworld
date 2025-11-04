import React from 'react';
import '../landing.css';
import Header from '../landing/Header';
import HeroSlider from '../landing/HeroSlider';
import CategoryGrid from '../landing/CategoryGrid';
import MaterialShowcase from '../landing/MaterialShowcase';
import LocateStore from '../landing/LocateStore';
import ContactCTA from '../landing/ContactCTA';
import Footer from '../landing/Footer';
import {
	heroSlides,
	categoriesRooms,
	categoriesTypes,
	materialImages,
	countertopImages,
	stoneProducts
} from '../landing/data';
import SEO from '../components/SEO';

export default function Home() {
	return (
		<>
			<SEO title="Premium Tiles & Stones in Gurgaon" keywords="tiles in Gurgaon, marble Gurgaon, granite Gurgaon, floor tiles, wall tiles, Kataria Stone World" />
			<Header />
			<HeroSlider slides={heroSlides} />
			<CategoryGrid
				title="Find Tiles by Category"
				subtitle="Kataria offers premium wall and floor tiles, combining advanced technology with elegant designs for lasting quality and easy maintenance."
				items={categoriesRooms}
			/>
			<CategoryGrid
				title="Explore Our Collections"
				subtitle="Discover a wide range of premium tiles, elegant marbles, and durable granites — crafted to elevate every corner of your home and workspace."
				items={categoriesTypes}
			/>
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
				title="Explore Our Countertop Collection"
				subtitle="Discover a stunning range of premium countertops — expertly crafted to bring elegance, durability, and sophistication to your home, kitchen, or office spaces."
				items={countertopImages.slice(0, 4).map(img => ({ img, title: null }))}
				showSeeMore
				limitRows
			/>
			<LocateStore />
			<ContactCTA />
			<Footer />
		</>
	);
}


