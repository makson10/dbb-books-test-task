import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptyApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_BASE_URL }),
	endpoints: () => ({}),
});
