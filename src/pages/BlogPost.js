import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import { getPostBySlug, formatBlogDate } from '../data/blogPosts';
import './Blog.css';
import './GraniteLanding.css';

const SITE_ORIGIN =
	typeof window !== 'undefined' ? window.location.origin : 'https://www.katariastoneworld.com';

export default function BlogPost() {
	const { slug } = useParams();
	const post = slug ? getPostBySlug(slug) : null;

	if (!post) {
		return <Navigate to="/blog" replace />;
	}

	const pageTitle = `${post.title} | Kataria Stone World`;
	const articleUrl = `${SITE_ORIGIN}/blog/${post.slug}`;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.metaDescription,
		datePublished: post.datePublished,
		...(post.coverImage && {
			image: post.coverImage
		}),
		author: {
			'@type': 'Organization',
			name: 'Kataria Stone World'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Kataria Stone World'
		},
		mainEntityOfPage: articleUrl
	};

	return (
		<>
			<SEO
				fullTitle
				title={pageTitle}
				description={post.metaDescription}
				keywords="granite Gurgaon, marble Gurgaon, tiles Gurgaon, Kataria Stone World, Sohna Road, Bhondsi"
			/>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			</Helmet>
			<Header />
			<article className="blog-article" itemScope itemType="https://schema.org/BlogPosting">
				<meta itemProp="datePublished" content={post.datePublished} />
				<div className="blog-article-inner">
					<nav className="blog-breadcrumb" aria-label="Breadcrumb">
						<Link to="/">Home</Link>
						<span aria-hidden="true"> / </span>
						<Link to="/blog">Blog</Link>
						<span aria-hidden="true"> / </span>
						<span className="blog-breadcrumb-current">{post.title}</span>
					</nav>
					{post.coverImage && (
						<div className="blog-article-cover">
							<img
								src={post.coverImage}
								alt={post.title}
								loading="eager"
								decoding="async"
							/>
						</div>
					)}
					<header className="blog-article-header">
						<div className="blog-article-meta">
							<time dateTime={post.datePublished}>
								{formatBlogDate(post.datePublished)}
							</time>
							{post.category && (
								<>
									<span className="blog-article-meta-sep" aria-hidden="true">
										·
									</span>
									<span>{post.category}</span>
								</>
							)}
							{post.readingTimeMinutes ? (
								<>
									<span className="blog-article-meta-sep" aria-hidden="true">
										·
									</span>
									<span>{post.readingTimeMinutes} min read</span>
								</>
							) : null}
						</div>
						<h1 className="blog-article-title" itemProp="headline">
							{post.title}
						</h1>
					</header>
					<div className="blog-article-body" itemProp="articleBody">
						{post.sections && post.sections.length > 0
							? post.sections.map((block, i) => {
									if (block.type === 'h2') {
										return (
											<h2 key={i} className="blog-article-h2">
												{block.text}
											</h2>
										);
									}
									if (block.type === 'h3') {
										return (
											<h3 key={i} className="blog-article-h3">
												{block.text}
											</h3>
										);
									}
									if (block.type === 'ul') {
										return (
											<ul key={i} className="blog-article-list">
												{block.items.map((item, j) => (
													<li key={j}>{item}</li>
												))}
											</ul>
										);
									}
									if (block.type === 'p') {
										const isCallout = block.variant === 'callout';
										return (
											<p
												key={i}
												className={
													isCallout ? 'blog-article-p blog-article-callout' : undefined
												}
											>
												{block.text}
											</p>
										);
									}
									return null;
							  })
							: Array.isArray(post.content) && post.content.length > 0
								? post.content.map((para, i) => <p key={i}>{para}</p>)
								: null}
					</div>
					<div className="blog-article-footer">
						<Link to="/blog" className="blog-back-link">
							<i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to
							blog
						</Link>
						<Link to="/products" className="landing-btn primary">
							View collection
						</Link>
					</div>
				</div>
			</article>
			<Footer />
		</>
	);
}
