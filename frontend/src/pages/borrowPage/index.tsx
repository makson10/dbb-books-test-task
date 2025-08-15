import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { borrowSchema, type BorrowFormData } from '@/assets/validationSchema';
import { useBorrowBookMutation } from '@/stores/api/baseApi';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '@/components/ErrorNotification';

function BorrowPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
	} = useForm<BorrowFormData>({
		resolver: yupResolver(borrowSchema),
	});

	const handleCancel = () => navigate('/');

	const showErrorNotification = (message: string) => {
		setErrorMessage(message);
		setShowError(true);
	};

	const hideErrorNotification = () => {
		setShowError(false);
		setErrorMessage('');
	};

	const onSubmit = async () => {
		try {
			const newBorrow = getValues();
			await borrowBook({ borrowBookDto: newBorrow }).unwrap();

			reset();
			navigate('/');
		} catch (error: any) {
			console.error('Failed to borrow book:', error);
			showErrorNotification(error.data.message || '');
		}
	};

	useEffect(() => {
		const requestedBookTitle = searchParams.get('bookTitle');
		if (requestedBookTitle) {
			setValue('bookTitle', requestedBookTitle);
		}
	}, [searchParams]);

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate('/')}
					className="px-4 py-2 text-pink-600 hover:text-pink-800 font-medium hover:underline flex items-center gap-2">
					← Back to Books
				</button>
			</div>
			<div className="max-w-md mx-auto relative">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							Borrow Book
						</h1>
						<p className="text-gray-600">
							Please fill out the form below to borrow a book
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* User Name Input */}
						<div>
							<label
								htmlFor="userName"
								className="block text-sm font-medium text-gray-700 mb-2">
								User Name *
							</label>
							<input
								type="text"
								id="userName"
								{...register('userName')}
								className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
									errors.userName
										? 'border-red-300 focus:ring-red-500'
										: 'border-gray-300'
								}`}
								placeholder="Enter user name"
							/>
							{errors.userName && (
								<p className="mt-1 text-sm text-red-600">
									{errors.userName.message}
								</p>
							)}
						</div>

						{/* Book Title Input */}
						<div>
							<label
								htmlFor="bookTitle"
								className="block text-sm font-medium text-gray-700 mb-2">
								Book Title *
							</label>
							<input
								type="text"
								id="bookTitle"
								{...register('bookTitle')}
								className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
									errors.bookTitle
										? 'border-red-300 focus:ring-red-500'
										: 'border-gray-300'
								}`}
								placeholder="Enter book title"
							/>
							{errors.bookTitle && (
								<p className="mt-1 text-sm text-red-600">
									{errors.bookTitle.message}
								</p>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								disabled={isBorrowing}
								className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
								{isBorrowing ? (
									<span className="flex items-center justify-center gap-2">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
										Processing...
									</span>
								) : (
									'Submit'
								)}
							</button>

							<button
								type="button"
								onClick={handleCancel}
								className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
			<ErrorNotification
				message={errorMessage}
				isVisible={showError}
				onClose={hideErrorNotification}
			/>
		</div>
	);
}

export default BorrowPage;
