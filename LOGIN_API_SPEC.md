# Login API Specification

## API Endpoint

**Base URL:** `http://localhost:8080/api`

## Login Curl Request

### Basic Login Request
```bash
curl --location 'http://localhost:8080/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.com",
    "password": "test123"
}'
```

### Login Request (One Line)
```bash
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test123"}'
```

## Expected Request Format

### Request Method
- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Content-Type:** `application/json`

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Request Headers
```
Content-Type: application/json
```

## Expected Response Format

### Success Response (200 OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

**Note:** The frontend expects at least an `access_token` field in the response. The token is stored in `localStorage` as `access_token`.

### Error Response (401 Unauthorized)
```json
{
    "message": "Invalid email or password",
    "error": "Unauthorized"
}
```

### Error Response (400 Bad Request)
```json
{
    "message": "Email and password are required",
    "error": "Bad Request"
}
```

## Usage in Frontend

The login flow works as follows:

1. **User clicks checkout** → CartModal checks for `access_token` in localStorage
2. **If no token** → Shows LoginModal
3. **User enters credentials** → Calls `POST /api/auth/login`
4. **On success** → Token stored in localStorage as `access_token`
5. **Billing API call** → Uses `Authorization: Bearer {access_token}` header

## Billing API (After Login)

Once logged in, the billing endpoint requires the access token:

```bash
curl --location 'http://localhost:8080/api/bills' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN_HERE' \
--data '{
    "customerName": "John Doe",
    "customerMobileNumber": "9876543210",
    "customerEmail": "john@example.com",
    "address": "123 Main St, City, State - 123456",
    "gstin": null,
    "items": [
        {
            "itemName": "Product Name",
            "category": "tiles",
            "pricePerUnit": 100,
            "quantity": 10
        }
    ],
    "taxPercentage": 5,
    "discountAmount": 0,
    "totalAmount": 1050
}'
```

## Complete Flow Example

### Step 1: Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Response:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### Step 2: Use Token for Billing
```bash
curl -X POST http://localhost:8080/api/bills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" \
  -d '{
    "customerName": "John Doe",
    "customerMobileNumber": "9876543210",
    "items": [{"itemName": "Tile", "category": "tiles", "pricePerUnit": 100, "quantity": 10}],
    "taxPercentage": 5,
    "discountAmount": 0,
    "totalAmount": 1050
}'
```

## Notes

- The access token is stored in browser's `localStorage` with key `access_token`
- Token is sent in `Authorization` header as `Bearer {token}` for protected endpoints
- If token is missing or invalid (401), user is prompted to login again
- Token should be included in all billing-related API calls

