import * as yup from 'yup';

export const createBookSchema = yup
	.object({
		title: yup.string().required('Title is required'),
		isbn: yup.string().required('ISBN is required'),
		publishDate: yup.string().required('Publish date is required'),
		copiesTotal: yup
			.number()
			.required('Copies total is required')
			.min(0, 'Must be at least 0'),
		publisherName: yup.string().required('Publisher is required'),
		authorName: yup.string().required('Author is required'),
		genre: yup.string().required('Genre is required'),
	})
	.required();

export type CreateBookFormData = yup.InferType<typeof createBookSchema>;
