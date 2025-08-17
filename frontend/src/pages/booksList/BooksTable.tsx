import type { Book } from '@/types/book.types';

type Props = {
	books: Book[];
	searchTerm: string;
	handleBookClick: (id: number) => void;
	handleBorrowClick: (title: string) => void;
	currentPage: number;
	setCurrentPage: (p: number) => void;
	limit: number;
	totalBooks: number;
};

export default function BooksTable({
	books,
	searchTerm,
	handleBookClick,
	handleBorrowClick,
	currentPage,
	setCurrentPage,
	limit,
	totalBooks,
}: Props) {
	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(totalBooks / limit) || 1;

	return (
		<>
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gradient-to-r from-pink-100 to-green-100">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Authors
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Publisher
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									ISBN
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Publish Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Available
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredBooks.map((book) => (
								<tr
									key={book.id}
									className="hover:bg-gray-50 transition-colors">
									<td className="px-6 py-4 whitespace-nowrap">
										<button
											onClick={() => handleBookClick(book.id)}
											className="text-left text-pink-600 hover:text-pink-800 font-medium hover:underline cursor-pointer">
											{book.title}
										</button>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{book.authors?.map((author) => author.fullName).join(', ')}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{book.publisher?.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{book.isbn}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{new Date(book.publishDate).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${book.copiesAvailable > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
											{book.copiesAvailable}/{book.copiesTotal}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<button
											onClick={() => handleBorrowClick(book.title)}
											disabled={book.copiesAvailable === 0}
											className={`px-4 py-2 rounded-lg font-medium transition-colors ${book.copiesAvailable > 0 ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
											{book.copiesAvailable > 0 ? 'Borrow' : 'Unavailable'}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<div className="text-sm text-gray-700">
					Showing {(currentPage - 1) * limit + 1} to{' '}
					{Math.min(currentPage * limit, totalBooks)} of {totalBooks} results
				</div>

				<div className="flex items-center space-x-2">
					<button
						onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
						className={`px-3 py-2 rounded-lg border ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
						Previous
					</button>

					{Array.from({ length: totalPages }, (_, i) => {
						const pageNum = i + 1;
						return (
							<button
								key={pageNum}
								onClick={() => setCurrentPage(pageNum)}
								className={`px-3 py-2 rounded-lg border ${currentPage === pageNum ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
								{pageNum}
							</button>
						);
					})}

					<button
						onClick={() =>
							setCurrentPage(Math.min(totalPages, currentPage + 1))
						}
						disabled={currentPage === totalPages}
						className={`px-3 py-2 rounded-lg border ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
						Next
					</button>
				</div>
			</div>
		</>
	);
}
