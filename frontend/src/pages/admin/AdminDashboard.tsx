import { useAppSelector } from '@/stores/hooks';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
	const { user: loggedInUser } = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	if (!loggedInUser || loggedInUser.role === 'ADMIN') navigate('/admin');

	return <div>AdminDashboard</div>;
};

export default AdminDashboard;
