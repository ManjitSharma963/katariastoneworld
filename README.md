# Stone Tiles Website - Kataria Stone World

A modern, responsive e-commerce website for stone tiles, marbles, and granites. Built with React, this application provides a seamless shopping experience for customers looking to purchase premium tiles and stones in Gurgaon.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by categories (Bathroom, Kitchen, Living Room, etc.) and material types (Tiles, Marbles, Granites)
- **Product Search & Filtering**: Advanced filtering by category, material type, color, and price range
- **Shopping Cart**: Add products to cart with customizable square footage quantities
- **Price Calculator**: Calculate total costs based on square footage and pricing
- **Shipping Estimator**: Estimate shipping costs based on location
- **Inquiry Form**: Submit quotation requests and inquiries
- **WhatsApp Integration**: Direct WhatsApp contact widget for instant communication
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop
- **SEO Optimized**: Built-in SEO components for better search engine visibility

### Admin Features
- **Admin Dashboard**: Manage products, categories, and orders
- **Authentication**: Secure login system with JWT tokens
- **Billing System**: Generate bills and invoices for customers
- **Inventory Management**: Track product stock and availability

## SEO (search engines)

- **Static shell**: `public/index.html` includes the default `<title>` and meta description so crawlers see real text before JavaScript runs.
- **Per-route meta**: `src/components/SEO.js` (react-helmet-async) updates title, description, keywords, Open Graph, and Twitter cards on each page.
- **Next.js / SSR**: This project is a **Create React App** SPA. For full server-side rendering or static generation (e.g. all content in the first HTML response), you would migrate to **Next.js** or add a prerender step (e.g. `react-snap`). The setup above is the standard CRA approach for SEO.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: React Router DOM 6.30.1
- **HTTP Client**: Axios 1.7.7
- **SEO**: React Helmet Async 2.0.5
- **Build Tool**: Create React App (React Scripts 5.0.1)
- **Testing**: React Testing Library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **Backend API** running on `http://localhost:8080/api` (see [API Documentation](./API.md))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stone-tiles-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```
   **Important**: Set `PORT=3001` to match your backend CORS configuration. See [QUICK_FIX_CORS.md](./QUICK_FIX_CORS.md) for details.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001) (or the port you configured)

## 📜 Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode. See the [testing documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: This is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 📁 Project Structure

```
stone-tiles-website/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   │   ├── CartModal.js   # Shopping cart modal
│   │   ├── Calculator.js  # Price calculator
│   │   ├── InquiryForm.js # Inquiry form
│   │   ├── LoginModal.js  # Login modal
│   │   ├── SEO.js         # SEO component
│   │   ├── ShippingEstimator.js
│   │   └── WhatsAppWidget.js
│   ├── context/           # React Context
│   │   └── CartContext.js # Shopping cart state
│   ├── landing/           # Landing page components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── HeroSlider.js
│   │   ├── CategoryGrid.js
│   │   ├── MaterialShowcase.js
│   │   ├── LocateStore.js
│   │   └── ContactCTA.js
│   ├── pages/             # Page components
│   │   ├── Home.js
│   │   ├── ProductList.js
│   │   ├── Cart.js
│   │   └── AdminDashboard.js
│   ├── services/          # API services
│   │   ├── authApi.js
│   │   ├── billingApi.js
│   │   ├── categoriesApi.js
│   │   ├── heroApi.js
│   │   └── inventoryApi.js
│   ├── App.js             # Main app component
│   ├── App.css
│   ├── index.js           # Entry point
│   └── index.css
├── package.json
├── README.md
├── SETUP.md               # Detailed setup instructions
├── API.md                 # API documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── DATABASE_SCHEMA.md     # Database schema documentation
└── .env.example           # Environment variables template
```

## 🔌 API Integration

The application communicates with a backend API. Ensure your backend is running on `http://localhost:8080/api` before starting the frontend.

### API Endpoints Used:
- `GET /api/categories` - Fetch product categories
- `GET /api/inventory` - Fetch product inventory
- `GET /api/hero-slides` - Fetch hero slider content
- `POST /api/auth/login` - User authentication
- `POST /api/bills` - Submit billing information

For detailed API documentation, see [API.md](./API.md).

## 🗄️ Database

The application uses a MySQL/MariaDB database. For the complete database schema, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md).

Key tables:
- `categories` - Product categories
- `products` - Product information
- `customers` - Customer data
- `bills` - Billing/invoice records
- `inquiries` - Customer inquiries

## 🎨 Key Features Explained

### Shopping Cart
- Add products with custom square footage
- Real-time price calculation
- Persistent cart (localStorage)
- Tax and discount calculation
- Customer information collection

### Product Filtering
- Filter by category (room type, material type)
- Filter by color
- Filter by price range
- Search by product name

### Authentication
- JWT-based authentication
- Token stored in localStorage
- Protected routes for admin dashboard
- Automatic token refresh

## 🔒 Security Notes

- Access tokens are stored in `localStorage` (consider using httpOnly cookies for production)
- API endpoints should implement proper CORS policies
- Admin routes should be protected on the backend
- Sensitive data should never be exposed in client-side code

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Options
- **Netlify**: Connect your Git repository and deploy automatically
- **Vercel**: Deploy with zero configuration
- **AWS S3 + CloudFront**: Static site hosting
- **Traditional Hosting**: Upload the `build` folder to your web server

### Environment Variables
Make sure to set the correct API base URL for production:
```
REACT_APP_API_BASE_URL=https://your-api-domain.com/api
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Documentation

- [Setup Guide](./SETUP.md) - Detailed installation and configuration
- [Quick CORS Fix](./QUICK_FIX_CORS.md) - **Quick solution for CORS errors**
- [CORS Troubleshooting](./CORS_TROUBLESHOOTING.md) - Complete CORS error guide
- [API Documentation](./API.md) - Complete API reference
- [Database Schema](./DATABASE_SCHEMA.md) - Database structure
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute
- [Categories API Spec](./CATEGORIES_API_SPEC.md) - Categories API details
- [Login API Spec](./LOGIN_API_SPEC.md) - Authentication API details
- [Slug Explanation](./SLUG_EXPLANATION.md) - URL slug documentation

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is private and proprietary. All rights reserved.

## 👥 Support

For support, please contact:
- **Phone**: +91 81077 07064
- **WhatsApp**: Available via the website widget
- **Email**: Contact through the inquiry form on the website

## 🗺️ Roadmap

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Product comparison feature

## 📊 Project Status

**Current Version**: 0.1.0  
**Status**: Active Development  
**Last Updated**: 2024

---

**Built with ❤️ for Kataria Stone World**
