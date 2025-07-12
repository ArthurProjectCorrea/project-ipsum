# 🎨 @arthurcorreadev/components-core

## 📋 Overview
Core components library for Arthur Correa Dev projects. This package provides a comprehensive set of reusable React components with TypeScript support and modern styling capabilities.

## 🚀 Installation

```bash
npm install @arthurcorreadev/components-core
# or
pnpm add @arthurcorreadev/components-core
# or
yarn add @arthurcorreadev/components-core
```

## 🏗️ Architecture
- **Framework**: React 18+ with TypeScript
- **Styling**: Class Variance Authority for type-safe component variants
- **Utilities**: clsx for conditional styling
- **Build**: Tsup for optimal bundling
- **Design Philosophy**: Composable, accessible, and performant

## 📦 Components

### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@arthurcorreadev/components-core";

<Button variant="default" size="md">
  Click me
</Button>

<Button variant="destructive" size="lg">
  Delete
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>
```

**Props:**
- `variant`: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
- `size`: `default` | `sm` | `lg` | `icon`

### Card
Clean card container for content organization.

```tsx
import { Card } from "@arthurcorreadev/components-core";

<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Input
Form input component with consistent styling.

```tsx
import { Input } from "@arthurcorreadev/components-core";

<Input 
  type="email" 
  placeholder="Enter your email"
  className="w-full"
/>
```

### Modal
Overlay modal for dialogs and popups.

```tsx
import { Modal, useModal } from "@arthurcorreadev/components-core";

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();
  
  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is a modal dialog</p>
      </Modal>
    </>
  );
}
```

### Toast
Notification toast messages.

```tsx
import { Toast, useToast } from "@arthurcorreadev/components-core";

function MyComponent() {
  const { toasts, showToast, hideToast } = useToast();
  
  const handleClick = () => {
    showToast("Success message!", "success");
  };
  
  return (
    <>
      <Button onClick={handleClick}>Show Toast</Button>
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  );
}
```

## 🪝 Hooks

### useModal
Hook for managing modal state.

```tsx
const { isOpen, openModal, closeModal } = useModal();
```

### useToast
Hook for managing toast notifications.

```tsx
const { toasts, showToast, hideToast } = useToast();
```

## 🎨 Styling

### Provider Setup
Wrap your app with the ComponentsProvider for optimal styling.

```tsx
import { ComponentsProvider } from "@arthurcorreadev/components-core";

function App() {
  return (
    <ComponentsProvider>
      <YourApp />
    </ComponentsProvider>
  );
}
```

### Custom Styling
All components accept className props for customization.

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Button
</Button>
```

### Utility Function
Use the included `cn` utility for conditional styling.

```tsx
import { cn } from "@arthurcorreadev/components-core";

const className = cn(
  "base-class",
  condition && "conditional-class",
  anotherCondition ? "true-class" : "false-class"
);
```

## 🔧 TypeScript Support

All components come with full TypeScript definitions.

```tsx
import type { ButtonProps, CardProps } from "@arthurcorreadev/components-core";

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}
```

## 🧪 Testing

Components are designed to be easily testable.

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@arthurcorreadev/components-core";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

## 📚 Best Practices

### Composition Pattern
Use components together for complex interfaces.

```tsx
<Card className="p-6 max-w-md">
  <h2 className="mb-4">Login Form</h2>
  <div className="space-y-4">
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    <Button className="w-full">Sign In</Button>
  </div>
</Card>
```

### Accessibility
Components include proper ARIA attributes and semantic HTML.

```tsx
<Button 
  aria-label="Close dialog"
  onClick={closeModal}
>
  ×
</Button>
```

### Performance
Components are optimized with React.forwardRef and minimal re-renders.

## 📖 API Reference

### Component Props
All components extend their respective HTML element props:
- `Button` extends `HTMLButtonElement`
- `Card` extends `HTMLDivElement`
- `Input` extends `HTMLInputElement`

### Styling Classes
Components use a consistent class naming convention:
- Base styles for functionality
- Variant classes for appearance
- Size classes for dimensions
- State classes for interactions

## 🔄 Changelog

### v0.1.0
- Initial release
- Core components: Button, Card, Input, Modal, Toast
- Hooks: useModal, useToast
- TypeScript support
- Class Variance Authority integration

## 🤝 Contributing

This package is part of the Arthur Correa Dev ecosystem. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **GitHub**: [template-project](https://github.com/ArthurProjectCorrea/template-project)
- **NPM**: [@arthurcorreadev/components-core](https://www.npmjs.com/package/@arthurcorreadev/components-core)
- **Author**: [Arthur Correa](https://arthurcorrea.dev)

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Use the `components` label for component-specific issues
- Include code examples and error messages
