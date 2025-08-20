import React from 'react';
import type { BookWithRelations, Genre } from '@/stores/api/baseApi';
import type { BorrowRecord } from '@/types/borrow.types';
import GoToHome from '@/components/GoToHome';

type Props = {
	book: BookWithRelations;
	borrowHistory?: BorrowRecord[];
	onBorrowClick: (bookTitle: string) => void;
	onBrowseClick: () => void;
};

const formatDate = (iso?: string) =>
	iso
		? new Date(iso).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: 'N/A';

const BookDetailContent: React.FC<Props> = ({
	book,
	borrowHistory,
	onBorrowClick,
	onBrowseClick,
}) => {
	return (
		<div className="space-y-6">
			<GoToHome />

			<div className="bg-white shadow-lg p-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="flex justify-center">
						<div className="w-64 h-80 bg-gradient-to-br from-pink-50 to-green-50 rounded-lg flex items-center justify-center border border-pink-200">
							<div className="text-center">
								<div className="text-7xl mb-2">📖</div>
								<div className="text-pink-600 font-medium">Book Details</div>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-4xl font-bold text-gray-800 mb-2">
								{book.title}
							</h1>
							<div className="flex items-center gap-2 text-gray-600">
								<span>by</span>
								{book.authors?.map((author) => (
									<span key={author.id} className="font-medium text-pink-600">
										{author.fullName}
									</span>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">ISBN:</span>
								<span className="font-mono text-gray-800">{book.isbn}</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Published:</span>
								<span className="text-gray-800">
									{formatDate(book.publishDate)}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Publisher:</span>
								<span className="text-gray-800">{book.publisher?.name}</span>
								<span className="text-gray-500">
									({book.publisher?.establishedYear})
								</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Genres:</span>
								<div className="flex gap-2">
									{book.genres?.map((genre: Genre) => (
										<span
											key={genre.id}
											className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
											{genre.name}
										</span>
									))}
								</div>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Availability:</span>
								<span
									className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
										book.copiesAvailable > 0
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
									}`}>
									{book.copiesAvailable} of {book.copiesTotal} copies available
								</span>
							</div>
						</div>

						<div className="flex gap-4 pt-4">
							<button
								onClick={() => onBorrowClick(book.title)}
								disabled={book.copiesAvailable === 0}
								className={`px-6 py-3 rounded-lg font-medium transition-colors ${
									book.copiesAvailable > 0
										? 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
										: 'bg-gray-300 text-gray-500 cursor-not-allowed'
								}`}>
								{book.copiesAvailable > 0
									? 'Borrow This Book'
									: 'Currently Unavailable'}
							</button>

							<button
								onClick={onBrowseClick}
								className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer">
								Browse More Books
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg p-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Borrow History
				</h2>
				{borrowHistory && borrowHistory.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gradient-to-r from-pink-100 to-green-100">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
										Borrower
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
										Borrowed Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
										Returned Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{borrowHistory.map((record: BorrowRecord, index: number) => (
									<tr
										key={index}
										className="hover:bg-gray-50 transition-colors">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{record.borrower?.name || 'Unknown'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{record.borrowedAt
												? formatDate(record.borrowedAt)
												: 'N/A'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{record.returnedAt
												? formatDate(record.returnedAt)
												: 'Not returned'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${record.returnedAt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
												{record.returnedAt ? 'Returned' : 'Borrowed'}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="text-center py-8">
						<div className="text-gray-400 text-6xl mb-4">📚</div>
						<p className="text-gray-500 text-lg">
							No borrow history available for this book.
						</p>
						<p className="text-gray-400 text-sm mt-2">
							This book hasn't been borrowed yet or history is not available.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookDetailContent;
