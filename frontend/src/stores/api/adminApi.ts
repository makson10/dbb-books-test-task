import Cookies from 'js-cookie';
import { baseApi as api } from './baseApi';
import type {
	CreateAuthorApiArg,
	CreateAuthorApiResponse,
	CreateGenreApiArg,
	CreateGenreApiResponse,
	CreatePublisherApiArg,
	CreatePublisherApiResponse,
} from './baseApi';

const injectedAdminApi = api.injectEndpoints({
	endpoints: (build) => ({
		createAuthor: build.mutation<CreateAuthorApiResponse, CreateAuthorApiArg>({
			query: (queryArg) => ({
				url: `/authors`,
				method: 'POST',
				body: queryArg.createAuthor,
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			}),
			invalidatesTags: ['authors'],
		}),
		createGenre: build.mutation<CreateGenreApiResponse, CreateGenreApiArg>({
			query: (queryArg) => ({
				url: `/genres`,
				method: 'POST',
				body: queryArg.createGenre,
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			}),
			invalidatesTags: ['genres'],
		}),
		createPublisher: build.mutation<
			CreatePublisherApiResponse,
			CreatePublisherApiArg
		>({
			query: (queryArg) => ({
				url: `/publishers`,
				method: 'POST',
				body: queryArg.createPublisher,
				headers: { Authorization: `Bearer ${Cookies.get('token')}` },
			}),
			invalidatesTags: ['publishers'],
		}),
	}),
	overrideExisting: true,
});

export { injectedAdminApi as adminApi };

export const {
	useCreateAuthorMutation,
	useCreateGenreMutation,
	useCreatePublisherMutation,
} = injectedAdminApi;
