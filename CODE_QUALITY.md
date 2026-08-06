# Code Quality Guidelines

## Overview
This document outlines the code quality standards and best practices for the MR. Property project.

## Recent Improvements

### Component Organization
- **Extracted Reusable Components**: Created specialized components for property details:
  - `LoadingSpinner`: Centralized loading state UI
  - `PropertyOverview`: Property statistics and overview section
  - `AreaDetails`: Area demographics and information
  - `InvestmentReturns`: Investment return calculations display

### Error Handling
- **Centralized Error Handling**: Created `utils/errorHandling.ts` for consistent error management
- **Error Boundary**: Implemented React Error Boundary for graceful error recovery
- **Removed Console Statements**: Cleaned up production code by removing console.error calls

### Code Structure
- **Route Constants**: Centralized route definitions in `constants/routes.ts` for type-safe navigation
- **Component Modularity**: Broke down large components into smaller, focused modules
- **Type Safety**: Consistent use of TypeScript interfaces and types

## Best Practices

### Component Guidelines
1. **Single Responsibility**: Each component should have one clear purpose
2. **Prop Types**: Always define explicit TypeScript interfaces for props
3. **Reusability**: Extract repeated UI patterns into shared components
4. **Performance**: Use React.lazy() for route-based code splitting

### Code Organization
```
src/
├── components/          # Reusable UI components
│   ├── property/       # Property-specific components
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/            # Base UI components (shadcn/ui)
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # Application constants
└── types/             # TypeScript type definitions
```

### Error Handling
- Use try-catch blocks for async operations
- Display user-friendly error messages
- Log detailed errors only in development
- Never expose sensitive information in error messages

### Performance
- Lazy load route components
- Use proper React keys in lists
- Avoid unnecessary re-renders with memo/useMemo/useCallback
- Optimize images and assets

### Security
- Validate all user inputs with Zod
- Use RLS policies for database access
- Never expose API keys or secrets
- Sanitize HTML content before rendering

## Code Review Checklist
- [ ] Component follows single responsibility principle
- [ ] Props have TypeScript interfaces
- [ ] Error handling is implemented
- [ ] No console.log/error statements in production code
- [ ] Responsive design works on mobile
- [ ] Accessibility considerations (ARIA labels, semantic HTML)
- [ ] Performance optimizations applied
- [ ] Security best practices followed

## Testing
- Test components in isolation
- Test error states and loading states
- Test responsive behavior
- Test accessibility with screen readers

## Future Improvements
- Add unit tests with Vitest
- Implement E2E tests with Playwright
- Add Storybook for component documentation
- Implement automated code quality checks with ESLint rules
- Add performance monitoring
