import * as yup from 'yup';

export const signUpSchema = yup
	.object({
		name: yup.string().required('Name is required').min(2, 'Too short'),
		email: yup.string().required('Email is required').email('Invalid email'),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				'Password must contain at least one uppercase letter, one lowercase letter, and one number'
			),
	})
	.required();

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
