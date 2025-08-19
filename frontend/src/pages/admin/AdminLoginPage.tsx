import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginFormData } from '@/assets/validationSchemas';
import { useLoginMutation } from '@/stores/api/baseApi';
import Cookies from 'js-cookie';
import { setUser } from '@/stores/slices/userSlice';
import { ErrorNotification } from '@/components/ErrorNotification';
import { useState } from 'react';
import GoToHome from '@/components/GoToHome';

const AdminLoginPage = () => {
	const { user: loggedInUser } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

	const onSubmit = async (data: LoginFormData) => {
		try {
			const res = await login({ loginDto: data }).unwrap();
			if (res?.user?.role === 'ADMIN') {
				Cookies.set('token', res.token, { path: '/' });
				dispatch(setUser(res.user));
				navigate('/admin/dashboard');
			} else {
				throw new Error('Unauthorized access');
			}
		} catch (err: unknown) {
			let message = 'Login failed';
			if (typeof err === 'string') message = err;
			else if (err && typeof err === 'object') {
				const maybeErr = err as {
					message?: string;
					data?: { message?: string };
				};
				message = maybeErr.data?.message || maybeErr.message || message;
			}
			setErrorMessage(message);
			setShowError(true);
		}
	};

	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (loggedInUser && loggedInUser.role === 'ADMIN') {
			navigate('/admin/dashboard');
		}
	}, [loggedInUser, navigate]);

	return (
		<>
			<GoToHome />
			<div className="p-12 max-w-md mx-auto">
				<h1 className="text-2xl font-bold mb-6">Admin Login</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							{...register('email')}
							type="email"
							className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
							placeholder="admin@example.com"
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">
								{errors.email.message}
							</p>
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
							placeholder="Enter password"
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-600">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex items-center justify-between">
						<button
							type="submit"
							disabled={isLoading}
							className={`px-4 py-2 rounded-lg font-medium transition-colors bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-60`}>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
			</div>

			<ErrorNotification
				message={errorMessage}
				isVisible={showError}
				onClose={() => setShowError(false)}
			/>
		</>
	);
};

export default AdminLoginPage;
