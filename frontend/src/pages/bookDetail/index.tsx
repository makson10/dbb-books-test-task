import useBookDetail from './useBookDetail';
import BookDetailContent from './BookDetailContent';
import BookDetailLoading from './BookDetailLoading';
import BookDetailError from './BookDetailError';

function BookDetail() {
	const {
		book,
		borrowHistory,
		isLoading,
		error,
		handleBorrowClick,
		handleBrowseClick,
	} = useBookDetail();

	if (isLoading) return <BookDetailLoading />;
	if (error || !book) return <BookDetailError />;

	return (
		<BookDetailContent
			book={book}
			borrowHistory={borrowHistory}
			onBorrowClick={handleBorrowClick}
			onBrowseClick={handleBrowseClick}
		/>
	);
}

export default BookDetail;
