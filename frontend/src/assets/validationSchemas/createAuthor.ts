import * as yup from 'yup';

export const createAuthorSchema = yup
	.object({
		fullName: yup.string().required('Full name is required'),
		birthDate: yup.string().required('Birth date is required'),
	})
	.required();

export type CreateAuthorFormData = yup.InferType<typeof createAuthorSchema>;
