-- =====================================================
-- Database Schema for Stone Tiles Website
-- =====================================================
-- This script creates all tables with relationships
-- Database: MySQL/MariaDB (adjust syntax for PostgreSQL if needed)
-- =====================================================

-- Drop tables in reverse order of dependencies (if needed)
-- Uncomment to reset database
/*
DROP TABLE IF EXISTS bill_items;
DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS countertop_gallery;
DROP TABLE IF EXISTS material_showcase_images;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS hero_slide_images;
DROP TABLE IF EXISTS hero_slides;
*/

-- =====================================================
-- 1. HERO SLIDES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category_type ENUM('room', 'material') NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_type (category_type),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    category_id INT,
    product_type ENUM('marble', 'granite', 'tiles', 'countertop') NOT NULL,
    color VARCHAR(50),
    price_per_sqft DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    sqft_per_unit DECIMAL(8, 2) DEFAULT 30.00,
    total_sqft_stock DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    primary_image_url VARCHAR(500) NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    meta_keywords VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_category_id (category_id),
    INDEX idx_product_type (product_type),
    INDEX idx_color (color),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_active (is_active),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. PRODUCT IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_order INT DEFAULT 0,
    alt_text VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_image_order (image_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. MATERIAL SHOWCASE IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS material_showcase_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. COUNTERTOP GALLERY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS countertop_gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(200),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. CUSTOMERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    status ENUM('pending', 'contacted', 'quoted', 'closed') DEFAULT 'pending',
    whatsapp_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. BILLS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS bills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    inquiry_id INT,
    bill_date DATE NOT NULL,
    total_sqft DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    service_charge DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    payment_status ENUM('pending', 'partial', 'paid', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_bill_number (bill_number),
    INDEX idx_bill_date (bill_date),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. BILL ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS bill_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT NOT NULL,
    product_id INT,
    product_name VARCHAR(200) NOT NULL,
    product_image_url VARCHAR(500),
    product_type VARCHAR(50),
    price_per_sqft DECIMAL(10, 2) NOT NULL,
    sqft_ordered DECIMAL(10, 2) NOT NULL,
    item_total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_bill_id (bill_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA INSERTION (Optional)
-- =====================================================

-- Insert sample hero slides
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) VALUES
('https://www.kajariaceramics.com/storage/banner/kajaria-living-desktop-2.webp', 'Transform Your Space', 'Discover luxury tiles and stones for every corner of your home.', 1, TRUE),
('https://www.kajariaceramics.com/storage/banner/kajaria-bathroom-desktop.webp', 'Elegant Bathroom Designs', 'Redefine comfort with our exclusive tile collection.', 2, TRUE),
('https://www.kajariaceramics.com/storage/banner/kajaria-kitchen-dektop.webp', 'Stylish Kitchen Spaces', 'Premium quality tiles that blend beauty and durability.', 3, TRUE),
('https://i.pinimg.com/736x/82/8b/ce/828bce282a9abc67efc28b0622ccdfcb.jpg', 'HandCrafted Counter Top', 'Premium quality counter tops that blend beauty and durability.', 4, TRUE);

-- Insert sample room categories
INSERT INTO categories (name, image_url, category_type, display_order, is_active) VALUES
('Bathroom', 'https://www.kajariaceramics.com/storage/product_attributes/bathroom-floor-tiles-3.webp', 'room', 1, TRUE),
('Kitchen', 'https://www.kajariaceramics.com/storage/product_attributes/kitechen-countertop.webp', 'room', 2, TRUE),
('Living Room', 'https://www.kajariaceramics.com/storage/product_attributes/livingroom-wall-tiles-4.webp', 'room', 3, TRUE),
('Bedroom', 'https://www.kajariaceramics.com/storage/product_attributes/bedroom-floor-tiles-1.webp', 'room', 4, TRUE),
('Outdoor Floor', 'https://www.kajariaceramics.com/storage/product_attributes/outdoor-floor-tiles.webp', 'room', 5, TRUE),
('Counter Tops', 'https://i.etsystatic.com/29545009/r/il/3c8902/6228716393/il_1588xN.6228716393_1ly1.jpg', 'room', 6, TRUE);

-- Insert sample material type categories
INSERT INTO categories (name, image_url, category_type, display_order, is_active) VALUES
('Tiles', 'https://www.kajariaceramics.com/storage/product_attributes/unitera.webp', 'material', 1, TRUE),
('Marbles', 'https://i.pinimg.com/1200x/ae/64/a9/ae64a9fd7fdfa8f60623d7f12f14bead.jpg', 'material', 2, TRUE),
('Granites', 'https://i.pinimg.com/736x/54/6d/c1/546dc152c8b9025809af2abdeb694aeb.jpg', 'material', 3, TRUE),
('Counter Top', 'https://i.etsystatic.com/29545009/r/il/3c8902/6228716393/il_1588xN.6228716393_1ly1.jpg', 'material', 4, TRUE);

-- Insert sample products
INSERT INTO products (name, slug, category_id, product_type, color, price_per_sqft, sqft_per_unit, total_sqft_stock, primary_image_url, is_featured, is_active) VALUES
('Carrara White Marble', 'carrara-white-marble', 7, 'marble', 'white', 120.00, 32.00, 150.00, 'https://i.pinimg.com/736x/97/00/8e/97008e9da147148fe923d173427245d5.jpg', TRUE, TRUE),
('Calacatta Gold Marble', 'calacatta-gold-marble', 7, 'marble', 'gold', 150.00, 32.00, 200.00, 'https://i.pinimg.com/736x/5b/89/dc/5b89dcff1796f0636ac05ec35f50f97a.jpg', TRUE, TRUE),
('Absolute Black Granite', 'absolute-black-granite', 8, 'granite', 'black', 140.00, 30.00, 180.00, 'https://i.pinimg.com/1200x/86/4c/05/864c0597ea48346ab437f8db21e3ab2a.jpg', TRUE, TRUE),
('Travertine Beige', 'travertine-beige', 7, 'tiles', 'beige', 80.00, 33.00, 220.00, 'https://i.pinimg.com/1200x/8e/32/a5/8e32a55b2c6ed7e22b81c9a8d49b564f.jpg', FALSE, TRUE);

-- Insert sample material showcase images
INSERT INTO material_showcase_images (image_url, display_order, is_active) VALUES
('https://i.pinimg.com/1200x/b9/3c/13/b93c13a99722d6d9a66a0189082bb53b.jpg', 1, TRUE),
('https://i.pinimg.com/1200x/ec/16/52/ec1652fa08e0faae9ccdfc5c89038b45.jpg', 2, TRUE),
('https://i.pinimg.com/1200x/d3/95/c7/d395c77fee4d34ccd7481e0c0085bee6.jpg', 3, TRUE),
('https://i.pinimg.com/1200x/15/7f/16/157f168ca3887e001778d4f37ab857a3.jpg', 4, TRUE);

-- Insert sample countertop gallery images
INSERT INTO countertop_gallery (image_url, title, display_order, is_active) VALUES
('https://i.etsystatic.com/29545009/r/il/3c8902/6228716393/il_1588xN.6228716393_1ly1.jpg', NULL, 1, TRUE),
('https://www.woodensure.com/assets/images/products/1747041760RrsjBkzO.jpg', NULL, 2, TRUE),
('https://www.woodensure.com/assets/images/products/1747041710y0EqVXNy.jpg', NULL, 3, TRUE),
('https://www.woodensure.com/assets/images/products/17255177684xl0oomS.png', NULL, 4, TRUE);

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all active hero slides ordered by display order
-- SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY display_order;

-- Get all products with category name
-- SELECT p.*, c.name as category_name, c.category_type 
-- FROM products p 
-- LEFT JOIN categories c ON p.category_id = c.id 
-- WHERE p.is_active = 1;

-- Get product with all images
-- SELECT p.*, 
--        GROUP_CONCAT(pi.image_url ORDER BY pi.image_order SEPARATOR ',') as images
-- FROM products p
-- LEFT JOIN product_images pi ON p.id = pi.product_id
-- WHERE p.id = 1
-- GROUP BY p.id;

-- Get bill with customer phone and items
-- SELECT b.*, 
--        c.phone,
--        bi.product_name, bi.sqft_ordered, bi.item_total_price
-- FROM bills b
-- JOIN customers c ON b.customer_id = c.id
-- LEFT JOIN bill_items bi ON b.id = bi.bill_id
-- WHERE b.id = 1;

-- Get all bills for a specific phone number
-- SELECT b.*, 
--        GROUP_CONCAT(bi.product_name SEPARATOR ', ') as items
-- FROM bills b
-- JOIN customers c ON b.customer_id = c.id
-- LEFT JOIN bill_items bi ON b.id = bi.bill_id
-- WHERE c.phone = '+919876543210'
-- GROUP BY b.id
-- ORDER BY b.bill_date DESC, b.created_at DESC;

-- Get complete bill details with breakdown
-- SELECT b.bill_number, b.bill_date, c.phone,
--        b.subtotal, b.tax_rate, b.tax_amount, 
--        b.service_charge, b.discount_amount, b.total_amount,
--        b.payment_status, b.payment_method,
--        bi.product_name, bi.sqft_ordered, bi.price_per_sqft, bi.item_total_price
-- FROM bills b
-- JOIN customers c ON b.customer_id = c.id
-- LEFT JOIN bill_items bi ON b.id = bi.bill_id
-- WHERE b.bill_number = 'BILL-2024-001'
-- ORDER BY bi.id;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

