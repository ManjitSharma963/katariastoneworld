# Categories API Specification

## API Endpoint

**Base URL:** `http://localhost:8080/api`

## Curl Requests

### 1. Get All Categories
```bash
curl -X GET http://localhost:8080/api/categories \
  -H "Content-Type: application/json"
```

### 2. Get Categories by Type (Room or Material)
```bash
# Get room categories only
curl -X GET "http://localhost:8080/api/categories?category_type=room" \
  -H "Content-Type: application/json"

# Get material categories only
curl -X GET "http://localhost:8080/api/categories?category_type=material" \
  -H "Content-Type: application/json"
```

### 3. Get Active Categories Only
```bash
curl -X GET "http://localhost:8080/api/categories?is_active=true" \
  -H "Content-Type: application/json"
```

### 4. Get Categories with Sorting
```bash
# Get categories sorted by display_order
curl -X GET "http://localhost:8080/api/categories?sort_by=display_order&order=asc" \
  -H "Content-Type: application/json"
```

### 5. Combined Query (Room categories, active only, sorted)
```bash
curl -X GET "http://localhost:8080/api/categories?category_type=room&is_active=true&sort_by=display_order&order=asc" \
  -H "Content-Type: application/json"
```

## Expected Response Format

### Success Response (200 OK)
```json
[
  {
    "id": 1,
    "name": "Bathroom",
    "imageUrl": "https://www.kajariaceramics.com/storage/product_attributes/bathroom-floor-tiles-3.webp",
    "categoryType": "room",
    "description": null,
    "displayOrder": 1,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Kitchen",
    "imageUrl": "https://www.kajariaceramics.com/storage/product_attributes/kitechen-countertop.webp",
    "categoryType": "room",
    "description": null,
    "displayOrder": 2,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Note:** The frontend expects either:
- `title` or `name` (category name)
- `img` or `imageUrl` or `primaryImageUrl` (image URL)

So your API should return `name` and `imageUrl` (camelCase), or you can map them in the frontend.

### Error Response (400/500)
```json
{
  "message": "Error message here",
  "error": "Error details"
}
```

## Database Table Schema

The `categories` table already exists in your schema. Here's the structure:

```sql
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
```

### Table Columns

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| `id` | INT | Primary key, auto-increment | Yes |
| `name` | VARCHAR(100) | Category name (e.g., "Bathroom", "Tiles") | Yes |
| `image_url` | VARCHAR(500) | Category image URL | Yes |
| `category_type` | ENUM('room', 'material') | Type: 'room' or 'material' | Yes |
| `description` | TEXT | Optional description | No |
| `display_order` | INT | Order for display (lower = first) | No (default: 0) |
| `is_active` | BOOLEAN | Whether category is active | No (default: TRUE) |
| `created_at` | TIMESTAMP | Creation timestamp | Auto |
| `updated_at` | TIMESTAMP | Last update timestamp | Auto |

## Sample SQL Queries for API Implementation

### Get All Active Categories
```sql
SELECT 
    id,
    name,
    image_url,
    category_type,
    description,
    display_order,
    is_active,
    created_at,
    updated_at
FROM categories
WHERE is_active = TRUE
ORDER BY display_order ASC, name ASC;
```

### Get Categories by Type
```sql
SELECT 
    id,
    name,
    image_url,
    category_type,
    description,
    display_order,
    is_active,
    created_at,
    updated_at
FROM categories
WHERE category_type = 'room' 
  AND is_active = TRUE
ORDER BY display_order ASC;
```

### Get Room Categories Only
```sql
SELECT * FROM categories 
WHERE category_type = 'room' 
  AND is_active = TRUE
ORDER BY display_order ASC;
```

### Get Material Categories Only
```sql
SELECT * FROM categories 
WHERE category_type = 'material' 
  AND is_active = TRUE
ORDER BY display_order ASC;
```

## Sample Data

Based on your current `data.js`, here are the expected categories:

### Room Categories (category_type = 'room')
- Bathroom
- Kitchen
- Living Room
- Bedroom
- Outdoor Floor
- Counter Tops

### Material Categories (category_type = 'material')
- Tiles
- Marbles
- Granites
- Counter Top

## API Implementation Recommendations

1. **Endpoint:** `GET /api/categories`
2. **Query Parameters:**
   - `category_type` (optional): Filter by 'room' or 'material'
   - `is_active` (optional): Filter by active status (true/false)
   - `sort_by` (optional): Sort field (default: 'display_order')
   - `order` (optional): Sort order 'asc' or 'desc' (default: 'asc')

3. **Response Format:**
   - Return JSON array of category objects
   - Use camelCase for field names (e.g., `imageUrl`, `categoryType`, `displayOrder`, `isActive`)
   - Include all fields from the database

4. **Error Handling:**
   - Return 500 for database errors
   - Return 400 for invalid query parameters
   - Return 404 if category not found (for single category endpoints)

## Frontend Integration

The frontend currently uses hardcoded categories from `src/landing/data.js`. After implementing the API, you can:

1. Create a `categoriesApi.js` service file similar to `heroApi.js`
2. Update `Home.js` to fetch categories from the API
3. Map the API response to match the expected format:
   - `name` → `title`
   - `imageUrl` → `img`

Example mapping:
```javascript
const mappedCategories = categories.map(cat => ({
  title: cat.name,
  img: cat.imageUrl
}));
```

