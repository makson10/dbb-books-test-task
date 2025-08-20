import { useParams, useNavigate } from 'react-router-dom';
import {
	useGetBookDetailsQuery,
	useGetBookHistoryQuery,
} from '@/stores/api/baseApi';
import type { BookWithRelations } from '@/stores/api/baseApi';
import type { BorrowRecord } from '@/types/borrow.types';

export const useBookDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: book,
		isLoading,
		error,
	} = useGetBookDetailsQuery({ id: id || '1' });

	const { data: borrowHistory, isLoading: isHistoryLoading } =
		useGetBookHistoryQuery({ id: id || '1' });

	const typedBook = book as BookWithRelations;
	const typedBorrowHistory = borrowHistory as BorrowRecord[] | undefined;

	const handleBorrowClick = (bookTitle: string) =>
		navigate(`/borrow/?bookTitle=${bookTitle}`);

	const handleBrowseClick = () => navigate('/');

	return {
		book: typedBook,
		borrowHistory: typedBorrowHistory,
		isLoading: isLoading || isHistoryLoading,
		error,
		handleBorrowClick,
		handleBrowseClick,
	} as const;
};

export default useBookDetail;
