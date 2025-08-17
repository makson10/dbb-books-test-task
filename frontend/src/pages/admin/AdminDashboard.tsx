import { useAppSelector } from '@/stores/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CreateAuthorForm from '../../components/forms/CreateAuthorForm';
import CreatePublisherForm from '../../components/forms/CreatePublisherForm';
import CreateGenreForm from '../../components/forms/CreateGenreForm';
import GoToHome from '@/components/GoToHome';

const AdminDashboard = () => {
	const { user: loggedInUser } = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedInUser || loggedInUser.role !== 'ADMIN') navigate('/admin');
	}, [loggedInUser, navigate]);

	return (
		<div className="p-8">
			<GoToHome />

			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<CreateAuthorForm />
				<CreatePublisherForm />
				<CreateGenreForm />
			</div>
		</div>
	);
};

export default AdminDashboard;
