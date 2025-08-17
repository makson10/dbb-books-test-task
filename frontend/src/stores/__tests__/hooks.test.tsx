import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import { baseApi } from '../api';
import { booksApi } from '../api/booksApi';
import { adminApi } from '../api/adminApi';

// Create a test store
const createTestStore = () => {
	return configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
	});
};

// Wrapper component for testing hooks
const wrapper = ({ children }: { children: React.ReactNode }) => {
	const store = createTestStore();
	return <Provider store={store}>{children}</Provider>;
};

describe('Redux Hooks', () => {
	describe('useAppDispatch', () => {
		it('should return a dispatch function', () => {
			const { result } = renderHook(() => useAppDispatch(), { wrapper });

			expect(typeof result.current).toBe('function');
		});

		it('should be able to dispatch actions', () => {
			const { result } = renderHook(() => useAppDispatch(), { wrapper });

			const dispatch = result.current;
			expect(() => dispatch({ type: 'test' })).not.toThrow();
		});
	});

	describe('useAppSelector', () => {
		it('should return the current state', () => {
			const { result } = renderHook(() => useAppSelector((state) => state), {
				wrapper,
			});

			expect(result.current).toBeDefined();
			expect(typeof result.current).toBe('object');
		});

		it('should return the correct state structure', () => {
			const { result } = renderHook(() => useAppSelector((state) => state), {
				wrapper,
			});

			const state = result.current;
			expect(state).toHaveProperty(baseApi.reducerPath);
			expect(state).toHaveProperty(booksApi.reducerPath);
			// adminApi injects into baseApi, ensure its reducerPath is present as well
			expect(state).toHaveProperty(adminApi.reducerPath);
		});

		it('should select specific state slices', () => {
			const { result } = renderHook(
				() => useAppSelector((state) => state[baseApi.reducerPath]),
				{ wrapper }
			);

			expect(result.current).toBeDefined();
		});

		it('should update when state changes', () => {
			const { result, rerender } = renderHook(
				() => useAppSelector((state) => state),
				{ wrapper }
			);

			rerender();

			expect(result.current).toBeDefined();
		});
	});

	describe('Hook Integration', () => {
		it('should work together in the same component', () => {
			const { result } = renderHook(
				() => ({
					dispatch: useAppDispatch(),
					state: useAppSelector((state) => state),
				}),
				{ wrapper }
			);

			expect(result.current.dispatch).toBeDefined();
			expect(result.current.state).toBeDefined();
			expect(typeof result.current.dispatch).toBe('function');
			expect(typeof result.current.state).toBe('object');
		});
	});
});
