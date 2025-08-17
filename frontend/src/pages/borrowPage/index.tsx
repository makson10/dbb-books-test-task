import {} from 'react';
import { ErrorNotification } from '@/components/ErrorNotification';
import GoToHome from '@/components/GoToHome';
import useBorrowForm from './useBorrowForm';
import BorrowForm from './BorrowForm';

function BorrowPage() {
	// useBorrowForm contains all form logic and state
	const {
		register,
		onSubmit,
		errors,
		isBorrowing,
		errorMessage,
		showError,
		hideErrorNotification,
		handleCancel,
	} = useBorrowForm();

	// user info handled inside useBorrowForm

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<GoToHome />
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

					<BorrowForm
						register={register}
						errors={errors}
						isBorrowing={isBorrowing}
						onSubmit={onSubmit}
						handleCancel={handleCancel}
					/>
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
