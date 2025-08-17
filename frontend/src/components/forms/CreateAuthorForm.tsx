import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateAuthorMutation } from '@/stores/api/adminApi';
import { ErrorNotification } from '@/components/ErrorNotification';
import {
	createAuthorSchema,
	type CreateAuthorFormData,
} from '@/assets/validationSchemas/createAuthor';
import { extractMessageFromError } from '@/assets/extractMessageFromError';

type FormData = CreateAuthorFormData;

export default function CreateAuthorForm() {
	const [createAuthor, { isLoading }] = useCreateAuthorMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ resolver: yupResolver(createAuthorSchema) });
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);
	const [success, setSuccess] = useState('');

	const onSubmit = async (formData: FormData) => {
		setErrorMessage('');
		setShowError(false);
		setSuccess('');
		try {
			await createAuthor({
				createAuthor: formData,
			}).unwrap();
			setSuccess('Author created');
			reset();
		} catch (err: unknown) {
			setErrorMessage(extractMessageFromError(err));
			setShowError(true);
		}
	};

	return (
		<div className="bg-white p-6 rounded shadow">
			<h3 className="text-lg font-semibold mb-4">Create Author</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Full name
					</label>
					<input
						{...register('fullName')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.fullName ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.fullName && (
						<p className="text-sm text-red-600">{errors.fullName.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Birth date
					</label>
					<input
						{...register('birthDate')}
						type="date"
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.birthDate ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.birthDate && (
						<p className="text-sm text-red-600">{errors.birthDate.message}</p>
					)}
				</div>

				<div className="flex items-center justify-between">
					<button
						type="submit"
						disabled={isLoading}
						className="px-4 py-2 bg-pink-500 text-white rounded">
						{isLoading ? 'Creating...' : 'Create'}
					</button>
					{success && <span className="text-sm text-green-600">{success}</span>}
				</div>
			</form>

			<ErrorNotification
				message={errorMessage}
				isVisible={showError}
				onClose={() => setShowError(false)}
			/>
		</div>
	);
}
