import * as yup from 'yup';

export const createPublisherSchema = yup
	.object({
		name: yup.string().required('Name is required'),
		establishedYear: yup
			.number()
			.required('Established year is required')
			.min(0, 'Invalid year'),
	})
	.required();

export type CreatePublisherFormData = yup.InferType<
	typeof createPublisherSchema
>;
