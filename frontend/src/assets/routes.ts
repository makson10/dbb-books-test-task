import { createBrowserRouter } from 'react-router-dom';
import BooksList from '@/pages/booksList';
import BookDetail from '@/pages/bookDetail';
import BorrowPage from '@/pages/borrowPage';
import SignUpPage from '@/pages/signUpPage';
import LogInPage from '@/pages/logInPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import { ErrorBoundaryWrapper } from '@/components/GlobalError';

const router = createBrowserRouter([
	{
		path: '/',
		Component: BooksList,
		ErrorBoundary: ErrorBoundaryWrapper,
	},
	{ path: '/book/:id', Component: BookDetail },
	{ path: '/borrow', Component: BorrowPage },
	{ path: '/signup', Component: SignUpPage },
	{ path: '/login', Component: LogInPage },
	{ path: '/admin', Component: AdminLoginPage },
	{ path: '/admin/dashboard', Component: AdminDashboard },
]);

export default router;
