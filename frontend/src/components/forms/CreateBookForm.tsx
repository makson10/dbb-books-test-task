import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateBookMutation } from '@/stores/api/adminApi';
import { ErrorNotification } from '@/components/ErrorNotification';
import {
	createBookSchema,
	type CreateBookFormData,
} from '@/assets/validationSchemas';
import { extractMessageFromError } from '@/assets/extractMessageFromError';
import {
	useGetAllAuthorsQuery,
	useGetAllPublishersQuery,
	useGetGenresQuery,
} from '@/stores/api';

type FormData = CreateBookFormData;

export default function CreateBookForm() {
	const [createBook, { isLoading }] = useCreateBookMutation();
	const { data: publishers } = useGetAllPublishersQuery();
	const { data: authors } = useGetAllAuthorsQuery();
	const { data: genres } = useGetGenresQuery();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ resolver: yupResolver(createBookSchema) });
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);
	const [success, setSuccess] = useState('');

	const onSubmit = async (formData: FormData) => {
		setErrorMessage('');
		setShowError(false);
		setSuccess('');
		try {
			await createBook({ createBook: formData }).unwrap();
			setSuccess('Book created');
			reset();
		} catch (err: unknown) {
			setErrorMessage(extractMessageFromError(err));
			setShowError(true);
		}
	};

	return (
		<div className="bg-white p-6 rounded shadow">
			<h3 className="text-lg font-semibold mb-4">Create Book</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<input
						{...register('title')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.title && (
						<p className="text-sm text-red-600">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						ISBN
					</label>
					<input
						{...register('isbn')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.isbn ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.isbn && (
						<p className="text-sm text-red-600">{errors.isbn.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Publish date
					</label>
					<input
						{...register('publishDate')}
						type="date"
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.publishDate ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.publishDate && (
						<p className="text-sm text-red-600">{errors.publishDate.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Copies total
					</label>
					<input
						{...register('copiesTotal')}
						type="number"
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.copiesTotal ? 'border-red-400' : 'border-gray-300'}`}
					/>
					{errors.copiesTotal && (
						<p className="text-sm text-red-600">{errors.copiesTotal.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Publisher
					</label>
					<select
						{...register('publisherName')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.publisherName ? 'border-red-400' : 'border-gray-300'}`}>
						<option value="">Select publisher</option>
						{publishers?.map((p) => (
							<option key={p.name} value={p.name}>
								{p.name}
							</option>
						))}
					</select>
					{errors.publisherName && (
						<p className="text-sm text-red-600">
							{errors.publisherName.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Author
					</label>
					<select
						{...register('authorName')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.authorName ? 'border-red-400' : 'border-gray-300'}`}>
						<option value="">Select author</option>
						{authors?.map((a) => (
							<option key={a.fullName} value={a.fullName}>
								{a.fullName}
							</option>
						))}
					</select>
					{errors.authorName && (
						<p className="text-sm text-red-600">{errors.authorName.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Genre
					</label>
					<select
						{...register('genre')}
						className={`mt-1 block w-full rounded border px-3 py-2 ${errors.genre ? 'border-red-400' : 'border-gray-300'}`}>
						<option value="">Select genre</option>
						{genres?.map((g) => (
							<option key={g.name} value={g.name}>
								{g.name}
							</option>
						))}
					</select>
					{errors.genre && (
						<p className="text-sm text-red-600">{errors.genre.message}</p>
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
