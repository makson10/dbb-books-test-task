import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import { booksApi } from './api/booksApi';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware, booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
