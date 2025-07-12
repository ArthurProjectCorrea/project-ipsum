# 🧩 UI Package Documentation

## 📋 Overview
Shared UI components library for the monorepo template.

## 🏗️ Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Build Tool**: Tsup for fast bundling
- **Design System**: Consistent tokens and patterns

## 📁 Project Structure
```
packages/ui/
├── src/                    # Source code
│   ├── card.tsx           # Card component
│   ├── gradient.tsx       # Gradient component
│   ├── turborepo-logo.tsx # Logo component
│   └── styles.css         # Global styles
├── docs/                  # Project documentation
├── package.json           # Dependencies and build config
├── tsconfig.json          # TypeScript configuration
├── turbo.json             # Turbo configuration
└── eslint.config.mjs      # ESLint configuration
```

## 🚀 Development

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development (watch mode)
pnpm dev

# Build library
pnpm build

# Lint code
pnpm lint

# Type checking
pnpm check-types
```

### Available Scripts
- `dev` - Build in watch mode for development
- `build` - Build production library
- `lint` - Run ESLint
- `check-types` - TypeScript type checking

## 🧩 Components

### Creating New Components

#### Component Template
```tsx
// src/my-component.tsx
import React from "react";
import type { ComponentProps } from "react";

export interface MyComponentProps extends ComponentProps<"div"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const MyComponent = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: MyComponentProps) => {
  const baseClasses = "inline-flex items-center justify-center";
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-900",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
```

#### Export from Index
```tsx
// src/index.ts
export { MyComponent } from "./my-component";
export type { MyComponentProps } from "./my-component";
```

### Existing Components

#### Card Component
```tsx
import { Card } from "@repo/ui";

<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

#### Gradient Component
```tsx
import { Gradient } from "@repo/ui";

<Gradient>
  <h1>Text with gradient background</h1>
</Gradient>
```

#### Turborepo Logo
```tsx
import { TurborepoLogo } from "@repo/ui";

<TurborepoLogo />
```

## 🎨 Styling

### Design Tokens
Define consistent design tokens for:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

### Tailwind Configuration
Uses shared configuration from `@repo/tailwind-config`

### CSS Architecture
```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Component-specific styles */
.ui-button {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors;
}

.ui-card {
  @apply rounded-lg border bg-card text-card-foreground shadow-sm;
}
```

### Component Variants
Use `class-variance-authority` for type-safe variant styling:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button
    className={buttonVariants({ variant, size, className })}
    {...props}
  />
);
```

## 🧪 Testing

### Component Testing
```tsx
// src/__tests__/my-component.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {
  it("renders children correctly", () => {
    render(<MyComponent>Test content</MyComponent>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<MyComponent variant="secondary">Test</MyComponent>);
    const element = screen.getByText("Test");
    expect(element).toHaveClass("bg-gray-200");
  });
});
```

### Visual Testing with Storybook
```tsx
// src/stories/my-component.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "../my-component";

const meta: Meta<typeof MyComponent> = {
  title: "UI/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};
```

## 📦 Building and Distribution

### Build Configuration
```json
// package.json
{
  "name": "@repo/ui",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

### Tsup Configuration
```typescript
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

## 🔧 TypeScript Configuration

### Base Configuration
Extends from `@repo/typescript-config/react-library.json`

### Type Exports
```tsx
// src/types.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export type ComponentSize = "sm" | "md" | "lg";
export type ComponentVariant = "primary" | "secondary" | "destructive";
```

## 📚 Best Practices

### Component Design
1. **Composition over Configuration**: Prefer composable components
2. **Prop Forwarding**: Forward HTML attributes to underlying elements
3. **Accessible by Default**: Include ARIA attributes and semantic HTML
4. **Performance**: Use React.memo for expensive components

### API Design
```tsx
// Good: Composable API
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <DialogDescription>Description</DialogDescription>
  </DialogContent>
</Dialog>

// Avoid: Monolithic API
<Dialog
  trigger="Open"
  title="Title"
  description="Description"
  content={<div>...</div>}
/>
```

### Accessibility
```tsx
// Include proper ARIA attributes
<button
  aria-expanded={isOpen}
  aria-haspopup="true"
  aria-controls="menu"
>
  Menu
</button>

// Use semantic HTML
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

### Documentation
- Use JSDoc for component documentation
- Include usage examples
- Document prop types and variants
- Provide accessibility notes

## 🚀 Usage in Applications

### Installation
```bash
# In workspace apps
pnpm add @repo/ui
```

### Import Styles
```tsx
// app/layout.tsx or _app.tsx
import "@repo/ui/styles.css";
```

### Component Usage
```tsx
import { Card, Button } from "@repo/ui";

export default function HomePage() {
  return (
    <Card className="p-6">
      <h1>Welcome</h1>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

## 🐛 Troubleshooting

### Common Issues
1. **CSS Not Loading**: Ensure styles are imported in your app
2. **Type Errors**: Check TypeScript configuration and exports
3. **Build Errors**: Verify dependencies and peer dependencies

### Debug Build
```bash
# Verbose build output
pnpm build --verbose
```

## 📞 Support
For issues specific to UI components, create an issue with the `ui` label.
