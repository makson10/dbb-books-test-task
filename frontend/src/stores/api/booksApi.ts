import type { Author, Genre, Publisher } from './baseApi';
import { baseApi as api } from './baseApi';

export interface GetBooksParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	order?: string;
}

export interface BookCountResponse {
	count: number;
}

export type BookWithRelationsDto = {
	id: number;
	title: string;
	isbn: string;
	publishDate: string;
	copiesTotal: number;
	copiesAvailable: number;
	publisherId: number;
	publisher: Publisher;
	authors: Author[];
	genres: Genre[];
};

export const booksApi = api.injectEndpoints({
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
	overrideExisting: true,
});

export const { useGetBooksQuery, useGetBookCountQuery } = booksApi;
