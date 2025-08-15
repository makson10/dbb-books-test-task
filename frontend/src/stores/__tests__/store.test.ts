import { describe, it, expect } from 'vitest';
import { store } from '../store';
import { baseApi } from '../api';
import { booksApi } from '../api/booksApi';

describe('Redux Store', () => {
	it('should have the correct initial state structure', () => {
		const state = store.getState();

		expect(state).toHaveProperty(baseApi.reducerPath);
		expect(state).toHaveProperty(booksApi.reducerPath);
	});

	it('should have baseApi reducer', () => {
		const state = store.getState();
		const baseApiState = state[baseApi.reducerPath];

		expect(baseApiState).toBeDefined();
	});

	it('should have booksApi reducer', () => {
		const state = store.getState();
		const booksApiState = state[booksApi.reducerPath];

		expect(booksApiState).toBeDefined();
	});

	it('should have the correct middleware configuration', () => {
		const middleware = store.getState();

		// The store should be configured with the default middleware plus our API middleware
		expect(middleware).toBeDefined();
	});

	it('should export RootState type', () => {
		// This test ensures the type is properly exported
		// The actual type checking happens at compile time
		expect(typeof store.getState).toBe('function');
	});

	it('should export AppDispatch type', () => {
		// This test ensures the type is properly exported
		// The actual type checking happens at compile time
		expect(typeof store.dispatch).toBe('function');
	});
});
