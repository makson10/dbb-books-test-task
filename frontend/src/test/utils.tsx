import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../stores/api';

export const createTestStore = () => {
	return configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
	});
};

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
	preloadedState?: any;
	store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
	ui: ReactElement,
	{
		preloadedState = {},
		store = createTestStore(),
		...renderOptions
	}: CustomRenderOptions = {}
) => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	};

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Mock data for testing
export const mockBook = {
	id: 1,
	title: 'Test Book',
	isbn: '1234567890',
	publicationYear: 2023,
	price: 29.99,
	author: {
		id: 1,
		name: 'Test Author',
		biography: 'Test biography',
	},
	genre: {
		id: 1,
		name: 'Fiction',
	},
	publisher: {
		id: 1,
		name: 'Test Publisher',
		address: 'Test Address',
	},
};

export const mockBooks = [mockBook];

export const mockAuthor = {
	id: 1,
	name: 'Test Author',
	biography: 'Test biography',
};

export const mockGenre = {
	id: 1,
	name: 'Fiction',
};

export const mockPublisher = {
	id: 1,
	name: 'Test Publisher',
	address: 'Test Address',
};
