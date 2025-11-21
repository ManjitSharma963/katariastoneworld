# Setup Guide

This guide will help you set up the Stone Tiles Website project on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

1. **Node.js** (v14.0.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (for cloning the repository)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

3. **Code Editor** (recommended: VS Code)
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Backend Requirements

- **Backend API Server** running on `http://localhost:8080/api`
- **MySQL/MariaDB Database** (see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md))

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd stone-tiles-website
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- React and React DOM
- React Router DOM
- Axios
- React Helmet Async
- Testing libraries
- And other dependencies

**Note**: If you encounter errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory (manually create the file):
   ```bash
   # Windows (Command Prompt)
   type nul > .env
   
   # Windows (PowerShell)
   New-Item -Path .env -ItemType File
   
   # Linux/Mac
   touch .env
   ```

2. Edit `.env` with your configuration:
   ```env
   # Set port to 3001 to match backend CORS configuration
   PORT=3001
   
   # API Base URL
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

   **Important**: If you're getting CORS errors, set `PORT=3001` to match your backend's CORS configuration.
   
   For production:
   ```env
   REACT_APP_API_BASE_URL=https://your-api-domain.com/api
   ```

### Step 4: Verify Backend API

Before starting the frontend, ensure your backend API is running:

```bash
# Test the API endpoint
curl http://localhost:8080/api/categories
```

You should receive a JSON response with categories data.

### Step 5: Start the Development Server

```bash
npm start
```

The application will open automatically at [http://localhost:3000](http://localhost:3000)

## Configuration

### API Base URL

The default API base URL is `http://localhost:8080/api`. To change it:

1. **Development**: Edit `src/services/*Api.js` files and update `API_BASE_URL`
2. **Production**: Set environment variable `REACT_APP_API_BASE_URL`

### Proxy Configuration (Optional)

If you need to proxy API requests, create `src/setupProxy.js`:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
```

### WhatsApp Widget Configuration

Edit `src/App.js` to change WhatsApp number:

```javascript
<WhatsAppWidget phone="918107707064" message="Hi! I am interested in tiles in Gurgaon." />
```

## Running the Application

### Development Mode

```bash
npm start
```

- Runs on `http://localhost:3000`
- Hot reload enabled
- Shows lint errors in console
- Source maps enabled

### Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

To test the production build locally:

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

### Running Tests

```bash
npm test
```

Runs tests in watch mode. Press `a` to run all tests.

## Database Setup

1. **Create Database**:
   ```sql
   CREATE DATABASE stone_tiles_db;
   USE stone_tiles_db;
   ```

2. **Run Schema Script**:
   ```bash
   mysql -u your_username -p stone_tiles_db < database_schema.sql
   ```

3. **Insert Sample Data** (optional):
   ```bash
   mysql -u your_username -p stone_tiles_db < categories_insert_queries.sql
   mysql -u your_username -p stone_tiles_db < hero_slides_insert_queries.sql
   ```

For detailed database schema, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md).

## Troubleshooting

### Port Already in Use

If port 3000 (or 3001) is already in use:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill
```

Or set a different port in `.env` file:
```env
PORT=3002
```

**Note**: Make sure the port matches your backend CORS configuration. See [CORS_TROUBLESHOOTING.md](./CORS_TROUBLESHOOTING.md) for details.

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Errors

1. **Check if backend is running**:
   ```bash
   curl http://localhost:8080/api/categories
   ```

2. **Check CORS settings** on backend - See [CORS_TROUBLESHOOTING.md](./CORS_TROUBLESHOOTING.md)
   - Backend must allow your frontend origin (e.g., `http://localhost:3001`)
   - If getting CORS errors, ensure `PORT=3001` in `.env` matches backend CORS config

3. **Verify API_BASE_URL** in service files
4. **Check browser console** for detailed error messages
5. **Verify port matches**: Frontend port must match what backend CORS allows

### Build Errors

```bash
# Clear build cache
rm -rf build
npm run build
```

### Authentication Issues

1. **Clear localStorage**:
   ```javascript
   localStorage.clear();
   ```

2. **Check token expiration** in browser DevTools
3. **Verify login endpoint** is working:
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

### Common Issues

#### Issue: `npm start` fails with EADDRINUSE
**Solution**: Kill the process using port 3000 or use a different port.

#### Issue: API calls return CORS errors
**Solution**: Configure CORS on your backend API server.

#### Issue: Images not loading
**Solution**: 
- Check image URLs in database
- Verify image paths are accessible
- Check browser console for 404 errors

#### Issue: Cart not persisting
**Solution**: 
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check for JavaScript errors in console

## Development Tips

### Hot Reload

The app uses React's hot reload feature. Changes to components will automatically refresh the browser.

### Debugging

1. **React DevTools**: Install [React Developer Tools](https://react.dev/learn/react-developer-tools) browser extension
2. **Browser Console**: Check for errors and warnings
3. **Network Tab**: Monitor API requests and responses
4. **Components**: Use `console.log()` for debugging

### Code Formatting

Consider using Prettier for code formatting:

```bash
npm install --save-dev prettier
```

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

## Next Steps

After setup:

1. Review [API.md](./API.md) for API integration details
2. Check [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database structure
3. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
4. Explore the codebase starting with `src/App.js`

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review error messages in browser console
3. Check backend API logs
4. Verify all prerequisites are installed correctly
5. Consult the documentation files in the project root

---

**Happy Coding! 🚀**

