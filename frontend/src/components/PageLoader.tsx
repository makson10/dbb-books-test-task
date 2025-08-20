import { Outlet, useNavigation } from 'react-router';
import GlobalSpinner from './GlobalSpinner';

export default function Root() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<html>
			<body>
				{isNavigating && <GlobalSpinner />}
				<Outlet />
			</body>
		</html>
	);
}
