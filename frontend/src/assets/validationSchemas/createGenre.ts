import * as yup from 'yup';

export const createGenreSchema = yup
	.object({
		name: yup.string().required('Genre name is required'),
	})
	.required();

export type CreateGenreFormData = yup.InferType<typeof createGenreSchema>;
