import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery, useGetBookCountQuery } from '@/stores/api/booksApi';
import type { Order, SortBy } from '@/types/book.types';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import { clearUser } from '@/stores/slices/userSlice';
import Cookies from 'js-cookie';
import BooksTable from './BooksTable';

function BooksList() {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState<SortBy>('title');
	const [order, setOrder] = useState<Order>('asc');
	const limit = 10;
	const user = useAppSelector((s) => s.user?.user);
	const dispatch = useAppDispatch();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

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

	// close dropdown when clicking outside or pressing Escape
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setShowUserMenu(false);
			}
		}

		function handleKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setShowUserMenu(false);
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKey);
		};
	}, []);

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

	return (
		<div className="p-12">
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="flex items-center gap-3">
						{!user ? (
							<button
								onClick={() => navigate('/login')}
								className="px-3 py-1 bg-pink-600 hover:bg-pink-800 text-white font-medium rounded-lg hover:underline cursor-pointer">
								Log in
							</button>
						) : (
							<div
								className="relative flex flex-col justify-center"
								ref={menuRef}>
								<button
									onClick={() => setShowUserMenu((s) => !s)}
									className="cursor-pointer focus:outline-none">
									<img
										src="https://img.icons8.com/ios-filled/200/user-male-circle.png"
										alt="user"
										className="w-10 h-10 rounded-full"
									/>
								</button>

								{showUserMenu && (
									<div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
										<button
											onClick={() => {
												Cookies.remove('token', { path: '/' });
												dispatch(clearUser());
												navigate('/');
											}}
											className="w-full text-left px-4 py-2 text-black hover:bg-gray-100">
											Log out
										</button>
									</div>
								)}
							</div>
						)}

						<h1 className="text-3xl font-bold text-gray-800">Books Library</h1>
					</div>
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

				<BooksTable
					books={books}
					searchTerm={searchTerm}
					handleBookClick={handleBookClick}
					handleBorrowClick={handleBorrowClick}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					limit={limit}
					totalBooks={totalBooks}
				/>
			</div>
		</div>
	);
}

export default BooksList;
