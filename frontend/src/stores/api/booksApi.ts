import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BookWithRelationsDto } from './baseApi';

export interface GetBooksParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	order?: string;
}

export interface BookCountResponse {
	count: number;
}

export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
	tagTypes: ['books'],
	endpoints: (build) => ({
		getBooks: build.query<BookWithRelationsDto[], GetBooksParams>({
			query: (params) => {
				const searchParams = new URLSearchParams();

				if (params.page) searchParams.append('page', params.page.toString());
				if (params.limit) searchParams.append('limit', params.limit.toString());
				if (params.sortBy) searchParams.append('sortBy', params.sortBy);
				if (params.order) searchParams.append('order', params.order);

				const queryString = searchParams.toString();
				return {
					url: `/books${queryString ? `?${queryString}` : ''}`,
					method: 'GET',
				};
			},
			providesTags: ['books'],
		}),
		getBookCount: build.query<BookCountResponse, void>({
			query: () => ({
				url: '/books/count',
				method: 'GET',
			}),
			providesTags: ['books'],
		}),
	}),
});

export const { useGetBooksQuery, useGetBookCountQuery } = booksApi;
