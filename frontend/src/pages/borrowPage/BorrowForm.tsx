import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { BorrowFormData } from '@/assets/validationSchemas';

type Props = {
	register: UseFormRegister<BorrowFormData>;
	errors: FieldErrors<BorrowFormData>;
	isBorrowing: boolean;
	onSubmit: () => Promise<void> | void;
	handleCancel: () => void;
};

export default function BorrowForm({
	register,
	errors,
	isBorrowing,
	onSubmit,
	handleCancel,
}: Props) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
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
					<p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>
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
	);
}
