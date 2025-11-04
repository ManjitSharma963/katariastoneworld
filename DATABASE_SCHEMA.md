# Database Schema for Stone Tiles Website

Based on your current data structure, here's a comprehensive database schema recommendation:

## Total Tables Needed: **10 Tables**

---

## 1. **hero_slides** (Hero Banner Slider)
Stores hero slider information (title, description).

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| title | VARCHAR(200) | Slide title |
| subtitle | VARCHAR(500) | Slide subtitle/description |
| primary_image_url | VARCHAR(500) | Primary/fallback image URL |
| display_order | INT | Order of display (1, 2, 3...) |
| is_active | BOOLEAN | Active/Inactive slide |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 1A. **hero_slide_images** (Hero Slide Images)
Stores multiple images per hero slide.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| hero_slide_id | INT FOREIGN KEY | Reference to hero_slides table |
| image_url | VARCHAR(500) | Image URL |
| image_order | INT | Display order (1, 2, 3...) |
| alt_text | VARCHAR(200) | Image alt text for SEO |
| is_primary | BOOLEAN | Primary image flag |
| created_at | TIMESTAMP | Creation timestamp |

---

## 2. **categories** (Categories - Rooms & Types)
Stores both room categories (Bathroom, Kitchen) and material types (Tiles, Marbles).

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| name | VARCHAR(100) | Category name (e.g., "Bathroom", "Tiles") |
| image_url | VARCHAR(500) | Category image URL |
| category_type | ENUM('room', 'material') | Type: room or material |
| description | TEXT | Optional description |
| display_order | INT | Order of display |
| is_active | BOOLEAN | Active/Inactive |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

---

## 3. **products** (Main Products Table)
Stores all products (stones, tiles, countertops).

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| name | VARCHAR(200) | Product name (e.g., "Carrara White Marble") |
| slug | VARCHAR(250) UNIQUE | URL-friendly name |
| category_id | INT FOREIGN KEY | Reference to categories table |
| product_type | ENUM('marble', 'granite', 'tiles', 'countertop') | Product type |
| color | VARCHAR(50) | Primary color (white, black, beige, etc.) |
| price_per_sqft | DECIMAL(10,2) | Price per square foot |
| sqft_per_unit | DECIMAL(8,2) | Square feet per unit |
| total_sqft_stock | DECIMAL(10,2) | Total square feet available in stock |
| primary_image_url | VARCHAR(500) | Main product image |
| description | TEXT | Product description |
| is_featured | BOOLEAN | Featured product flag |
| is_active | BOOLEAN | Active/Inactive |
| meta_keywords | VARCHAR(500) | SEO keywords |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- INDEX idx_category_id (category_id)
- INDEX idx_product_type (product_type)
- INDEX idx_color (color)
- INDEX idx_is_featured (is_featured)

---

## 4. **product_images** (Product Images Gallery)
Stores multiple images per product.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| product_id | INT FOREIGN KEY | Reference to products table |
| image_url | VARCHAR(500) | Image URL |
| image_order | INT | Display order (1, 2, 3...) |
| alt_text | VARCHAR(200) | Image alt text for SEO |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- INDEX idx_product_id (product_id)

---

## 5. **material_showcase_images** (Material Showcase Gallery)
Stores images for the material showcase carousel.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| image_url | VARCHAR(500) | Image URL |
| display_order | INT | Display order |
| is_active | BOOLEAN | Active/Inactive |
| created_at | TIMESTAMP | Creation timestamp |

---

## 6. **countertop_gallery** (Countertop Gallery Images)
Stores countertop showcase images.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| image_url | VARCHAR(500) | Image URL |
| title | VARCHAR(200) NULL | Optional title |
| display_order | INT | Display order |
| is_active | BOOLEAN | Active/Inactive |
| created_at | TIMESTAMP | Creation timestamp |

---

## 7. **customers** (Customer Mobile Numbers)
Stores customer mobile numbers only.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| phone | VARCHAR(20) UNIQUE | Phone/mobile number (unique) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- INDEX idx_phone (phone)
- UNIQUE constraint on phone to prevent duplicates

---

## 8. **inquiries** (Quotation Requests)
Stores quotation/inquiry requests.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| customer_id | INT FOREIGN KEY NULL | Reference to customers (if exists) |
| phone | VARCHAR(20) | Phone/mobile number |
| message | TEXT | Inquiry message/details |
| status | ENUM('pending', 'contacted', 'quoted', 'closed') | Inquiry status |
| whatsapp_sent | BOOLEAN | Whether WhatsApp message was sent |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- INDEX idx_customer_id (customer_id)
- INDEX idx_status (status)
- INDEX idx_created_at (created_at)
- INDEX idx_phone (phone)

---

## 9. **bills** (Bills/Invoices)
Stores customer bills and invoices.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| bill_number | VARCHAR(50) UNIQUE | Unique bill number (e.g., BILL-2024-001) |
| customer_id | INT FOREIGN KEY | Reference to customers |
| inquiry_id | INT FOREIGN KEY NULL | Reference to inquiries |
| bill_date | DATE | Bill date |
| total_sqft | DECIMAL(10,2) | Total square feet ordered |
| subtotal | DECIMAL(10,2) | Subtotal amount |
| tax_rate | DECIMAL(5,2) | Tax percentage |
| tax_amount | DECIMAL(10,2) | Tax amount |
| service_charge | DECIMAL(10,2) | Service charge |
| discount_amount | DECIMAL(10,2) | Discount amount (if any) |
| total_amount | DECIMAL(10,2) | Grand total |
| payment_status | ENUM('pending', 'partial', 'paid', 'cancelled') | Payment status |
| payment_method | VARCHAR(50) | Payment method (cash, card, online, etc.) |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- INDEX idx_customer_id (customer_id)
- INDEX idx_bill_number (bill_number)
- INDEX idx_bill_date (bill_date)
- INDEX idx_payment_status (payment_status)

---

## 10. **bill_items** (Bill Items)
Stores individual items in each bill.

| Column | Type | Description |
|--------|------|-------------|
| id | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier |
| bill_id | INT FOREIGN KEY | Reference to bills table |
| product_id | INT FOREIGN KEY | Reference to products table |
| product_name | VARCHAR(200) | Product name (snapshot) |
| product_image_url | VARCHAR(500) | Product image (snapshot) |
| product_type | VARCHAR(50) | Product type (snapshot) |
| price_per_sqft | DECIMAL(10,2) | Price per sqft (snapshot) |
| sqft_ordered | DECIMAL(10,2) | Square feet ordered |
| item_total_price | DECIMAL(10,2) | Total price for this item |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- INDEX idx_bill_id (bill_id)
- INDEX idx_product_id (product_id)

---

## Database Relationships

```
hero_slides (one)
  └── hero_slide_images (one-to-many)
categories (standalone)
  └── products (many-to-one)
      └── product_images (one-to-many)
      └── bill_items (one-to-many)
material_showcase_images (standalone)
countertop_gallery (standalone)
customers (standalone)
  └── inquiries (one-to-many)
  └── bills (one-to-many)
      └── bill_items (one-to-many)
```

---

## Summary

**Total Tables: 11**

1. hero_slides
2. hero_slide_images
3. categories
4. products
5. product_images
6. material_showcase_images
7. countertop_gallery
8. customers
9. inquiries
10. orders
11. order_items

---

## Optional Additional Tables (For Future Enhancements)

1. **admin_users** - For admin dashboard access
2. **product_reviews** - Customer reviews
3. **promotions** - Discount codes, special offers
4. **locations** - Store locations (if needed)
5. **product_attributes** - Additional product specifications
6. **wishlist** - Customer wishlist items

---

## Sample SQL Queries

### Get all hero slides
```sql
SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY display_order;
```

### Get products by category
```sql
SELECT p.*, c.name as category_name 
FROM products p 
JOIN categories c ON p.category_id = c.id 
WHERE c.category_type = 'room' AND p.is_active = 1;
```

### Get products with images
```sql
SELECT p.*, 
       GROUP_CONCAT(pi.image_url ORDER BY pi.image_order) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.is_active = 1
GROUP BY p.id;
```

### Get bill with items
```sql
SELECT b.*, 
       c.phone,
       GROUP_CONCAT(bi.product_name) as items
FROM bills b
JOIN customers c ON b.customer_id = c.id
LEFT JOIN bill_items bi ON b.id = bi.bill_id
WHERE b.bill_number = ?
GROUP BY b.id;
```

### Get bill details for printing
```sql
SELECT b.bill_number, b.bill_date, c.phone,
       b.subtotal, b.tax_rate, b.tax_amount, 
       b.service_charge, b.discount_amount, b.total_amount,
       b.payment_status, b.payment_method,
       bi.product_name, bi.sqft_ordered, bi.price_per_sqft, bi.item_total_price
FROM bills b
JOIN customers c ON b.customer_id = c.id
LEFT JOIN bill_items bi ON b.id = bi.bill_id
WHERE b.bill_number = 'BILL-2024-001'
ORDER BY bi.id;
```

---

## Notes

- Use **VARCHAR** for URLs (up to 500 characters)
- Use **DECIMAL** for prices and measurements (precision matters)
- Use **ENUM** for fixed value lists (status, types)
- Add **FOREIGN KEY constraints** for data integrity
- Use **INDEXES** on frequently queried columns
- Consider **soft deletes** (is_active flag instead of DELETE)
- Add **timestamps** for audit trails

