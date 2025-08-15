import { useParams, useNavigate } from 'react-router-dom';

function BookDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	// Mock book data - replace with actual API call when ready
	const book = {
		id: parseInt(id || '1'),
		title: 'The Great Gatsby',
		isbn: '978-0743273565',
		publishDate: '1925-04-10',
		copiesTotal: 5,
		copiesAvailable: 3,
		publisher: { id: 1, name: 'Scribner', establishedYear: 1846 },
		authors: [
			{ id: 1, fullName: 'F. Scott Fitzgerald', birthDate: '1896-09-24' },
		],
		genres: [{ id: 1, name: 'Fiction' }],
		description:
			"The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate('/')}
					className="px-4 py-2 text-pink-600 hover:text-pink-800 font-medium hover:underline flex items-center gap-2">
					← Back to Books
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-lg p-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Book Cover Placeholder */}
					<div className="flex justify-center">
						<div className="w-64 h-80 bg-gradient-to-br from-pink-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-pink-200">
							<div className="text-center text-pink-600">
								<div className="text-6xl mb-2">📚</div>
								<div className="text-sm font-medium">Book Cover</div>
							</div>
						</div>
					</div>

					{/* Book Details */}
					<div className="space-y-6">
						<div>
							<h1 className="text-4xl font-bold text-gray-800 mb-2">
								{book.title}
							</h1>
							<div className="flex items-center gap-2 text-gray-600">
								<span>by</span>
								{book.authors.map((author) => (
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
									{new Date(book.publishDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Publisher:</span>
								<span className="text-gray-800">{book.publisher.name}</span>
								<span className="text-gray-500">
									({book.publisher.establishedYear})
								</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-gray-600 font-medium">Genres:</span>
								<div className="flex gap-2">
									{book.genres.map((genre) => (
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

						<div className="pt-4">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Description
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{book.description}
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<button
								onClick={() => navigate(`/borrow/${book.id}`)}
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
								onClick={() => navigate('/')}
								className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
								Browse More Books
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookDetail;
