import { useNavigate } from 'react-router';

const GoToHome = () => {
	const navigate = useNavigate();

	return (
		<div className="ml-4 mt-4">
			<button
				onClick={() => navigate('/')}
				className="text-pink-600 hover:text-pink-800 font-medium hover:underline cursor-pointer">
				← Back to Home
			</button>
		</div>
	);
};

export default GoToHome;
