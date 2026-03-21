import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../landing/Header';
import Footer from '../landing/Footer';
import { blogPosts, formatBlogDate } from '../data/blogPosts';
import './Blog.css';

const FALLBACK_COVER =
	'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

export default function BlogIndex() {
	return (
		<>
			<SEO
				title="Granite, Marble & Tile Buying Guide Gurgaon"
				description="Explore expert guides on granite, marble, Italian marble, and nano tiles in Sohna Road, Bhondsi, Gurgaon. Learn prices, designs, installation tips, and best stone options for kitchens, flooring, and commercial projects."
				keywords="granite Gurgaon, marble Gurgaon, Italian marble, nano tiles, Sohna Road, Bhondsi, tile buying guide, kitchen stone, flooring, Kataria Stone World blog"
			/>
			<Header />
			<div className="blog-page blog-page--process">
				<div className="blog-hero">
					<div className="blog-hero-inner">
						<div className="blog-hero-badge" aria-hidden="true">
							<i className="fa-solid fa-pen-nib" />
						</div>
						<p className="blog-hero-eyebrow">Insights & guides</p>
						<h1 className="blog-hero-title">
							Granite, Marble & Tile Buying Guide in Gurgaon
						</h1>
						<p className="blog-hero-lead">
							Explore expert guides on granite, marble, Italian marble, and nano tiles
							in Sohna Road, Bhondsi, Gurgaon. Learn prices, designs, installation
							tips, and best stone options for kitchens, flooring, and commercial
							projects.
						</p>
					</div>
				</div>

				<div className="blog-page-inner blog-process-inner">
					<ul className="blog-process-list">
						{blogPosts.map((post, index) => {
							const cover = post.coverImage || FALLBACK_COVER;
							const reverse = index % 2 === 1;
							return (
								<li
									key={post.slug}
									className={`blog-process-row${reverse ? ' blog-process-row--reverse' : ''}`}
								>
									<article className="blog-process-article">
										<Link
											to={`/blog/${post.slug}`}
											className="blog-process-link"
											aria-labelledby={`blog-process-title-${post.slug}`}
										>
											<div className="blog-process-text">
												{post.category && (
													<span className="blog-process-cat">{post.category}</span>
												)}
												<div className="blog-process-meta">
													<time dateTime={post.datePublished}>
														{formatBlogDate(post.datePublished)}
													</time>
													{post.readingTimeMinutes ? (
														<>
															<span className="blog-process-meta-sep" aria-hidden="true">
																·
															</span>
															<span>{post.readingTimeMinutes} min read</span>
														</>
													) : null}
												</div>
												<h2
													className="blog-process-title"
													id={`blog-process-title-${post.slug}`}
												>
													{post.title}
												</h2>
												<p className="blog-process-excerpt">
													{post.listExcerpt || post.metaDescription}
												</p>
											</div>
											<div className="blog-process-visual">
												<div className="blog-process-thumb">
													<img
														src={cover}
														alt=""
														className="blog-process-img"
														loading="lazy"
														decoding="async"
													/>
												</div>
											</div>
										</Link>
									</article>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<Footer />
		</>
	);
}
