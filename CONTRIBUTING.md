# Contributing Guidelines

Thank you for your interest in contributing to the Stone Tiles Website project! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/stone-tiles-website.git
   cd stone-tiles-website
   ```

3. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start development server**:
   ```bash
   npm start
   ```

## Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `style/` - Code style changes (formatting, etc.)

Examples:
- `feature/add-product-reviews`
- `fix/cart-calculation-bug`
- `docs/update-api-documentation`

### Making Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes** (see [Commit Guidelines](#commit-guidelines))

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### JavaScript/React

- Use **functional components** with hooks
- Use **ES6+** syntax
- Follow **React best practices**
- Use **meaningful variable names**
- Add **comments** for complex logic

#### Component Structure

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Component
export default function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 6. PropTypes (if needed)
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};
```

### Code Style

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **semicolons**
- Maximum line length: **100 characters**
- Use **camelCase** for variables and functions
- Use **PascalCase** for components

### File Naming

- Components: `PascalCase.js` (e.g., `CartModal.js`)
- Utilities: `camelCase.js` (e.g., `formatPrice.js`)
- Constants: `UPPER_SNAKE_CASE.js` (e.g., `API_CONSTANTS.js`)

### CSS/Styling

- Use **CSS modules** or **styled-components** for component-specific styles
- Follow **BEM naming convention** if using regular CSS
- Keep styles organized and maintainable

### API Services

- Keep API calls in `src/services/` directory
- Use consistent error handling
- Add JSDoc comments for functions

Example:
```javascript
/**
 * Fetch all categories from the API
 * @param {string} categoryType - Optional category type filter
 * @returns {Promise<Array>} Array of categories
 */
export const fetchCategories = async (categoryType = null) => {
  try {
    // API call
  } catch (error) {
    // Error handling
  }
};
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat(cart): add discount calculation functionality

fix(api): resolve CORS error in categories endpoint

docs(readme): update installation instructions

refactor(components): simplify CartModal component structure
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused (one feature/fix per commit)
- Test before committing
- Don't commit commented-out code
- Don't commit sensitive information (API keys, passwords)

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Test manually** in different browsers
5. **Check for linting errors**
6. **Update CHANGELOG.md** (if applicable)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Tested in multiple browsers

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. **Automated checks** must pass (tests, linting)
2. **Code review** by maintainers
3. **Address feedback** and update PR
4. **Approval** from at least one maintainer
5. **Merge** to main branch

## Testing

### Writing Tests

- Write tests for new features
- Update tests when fixing bugs
- Aim for good test coverage
- Use React Testing Library

Example:
```javascript
import { render, screen } from '@testing-library/react';
import CartModal from './CartModal';

test('renders cart modal when open', () => {
  render(<CartModal isOpen={true} onClose={() => {}} />);
  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation

### Code Documentation

- Add **JSDoc comments** for functions
- Document **complex logic**
- Explain **why**, not just **what**

### README Updates

- Update README.md for significant changes
- Add new features to the Features section
- Update installation steps if needed

### API Documentation

- Update [API.md](./API.md) for API changes
- Document new endpoints
- Include request/response examples

## Project-Specific Guidelines

### Component Guidelines

- Keep components **small and focused**
- Extract reusable logic into **custom hooks**
- Use **Context API** for global state (CartContext)
- Prefer **composition** over inheritance

### State Management

- Use **React hooks** (useState, useEffect, useContext)
- Use **Context API** for cart state
- Keep state as **local as possible**
- Avoid prop drilling

### API Integration

- All API calls in `src/services/`
- Use **async/await** for promises
- Implement **error handling**
- Add **loading states**

### Performance

- Use **React.memo** for expensive components
- Implement **lazy loading** for routes
- Optimize **images** (use appropriate formats)
- Minimize **re-renders**

## Questions?

If you have questions:

1. Check existing documentation
2. Search existing issues/PRs
3. Ask in discussions or create an issue
4. Contact maintainers

## Thank You!

Your contributions make this project better. Thank you for taking the time to contribute! 🎉

---

**Happy Contributing! 🚀**

