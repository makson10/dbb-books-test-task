import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BorrowPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		userName: '',
		userEmail: '',
		borrowDate: new Date().toISOString().split('T')[0],
		returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
			.toISOString()
			.split('T')[0],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Mock book data - replace with actual API call when ready
	const book = {
		id: parseInt(id || '1'),
		title: 'The Great Gatsby',
		isbn: '978-0743273565',
		copiesAvailable: 3,
		publisher: { name: 'Scribner' },
		authors: [{ fullName: 'F. Scott Fitzgerald' }],
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Here you would call the actual borrow API
		// await borrowBook({ bookId: book.id, ...formData });

		setIsSubmitting(false);

		// Navigate back to books list with success message
		navigate('/', {
			state: { message: `Successfully borrowed "${book.title}"!` },
		});
	};

	const handleCancel = () => {
		navigate(`/book/${book.id}`);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate(`/book/${book.id}`)}
					className="px-4 py-2 text-pink-600 hover:text-pink-800 font-medium hover:underline flex items-center gap-2">
					← Back to Book Details
				</button>
			</div>

			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							Borrow Book
						</h1>
						<p className="text-gray-600">
							Please fill out the form below to borrow this book
						</p>
					</div>

					{/* Book Summary */}
					<div className="bg-gradient-to-r from-pink-50 to-green-50 rounded-lg p-6 mb-8 border border-pink-200">
						<h3 className="text-lg font-semibold text-gray-800 mb-3">
							Book Information
						</h3>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<span className="text-gray-600 font-medium">Title:</span>
								<p className="text-gray-800 font-medium">{book.title}</p>
							</div>
							<div>
								<span className="text-gray-600 font-medium">Author:</span>
								<p className="text-gray-800">
									{book.authors.map((a) => a.fullName).join(', ')}
								</p>
							</div>
							<div>
								<span className="text-gray-600 font-medium">ISBN:</span>
								<p className="text-gray-800 font-mono">{book.isbn}</p>
							</div>
							<div>
								<span className="text-gray-600 font-medium">Publisher:</span>
								<p className="text-gray-800">{book.publisher.name}</p>
							</div>
						</div>
						<div className="mt-3 pt-3 border-t border-pink-200">
							<span className="text-gray-600 font-medium">
								Copies Available:{' '}
							</span>
							<span className="text-green-600 font-semibold">
								{book.copiesAvailable}
							</span>
						</div>
					</div>

					{/* Borrow Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="userName"
									className="block text-sm font-medium text-gray-700 mb-2">
									Full Name *
								</label>
								<input
									type="text"
									id="userName"
									name="userName"
									value={formData.userName}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
									placeholder="Enter your full name"
								/>
							</div>

							<div>
								<label
									htmlFor="userEmail"
									className="block text-sm font-medium text-gray-700 mb-2">
									Email Address *
								</label>
								<input
									type="email"
									id="userEmail"
									name="userEmail"
									value={formData.userEmail}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
									placeholder="Enter your email"
								/>
							</div>

							<div>
								<label
									htmlFor="borrowDate"
									className="block text-sm font-medium text-gray-700 mb-2">
									Borrow Date *
								</label>
								<input
									type="date"
									id="borrowDate"
									name="borrowDate"
									value={formData.borrowDate}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label
									htmlFor="returnDate"
									className="block text-sm font-medium text-gray-700 mb-2">
									Expected Return Date *
								</label>
								<input
									type="date"
									id="returnDate"
									name="returnDate"
									value={formData.returnDate}
									onChange={handleInputChange}
									required
									min={formData.borrowDate}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
								/>
							</div>
						</div>

						{/* Terms and Conditions */}
						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="text-sm font-medium text-gray-800 mb-2">
								Borrowing Terms:
							</h4>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Books can be borrowed for up to 14 days</li>
								<li>• Late returns may incur fines</li>
								<li>• Please return books in the same condition</li>
								<li>• You can renew books if no one else has requested them</li>
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								disabled={isSubmitting}
								className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
								{isSubmitting ? (
									<span className="flex items-center justify-center gap-2">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
										Processing...
									</span>
								) : (
									'Confirm Borrow'
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
		</div>
	);
}

export default BorrowPage;
