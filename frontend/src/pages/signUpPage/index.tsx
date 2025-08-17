import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '@/stores/api/baseApi';
import { ErrorNotification } from '@/components/ErrorNotification';
import Cookies from 'js-cookie';
import { signUpSchema, type SignUpFormData } from '@/assets/validationSchemas/signUp';

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
		} catch (error) {
			setErrorMessage((error as any).data.message);
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
		<>
			{hasToken && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
					<div className="bg-white max-w-lg w-full p-6 rounded shadow-lg">
						<h2 className="text-xl font-bold mb-4">
							You are already signed in
						</h2>
						<p className="mb-6">A session token was found in your cookies.</p>
						<div className="flex gap-4 justify-end">
							<button
								onClick={handleLogout}
								className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
								Log out
							</button>
							<button
								onClick={() => navigate('/')}
								className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
								Go to Home
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="flex items-center gap-4 mb-6">
				<button
					onClick={() => navigate('/')}
					className="px-4 py-2 text-pink-600 hover:text-pink-800 font-medium hover:underline flex items-center gap-2 cursor-pointer">
					← Back to Books
				</button>
			</div>
			<div className="p-12 max-w-md mx-auto">
				<h1 className="text-2xl font-bold mb-6">Sign Up</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							{...register('name')}
							className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
								errors.name ? 'border-red-400' : 'border-gray-300'
							}`}
							placeholder="Your full name"
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							{...register('email')}
							type="email"
							className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
								errors.email ? 'border-red-400' : 'border-gray-300'
							}`}
							placeholder="you@example.com"
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
							className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
								errors.password ? 'border-red-400' : 'border-gray-300'
							}`}
							placeholder="Enter your password"
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
							{isLoading ? 'Creating...' : 'Create account'}
						</button>
					</div>

					<div className="text-center text-sm text-gray-600 mt-4">
						Already have an account?{' '}
						<button
							type="button"
							onClick={() => navigate('/login')}
							className="text-pink-600 hover:text-pink-800 font-medium hover:underline cursor-pointer">
							Log in
						</button>
					</div>
				</form>

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
			</div>
		</>
	);
}
