import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '@/stores/api/baseApi';
import { ErrorNotification } from '@/components/ErrorNotification';
import Cookies from 'js-cookie';
import {
	signUpSchema,
	type SignUpFormData,
} from '@/assets/validationSchemas/signUp';
import AuthForm from '@/components/AuthForm';

export default function SignUpPage() {
	const navigate = useNavigate();
	const [createUser, { isLoading }] = useCreateUserMutation();
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [hasToken, setHasToken] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpFormData>({ resolver: yupResolver(signUpSchema) });

	const onSubmit = async (data: SignUpFormData) => {
		setErrorMessage('');
		setShowError(false);
		setSuccess(false);

		try {
			const response = await createUser({ createUserDto: data }).unwrap();
			Cookies.set('token', response.token, {
				expires: 7,
			});
			reset();
			navigate('/');
		} catch (error: unknown) {
			let maybeMessage = '';
			if (typeof error === 'object' && error !== null) {
				const e = error as Record<string, unknown>;
				const data = e['data'];
				if (typeof data === 'object' && data !== null) {
					const d = data as Record<string, unknown>;
					const msg = d['message'];
					if (typeof msg === 'string') maybeMessage = msg;
				}
			}
			setErrorMessage(maybeMessage);
			setShowError(true);
		}
	};

	useEffect(() => {
		const token = Cookies.get('token');
		setHasToken(Boolean(token));
	}, []);

	const handleLogout = () => {
		Cookies.remove('token', { path: '/' });
		setHasToken(false);
		navigate('/');
	};

	return (
		<AuthForm
			title="Sign Up"
			onSubmit={handleSubmit(onSubmit)}
			isLoading={isLoading}
			submitLabel="Create account"
			hasToken={hasToken}
			onLogout={handleLogout}
			extraFooter={
				<div className="text-center text-sm text-gray-600 mt-4">
					Already have an account?{' '}
					<button
						type="button"
						onClick={() => navigate('/login')}
						className="text-pink-600 hover:text-pink-800 font-medium hover:underline cursor-pointer">
						Log in
					</button>
				</div>
			}>
			<div>
				<label className="block text-sm font-medium text-gray-700">Name</label>
				<input
					{...register('name')}
					className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
					placeholder="Your full name"
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					{...register('email')}
					type="email"
					className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
					placeholder="you@example.com"
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					{...register('password')}
					type="password"
					className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
					placeholder="Enter your password"
				/>
				{errors.password && (
					<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
				)}
			</div>

			{success && (
				<div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
					User created successfully.
				</div>
			)}

			<ErrorNotification
				message={errorMessage}
				isVisible={showError}
				onClose={() => setShowError(false)}
			/>
		</AuthForm>
	);
}
