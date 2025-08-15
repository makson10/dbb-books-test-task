# Frontend Testing Guide

This document explains how to run tests and write new tests for the frontend application.

## Testing Framework

We use **Vitest** as our testing framework, which provides:

- Fast execution with Vite integration
- Jest-compatible API
- Built-in TypeScript support
- Excellent React Testing Library integration

## Running Tests

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Test Structure

```
src/
├── __tests__/           # Test files
├── components/          # Component tests
├── stores/             # Store and API tests
├── types/              # Type validation tests
└── test/               # Test utilities and setup
    ├── setup.ts        # Test environment setup
    ├── utils.tsx       # Test utilities and providers
    └── __tests__/      # Tests for test utilities
```

## Writing Tests

### Component Tests

Use `renderWithProviders` from `src/test/utils.tsx` to render components with Redux and Router providers:

```tsx
import { renderWithProviders } from '../test/utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
	it('renders correctly', () => {
		const { getByText } = renderWithProviders(<MyComponent />);
		expect(getByText('Hello')).toBeInTheDocument();
	});
});
```

### API Tests

Test RTK Query endpoints by mocking the hooks:

```tsx
vi.mock('../../../stores/api/booksApi', () => ({
	useGetBooksQuery: vi.fn(),
}));

const mockUseGetBooksQuery = vi.mocked(useGetBooksQuery);

it('fetches books successfully', () => {
	mockUseGetBooksQuery.mockReturnValue({
		data: mockBooks,
		isLoading: false,
		error: undefined,
	} as any);

	// Test component behavior
});
```

### Store Tests

Test Redux store configuration and reducers:

```tsx
import { store } from '../store';

describe('Store', () => {
	it('has correct initial state', () => {
		const state = store.getState();
		expect(state).toHaveProperty('booksApi');
	});
});
```

### Hook Tests

Test custom hooks using `renderHook`:

```tsx
import { renderHook } from '@testing-library/react';
import { useAppSelector } from '../hooks';

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

it('returns state correctly', () => {
	const { result } = renderHook(() => useAppSelector((state) => state), {
		wrapper,
	});
	expect(result.current).toBeDefined();
});
```

## Test Utilities

### `renderWithProviders`

Renders components with Redux Provider and Router:

```tsx
const { store, ...renderResult } = renderWithProviders(<MyComponent />, {
	store: customStore,
	preloadedState: {
		/* initial state */
	},
});
```

### `createTestStore`

Creates a test Redux store:

```tsx
const store = createTestStore();
```

### Mock Data

Use predefined mock data for consistent testing:

```tsx
import { mockBook, mockBooks, mockAuthor } from '../test/utils';

// Use in tests
const testBook = mockBook;
const testBooks = mockBooks;
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Make test names clear about what they're testing
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
4. **Mock External Dependencies**: Mock APIs, timers, and browser APIs
5. **Test Edge Cases**: Include tests for error states, loading states, and edge cases
6. **Keep Tests Simple**: Each test should verify one specific behavior

## Common Testing Patterns

### Testing Async Operations

```tsx
it('handles async data loading', async () => {
	const { findByText } = renderWithProviders(<AsyncComponent />);

	await findByText('Loaded Data');
	expect(screen.getByText('Loaded Data')).toBeInTheDocument();
});
```

### Testing User Interactions

```tsx
it('responds to user input', () => {
	const { getByRole } = renderWithProviders(<FormComponent />);

	const input = getByRole('textbox');
	fireEvent.change(input, { target: { value: 'new value' } });

	expect(input).toHaveValue('new value');
});
```

### Testing Error States

```tsx
it('displays error message on failure', () => {
	mockApi.mockRejectedValue(new Error('API Error'));

	renderWithProviders(<ErrorComponent />);

	expect(screen.getByText('Error occurred')).toBeInTheDocument();
});
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure `tsconfig.test.json` is properly configured
2. **Mock Issues**: Check that mocks are properly set up before each test
3. **Provider Errors**: Use `renderWithProviders` for components that need context
4. **Async Test Failures**: Use `waitFor` or `findBy` for async operations

### Debugging Tests

- Use `screen.debug()` to see the rendered output
- Add `console.log` statements to understand test flow
- Use the Vitest UI (`npm run test:ui`) for interactive debugging

## Coverage Goals

- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **API Layer**: 85%+ coverage
- **Overall**: 80%+ coverage

Run `npm run test:coverage` to check current coverage levels.
