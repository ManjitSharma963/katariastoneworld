-- =====================================================
-- SQL INSERT Queries for hero_slides Table
-- =====================================================
-- Based on table structure:
-- id (bigint, auto_increment) - Don't include in INSERT
-- image_url (varchar(500), NOT NULL) - Required
-- title (varchar(200), NOT NULL) - Required
-- subtitle (varchar(500), nullable) - Optional
-- display_order (int, default 0) - Optional
-- is_active (tinyint(1), default 1) - Optional
-- created_at, updated_at - Auto-generated
-- =====================================================

-- 1. Insert Hero Slide 1
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) 
VALUES ('https://www.kajariaceramics.com/storage/banner/kajaria-living-desktop-2.webp', 'Transform Your Space', 'Discover luxury tiles and stones for every corner of your home.', 1, 1);

-- 2. Insert Hero Slide 2
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) 
VALUES ('https://www.kajariaceramics.com/storage/banner/kajaria-bathroom-desktop.webp', 'Elegant Bathroom Designs', 'Redefine comfort with our exclusive tile collection.', 2, 1);

-- 3. Insert Hero Slide 3
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) 
VALUES ('https://www.kajariaceramics.com/storage/banner/kajaria-kitchen-dektop.webp', 'Stylish Kitchen Spaces', 'Premium quality tiles that blend beauty and durability.', 3, 1);

-- 4. Insert Hero Slide 4
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) 
VALUES ('https://i.pinimg.com/736x/82/8b/ce/828bce282a9abc67efc28b0622ccdfcb.jpg', 'HandCrafted Counter Top', 'Premium quality counter tops that blend beauty and durability.', 4, 1);

-- =====================================================
-- Alternative: Single INSERT with multiple VALUES
-- =====================================================
/*
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) VALUES
('https://www.kajariaceramics.com/storage/banner/kajaria-living-desktop-2.webp', 'Transform Your Space', 'Discover luxury tiles and stones for every corner of your home.', 1, 1),
('https://www.kajariaceramics.com/storage/banner/kajaria-bathroom-desktop.webp', 'Elegant Bathroom Designs', 'Redefine comfort with our exclusive tile collection.', 2, 1),
('https://www.kajariaceramics.com/storage/banner/kajaria-kitchen-dektop.webp', 'Stylish Kitchen Spaces', 'Premium quality tiles that blend beauty and durability.', 3, 1),
('https://i.pinimg.com/736x/82/8b/ce/828bce282a9abc67efc28b0622ccdfcb.jpg', 'HandCrafted Counter Top', 'Premium quality counter tops that blend beauty and durability.', 4, 1);
*/

-- =====================================================
-- Minimal INSERT (only required fields)
-- =====================================================
/*
INSERT INTO hero_slides (image_url, title) 
VALUES ('https://example.com/image.jpg', 'Hero Title');

-- With optional fields
INSERT INTO hero_slides (image_url, title, subtitle, display_order, is_active) 
VALUES ('https://example.com/image.jpg', 'Hero Title', 'Hero Subtitle', 1, 1);
*/

