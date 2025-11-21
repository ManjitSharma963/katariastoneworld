# API Documentation

Complete API reference for the Stone Tiles Website backend integration.

## Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Categories API](#categories-api)
4. [Inventory API](#inventory-api)
5. [Hero Slides API](#hero-slides-api)
6. [Billing API](#billing-api)
7. [Error Handling](#error-handling)
8. [Rate Limiting](#rate-limiting)

## Base URL

**Development**: `http://localhost:8080/api`  
**Production**: `https://your-api-domain.com/api`

All API endpoints are prefixed with `/api`.

## Authentication

### Login

Authenticate user and receive access token.

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

**Usage**:
```javascript
import { login } from './services/authApi';

const response = await login('user@example.com', 'password123');
localStorage.setItem('access_token', response.access_token);
```

**See also**: [LOGIN_API_SPEC.md](./LOGIN_API_SPEC.md)

## Categories API

### Get All Categories

Fetch all product categories.

**Endpoint**: `GET /api/categories`

**Query Parameters**:
- `category_type` (optional): Filter by type (`room`, `material`, `furniture`, etc.)
- `is_active` (optional): Filter by active status (`true`/`false`)
- `sort_by` (optional): Sort field (default: `display_order`)
- `order` (optional): Sort order (`asc`/`desc`, default: `asc`)

**Example Requests**:
```bash
# Get all categories
GET /api/categories

# Get room categories only
GET /api/categories?category_type=room

# Get active material categories, sorted
GET /api/categories?category_type=material&is_active=true&sort_by=display_order&order=asc
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Bathroom",
    "imageUrl": "https://example.com/bathroom.jpg",
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
    "imageUrl": "https://example.com/kitchen.jpg",
    "categoryType": "room",
    "description": null,
    "displayOrder": 2,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Usage**:
```javascript
import { fetchCategories } from './services/categoriesApi';

// Get all categories
const categories = await fetchCategories();

// Get room categories
const roomCategories = await fetchCategories('room');
```

**See also**: [CATEGORIES_API_SPEC.md](./CATEGORIES_API_SPEC.md)

## Inventory API

### Get All Products

Fetch all products/inventory items.

**Endpoint**: `GET /api/inventory`

**Query Parameters**:
- `category_id` (optional): Filter by category ID
- `product_type` (optional): Filter by type (`marble`, `granite`, `tiles`, `countertop`)
- `color` (optional): Filter by color
- `is_active` (optional): Filter by active status
- `is_featured` (optional): Get featured products only
- `search` (optional): Search by product name
- `min_price` (optional): Minimum price per sqft
- `max_price` (optional): Maximum price per sqft

**Example Request**:
```bash
GET /api/inventory?category_id=1&product_type=tiles&is_active=true
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Carrara White Marble",
    "slug": "carrara-white-marble",
    "categoryId": 1,
    "productType": "marble",
    "color": "white",
    "pricePerSqft": 150.00,
    "sqftPerUnit": 10.5,
    "totalSqftStock": 500.00,
    "primaryImageUrl": "https://example.com/carrara.jpg",
    "description": "Premium white marble with elegant veining",
    "isFeatured": true,
    "isActive": true,
    "metaKeywords": "carrara, white, marble, premium",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Usage**:
```javascript
import { fetchInventory } from './services/inventoryApi';

const products = await fetchInventory();
```

## Hero Slides API

### Get Hero Slides

Fetch hero slider content for the homepage.

**Endpoint**: `GET /api/hero-slides`

**Query Parameters**:
- `is_active` (optional): Filter by active status (default: `true`)

**Example Request**:
```bash
GET /api/hero-slides?is_active=true
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Premium Tiles Collection",
    "subtitle": "Discover our wide range of premium tiles",
    "primaryImageUrl": "https://example.com/hero1.jpg",
    "displayOrder": 1,
    "isActive": true,
    "images": [
      {
        "id": 1,
        "imageUrl": "https://example.com/hero1-1.jpg",
        "imageOrder": 1,
        "altText": "Premium tiles showcase",
        "isPrimary": true
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Usage**:
```javascript
import { fetchHeroSlides } from './services/heroApi';

const slides = await fetchHeroSlides();
```

## Billing API

### Submit Bill

Create a new bill/invoice. Requires authentication.

**Endpoint**: `POST /api/bills`

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "customerName": "John Doe",
  "customerMobileNumber": "9876543210",
  "customerEmail": "john@example.com",
  "address": "123 Main St, City, State - 123456",
  "gstin": "29ABCDE1234F1Z5",
  "items": [
    {
      "itemName": "Carrara White Marble",
      "category": "marble",
      "pricePerUnit": 150.00,
      "quantity": 10.5
    },
    {
      "itemName": "Premium Tiles",
      "category": "tiles",
      "pricePerUnit": 80.00,
      "quantity": 20.0
    }
  ],
  "taxPercentage": 5,
  "discountAmount": 100.00,
  "totalAmount": 2675.00
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "billNumber": "BILL-2024-001",
  "customerId": 1,
  "billDate": "2024-01-15",
  "totalSqft": 30.5,
  "subtotal": 2775.00,
  "taxRate": 5.00,
  "taxAmount": 138.75,
  "serviceCharge": 0.00,
  "discountAmount": 100.00,
  "totalAmount": 2675.00,
  "paymentStatus": "pending",
  "paymentMethod": null,
  "notes": null,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Unauthorized. Please login.",
  "error": "Unauthorized"
}
```

**Usage**:
```javascript
import { submitBilling } from './services/billingApi';

const billingData = {
  customerName: "John Doe",
  customerMobileNumber: "9876543210",
  items: [...],
  taxPercentage: 5,
  discountAmount: 0,
  totalAmount: 1000
};

const response = await submitBilling(billingData);
```

## Error Handling

### Standard Error Response

All errors follow this format:

```json
{
  "message": "Human-readable error message",
  "error": "Error type or code",
  "details": {} // Optional additional details
}
```

### HTTP Status Codes

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request (resource created)
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### Error Handling in Frontend

```javascript
try {
  const response = await fetch(`${API_BASE_URL}/endpoint`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Handle error (show notification, log, etc.)
  throw error;
}
```

## Rate Limiting

API requests may be rate-limited to prevent abuse. If you receive a `429 Too Many Requests` response:

```json
{
  "message": "Rate limit exceeded",
  "error": "TooManyRequests",
  "retryAfter": 60
}
```

Wait for the specified `retryAfter` seconds before making another request.

## CORS Configuration

The backend should allow requests from:
- Development: `http://localhost:3000`
- Production: Your production domain

Configure CORS headers:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Testing API Endpoints

### Using cURL

```bash
# Get categories
curl http://localhost:8080/api/categories

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Submit bill (with token)
curl -X POST http://localhost:8080/api/bills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"customerName":"John","items":[...]}'
```

### Using Postman

1. Import the collection (if available)
2. Set base URL: `http://localhost:8080/api`
3. For authenticated endpoints, add token in Authorization header:
   - Type: Bearer Token
   - Token: `{access_token}`

## API Versioning

Currently using unversioned API. Future versions may use:
- URL versioning: `/api/v1/categories`
- Header versioning: `Accept: application/vnd.api+json;version=1`

## Additional Resources

- [Categories API Spec](./CATEGORIES_API_SPEC.md) - Detailed categories endpoint documentation
- [Login API Spec](./LOGIN_API_SPEC.md) - Detailed authentication documentation
- [Database Schema](./DATABASE_SCHEMA.md) - Database structure reference

---

**Last Updated**: 2024

