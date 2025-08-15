import { describe, it, expect, vi, beforeEach } from 'vitest';
import { booksApi } from '../booksApi';

// Mock the environment variable
vi.mock('import.meta.env', () => ({
	VITE_SERVER_BASE_URL: 'http://localhost:4000',
}));

describe('booksApi', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('API configuration', () => {
		it('should have correct reducerPath', () => {
			expect(booksApi.reducerPath).toBe('booksApi');
		});
	});

	describe('Endpoints', () => {
		it('should have getBooks endpoint', () => {
			expect(booksApi.endpoints.getBooks).toBeDefined();
		});

		it('should have getBookCount endpoint', () => {
			expect(booksApi.endpoints.getBookCount).toBeDefined();
		});
	});

	describe('Exported hooks', () => {
		it('should export useGetBooksQuery hook', () => {
			expect(booksApi.useGetBooksQuery).toBeDefined();
		});

		it('should export useGetBookCountQuery hook', () => {
			expect(booksApi.useGetBookCountQuery).toBeDefined();
		});
	});
});
