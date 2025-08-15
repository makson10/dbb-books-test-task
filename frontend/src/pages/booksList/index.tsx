import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery, useGetBookCountQuery } from '@/stores/api/booksApi';
import type { Order, SortBy } from '@/types/book.types';

function BooksList() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState<SortBy>('title');
	const [order, setOrder] = useState<Order>('asc');
	const limit = 10;

	const {
		data: books,
		isLoading,
		error,
		refetch,
	} = useGetBooksQuery({
		page: currentPage,
		limit,
		sortBy,
		order,
	});

	const { data: bookCountData, isLoading: isCountLoading } =
		useGetBookCountQuery();

	const handleBookClick = (bookId: number) => navigate(`/book/${bookId}`);
	const handleBorrowClick = (bookTitle: string) =>
		navigate(`/borrow/?bookTitle=${bookTitle}`);

	useEffect(() => {
		refetch();
	}, [refetch, currentPage, sortBy, order]);

	if (isLoading || isCountLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
			</div>
		);
	}

	if (error || !books) {
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				Error loading books. Please try again.
			</div>
		);
	}

	const totalBooks = bookCountData?.count || 0;
	const totalPages = Math.ceil(totalBooks / limit);

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
	);

	return (
		<div className="p-12">
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<h1 className="text-3xl font-bold text-gray-800">Books Library</h1>
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="relative">
							<input
								type="text"
								placeholder="Search by title..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
							/>
							<svg
								className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>

						<div className="flex gap-2">
							<select
								value={sortBy}
								onChange={(e) =>
									setSortBy(e.target.value as 'title' | 'publishDate')
								}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
								<option value="title">Sort by Title</option>
								<option value="publishDate">Sort by Date</option>
							</select>

							<button
								onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
								className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
								{order === 'asc' ? '↑' : '↓'}
							</button>
						</div>
					</div>
				</div>

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
											{book.authors
												?.map((author) => author.fullName)
												.join(', ')}
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
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													book.copiesAvailable > 0
														? 'bg-green-100 text-green-800'
														: 'bg-red-100 text-red-800'
												}`}>
												{book.copiesAvailable}/{book.copiesTotal}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() => handleBorrowClick(book.title)}
												disabled={book.copiesAvailable === 0}
												className={`px-4 py-2 rounded-lg font-medium transition-colors ${
													book.copiesAvailable > 0
														? 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
														: 'bg-gray-300 text-gray-500 cursor-not-allowed'
												}`}>
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
							className={`px-3 py-2 rounded-lg border ${
								currentPage === 1
									? 'border-gray-200 text-gray-400 cursor-not-allowed'
									: 'border-gray-300 text-gray-700 hover:bg-gray-50'
							}`}>
							Previous
						</button>

						{Array.from({ length: totalPages }, (_, i) => {
							const pageNum = i + 1;
							return (
								<button
									key={pageNum}
									onClick={() => setCurrentPage(pageNum)}
									className={`px-3 py-2 rounded-lg border ${
										currentPage === pageNum
											? 'bg-pink-500 border-pink-500 text-white'
											: 'border-gray-300 text-gray-700 hover:bg-gray-50'
									}`}>
									{pageNum}
								</button>
							);
						})}

						<button
							onClick={() =>
								setCurrentPage(Math.min(totalPages, currentPage + 1))
							}
							disabled={currentPage === totalPages}
							className={`px-3 py-2 rounded-lg border ${
								currentPage === totalPages
									? 'border-gray-200 text-gray-400 cursor-not-allowed'
									: 'border-gray-300 text-gray-700 hover:bg-gray-50'
							}`}>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BooksList;
