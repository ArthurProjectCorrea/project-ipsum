# 🌐 Web App Documentation

## 📋 Overview
Next.js frontend application for the monorepo template.

## 🏗️ Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Shared from `@repo/ui` package
- **TypeScript**: Full type safety

## 📁 Project Structure
```
apps/web/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── docs/                  # Project documentation
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
├── postcss.config.js      # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Development

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type checking
pnpm check-types
```

### Available Scripts
- `dev` - Start development server on port 3000
- `build` - Build production application
- `start` - Start production server
- `lint` - Run ESLint
- `check-types` - TypeScript type checking

## 🧩 Components

### Using Shared UI Components
```tsx
import { Card, Button } from "@repo/ui";

export default function HomePage() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Custom Components
Create components in `app/components/` following these patterns:
- Use TypeScript interfaces for props
- Include JSDoc documentation
- Export from index files
- Follow naming conventions

## 🎨 Styling

### Tailwind CSS
- Configuration shared from `@repo/tailwind-config`
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind classes

### Design System
- Colors: Follow the design tokens in `@repo/ui`
- Typography: Use Tailwind typography utilities
- Spacing: Use consistent spacing scale
- Responsive: Mobile-first approach

## 🔗 API Integration

### Backend Communication
```tsx
// Example API call
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

### Unit Tests
- Use Jest and React Testing Library
- Place tests adjacent to components: `component.test.tsx`
- Test user interactions and component behavior

### E2E Tests
- Use Playwright or Cypress
- Test critical user journeys
- Place in `__tests__/e2e/` directory

## 📚 Best Practices

### Code Organization
- Keep components small and focused
- Use custom hooks for shared logic
- Separate business logic from UI components
- Follow the principle of least privilege

### Performance
- Use Next.js Image component for images
- Implement proper code splitting
- Optimize bundle size
- Use React.memo for expensive components

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Test with screen readers
- Ensure keyboard navigation

## 🔧 Configuration

### TypeScript
Extends base configuration from `@repo/typescript-config/nextjs.json`

### ESLint
Uses configuration from `@repo/eslint-config/next-js`

### PostCSS
Configured to work with Tailwind CSS

## 🚀 Deployment

### Build Process
```bash
pnpm build
```

### Environment Variables
Set required environment variables in your deployment platform.

### Static Export (if needed)
```javascript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

## 🐛 Troubleshooting

### Common Issues
1. **Hydration Errors**: Check for SSR/CSR mismatches
2. **Build Errors**: Verify TypeScript types and imports
3. **Style Issues**: Check Tailwind configuration and purging

### Debug Commands
```bash
# Verbose build
pnpm build --debug

# Type checking with verbose output
pnpm check-types --verbose
```

## 📞 Support
For issues specific to the web app, create an issue with the `frontend` label.
