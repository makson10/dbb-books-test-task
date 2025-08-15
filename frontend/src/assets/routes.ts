import { createBrowserRouter } from 'react-router';
import BooksList from '@/pages/booksList';
import BookDetail from '@/pages/bookDetail';
import BorrowPage from '@/pages/borrowPage';

export default createBrowserRouter([
	{
		path: '/',
		Component: BooksList,
	},
	{
		path: '/book/:id',
		Component: BookDetail,
	},
	{
		path: '/borrow',
		Component: BorrowPage,
	},
]);
