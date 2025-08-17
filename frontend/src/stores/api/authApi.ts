import { baseApi as api } from './baseApi';

const injectedAuthApi = api.injectEndpoints({
	endpoints: (build) => ({
		verifyToken: build.mutation<VerifyTokenApiResponse, VerifyTokenApiArg>({
			query: (token: string) => ({
				url: `/users/verify`,
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
			}),
		}),
	}),
	overrideExisting: true,
});

export { injectedAuthApi as authApi };

export type VerifyTokenApiResponse =
	/** status 200 Token is valid */ TokenPayloadDto;
export type VerifyTokenApiArg = string;

export type TokenPayloadDto = {
	id: number;
	name: string;
	role: 'ADMIN' | 'USER';
};

export const { useVerifyTokenMutation } = injectedAuthApi;
