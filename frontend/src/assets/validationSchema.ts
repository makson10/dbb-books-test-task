import * as yup from 'yup';

export const borrowSchema = yup
	.object({
		userName: yup
			.string()
			.required('User name is required')
			.min(2, 'User name must be at least 2 characters'),
		bookTitle: yup
			.string()
			.required('Book title is required')
			.min(1, 'Book title is required'),
	})
	.required();

export type BorrowFormData = yup.InferType<typeof borrowSchema>;
