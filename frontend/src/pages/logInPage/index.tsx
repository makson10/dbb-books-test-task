import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/stores/api/baseApi';
import { ErrorNotification } from '@/components/ErrorNotification';
import Cookies from 'js-cookie';
import {
	loginSchema,
	type LoginFormData,
} from '@/assets/validationSchemas/logIn';
import AuthForm from '@/components/AuthForm';

export default function LogInPage() {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);
	const [hasToken, setHasToken] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

	const onSubmit = async (data: LoginFormData) => {
		setErrorMessage('');
		setShowError(false);

		try {
			const response = await login({ loginDto: data }).unwrap();
			Cookies.set('token', response.token, {
				expires: 7,
			});
			reset();
			navigate('/');
		} catch (error) {
			const msg = error instanceof Error ? error.message : 'Failed to log in';
			setErrorMessage(msg);
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
			title="Log In"
			onSubmit={handleSubmit(onSubmit)}
			isLoading={isLoading}
			submitLabel="Log In"
			hasToken={hasToken}
			onLogout={handleLogout}
			extraFooter={
				<div className="text-center text-sm text-gray-600">
					Don't have an account?{' '}
					<button
						type="button"
						onClick={() => navigate('/signup')}
						className="text-pink-600 hover:text-pink-800 font-medium hover:underline cursor-pointer">
						Sign up
					</button>
				</div>
			}>
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

			<ErrorNotification
				message={errorMessage}
				isVisible={showError}
				onClose={() => setShowError(false)}
			/>
		</AuthForm>
	);
}
