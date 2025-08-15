import { describe, it, expect } from 'vitest';
import {
	createTestStore,
	renderWithProviders,
	mockBook,
	mockBooks,
	mockAuthor,
	mockGenre,
	mockPublisher,
} from '../utils';

// Simple test component for testing renderWithProviders
const TestComponent = () => <div data-testid="test-component">Test</div>;

describe('Test Utilities', () => {
	describe('createTestStore', () => {
		it('should create a store with correct structure', () => {
			const store = createTestStore();
			const state = store.getState();

			expect(store).toBeDefined();
			expect(typeof store.dispatch).toBe('function');
			expect(typeof store.getState).toBe('function');
			expect(state).toBeDefined();
		});

		it('should create a store with API reducers', () => {
			const store = createTestStore();
			const state = store.getState();

			// Check that the store has the expected structure
			// The actual property names depend on the API configuration
			expect(state).toHaveProperty('baseApi');
			expect(state).toHaveProperty('booksApi');
		});
	});

	describe('renderWithProviders', () => {
		it('should render component with providers', () => {
			const { getByTestId } = renderWithProviders(<TestComponent />);

			expect(getByTestId('test-component')).toBeInTheDocument();
		});

		it('should return store in result', () => {
			const { store } = renderWithProviders(<TestComponent />);

			expect(store).toBeDefined();
			expect(typeof store.dispatch).toBe('function');
		});

		it('should accept custom store', () => {
			const customStore = createTestStore();
			const { store } = renderWithProviders(<TestComponent />, {
				store: customStore,
			});

			expect(store).toBe(customStore);
		});

		it('should render with default options when no options provided', () => {
			const { getByTestId } = renderWithProviders(<TestComponent />);

			expect(getByTestId('test-component')).toBeInTheDocument();
		});
	});

	describe('Mock Data', () => {
		describe('mockBook', () => {
			it('should have correct structure', () => {
				expect(mockBook).toHaveProperty('id');
				expect(mockBook).toHaveProperty('title');
				expect(mockBook).toHaveProperty('isbn');
				expect(mockBook).toHaveProperty('publicationYear');
				expect(mockBook).toHaveProperty('price');
				expect(mockBook).toHaveProperty('author');
				expect(mockBook).toHaveProperty('genre');
				expect(mockBook).toHaveProperty('publisher');
			});

			it('should have correct data types', () => {
				expect(typeof mockBook.id).toBe('number');
				expect(typeof mockBook.title).toBe('string');
				expect(typeof mockBook.isbn).toBe('string');
				expect(typeof mockBook.publicationYear).toBe('number');
				expect(typeof mockBook.price).toBe('number');
				expect(typeof mockBook.author).toBe('object');
				expect(typeof mockBook.genre).toBe('object');
				expect(typeof mockBook.publisher).toBe('object');
			});

			it('should have valid values', () => {
				expect(mockBook.id).toBe(1);
				expect(mockBook.title).toBe('Test Book');
				expect(mockBook.isbn).toBe('1234567890');
				expect(mockBook.publicationYear).toBe(2023);
				expect(mockBook.price).toBe(29.99);
			});
		});

		describe('mockAuthor', () => {
			it('should have correct structure', () => {
				expect(mockAuthor).toHaveProperty('id');
				expect(mockAuthor).toHaveProperty('name');
				expect(mockAuthor).toHaveProperty('biography');
			});

			it('should have correct data types', () => {
				expect(typeof mockAuthor.id).toBe('number');
				expect(typeof mockAuthor.name).toBe('string');
				expect(typeof mockAuthor.biography).toBe('string');
			});

			it('should have valid values', () => {
				expect(mockAuthor.id).toBe(1);
				expect(mockAuthor.name).toBe('Test Author');
				expect(mockAuthor.biography).toBe('Test biography');
			});
		});

		describe('mockGenre', () => {
			it('should have correct structure', () => {
				expect(mockGenre).toHaveProperty('id');
				expect(mockGenre).toHaveProperty('name');
			});

			it('should have correct data types', () => {
				expect(typeof mockGenre.id).toBe('number');
				expect(typeof mockGenre.name).toBe('string');
			});

			it('should have valid values', () => {
				expect(mockGenre.id).toBe(1);
				expect(mockGenre.name).toBe('Fiction');
			});
		});

		describe('mockPublisher', () => {
			it('should have correct structure', () => {
				expect(mockPublisher).toHaveProperty('id');
				expect(mockPublisher).toHaveProperty('name');
				expect(mockPublisher).toHaveProperty('address');
			});

			it('should have correct data types', () => {
				expect(typeof mockPublisher.id).toBe('number');
				expect(typeof mockPublisher.name).toBe('string');
				expect(typeof mockPublisher.address).toBe('string');
			});

			it('should have valid values', () => {
				expect(mockPublisher.id).toBe(1);
				expect(mockPublisher.name).toBe('Test Publisher');
				expect(mockPublisher.address).toBe('Test Address');
			});
		});

		describe('mockBooks', () => {
			it('should be an array', () => {
				expect(Array.isArray(mockBooks)).toBe(true);
			});

			it('should contain mockBook', () => {
				expect(mockBooks).toContain(mockBook);
			});

			it('should have correct length', () => {
				expect(mockBooks).toHaveLength(1);
			});
		});
	});
});
