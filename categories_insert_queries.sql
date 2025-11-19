-- =====================================================
-- 6 SQL INSERT Queries for Categories Table
-- =====================================================
-- Copy and paste these queries individually or run them all at once
-- =====================================================

-- 1. Insert Bathroom Category (Room Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Bathroom', 'https://www.kajariaceramics.com/storage/product_attributes/bathroom-floor-tiles-3.webp', 'room', 1, TRUE);

-- 2. Insert Kitchen Category (Room Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Kitchen', 'https://www.kajariaceramics.com/storage/product_attributes/kitechen-countertop.webp', 'room', 2, TRUE);

-- 3. Insert Living Room Category (Room Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Living Room', 'https://www.kajariaceramics.com/storage/product_attributes/livingroom-wall-tiles-4.webp', 'room', 3, TRUE);

-- 4. Insert Tiles Category (Material Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Tiles', 'https://www.kajariaceramics.com/storage/product_attributes/unitera.webp', 'material', 1, TRUE);

-- 5. Insert Marbles Category (Material Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Marbles', 'https://i.pinimg.com/1200x/ae/64/a9/ae64a9fd7fdfa8f60623d7f12f14bead.jpg', 'material', 2, TRUE);

-- 6. Insert Granites Category (Material Type)
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Granites', 'https://i.pinimg.com/736x/54/6d/c1/546dc152c8b9025809af2abdeb694aeb.jpg', 'material', 3, TRUE);

-- =====================================================
-- Alternative: All 6 as Room Categories
-- =====================================================
/*
-- 1. Bathroom
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Bathroom', 'https://www.kajariaceramics.com/storage/product_attributes/bathroom-floor-tiles-3.webp', 'room', 1, TRUE);

-- 2. Kitchen
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Kitchen', 'https://www.kajariaceramics.com/storage/product_attributes/kitechen-countertop.webp', 'room', 2, TRUE);

-- 3. Living Room
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Living Room', 'https://www.kajariaceramics.com/storage/product_attributes/livingroom-wall-tiles-4.webp', 'room', 3, TRUE);

-- 4. Bedroom
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Bedroom', 'https://www.kajariaceramics.com/storage/product_attributes/bedroom-floor-tiles-1.webp', 'room', 4, TRUE);

-- 5. Outdoor Floor
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Outdoor Floor', 'https://www.kajariaceramics.com/storage/product_attributes/outdoor-floor-tiles.webp', 'room', 5, TRUE);

-- 6. Counter Tops
INSERT INTO categories (name, image_url, category_type, display_order, is_active) 
VALUES ('Counter Tops', 'https://i.etsystatic.com/29545009/r/il/3c8902/6228716393/il_1588xN.6228716393_1ly1.jpg', 'room', 6, TRUE);
*/

