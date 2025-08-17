import { createBrowserRouter } from 'react-router';
import BooksList from '@/pages/booksList';
import BookDetail from '@/pages/bookDetail';
import BorrowPage from '@/pages/borrowPage';
import SignUpPage from '@/pages/signUpPage';
import LogInPage from '@/pages/logInPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';

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
	{
		path: '/signup',
		Component: SignUpPage,
	},
	{
		path: '/login',
		Component: LogInPage,
	},
	{
		path: '/admin',
		Component: AdminLoginPage,
	},
	{
		path: '/admin/dashboard',
		Component: AdminDashboard,
	},
]);
