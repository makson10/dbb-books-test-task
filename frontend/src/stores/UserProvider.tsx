import { type PropsWithChildren, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch } from './hooks';
import { useVerifyTokenMutation } from './api/authApi';
import { setUser, clearUser } from './slices/userSlice';

export default function UserProvider({ children }: PropsWithChildren) {
	const dispatch = useAppDispatch();
	const [verifyToken] = useVerifyTokenMutation();

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) return;

		(async () => {
			try {
				const res = await verifyToken(token).unwrap();
				dispatch(setUser(res));
			} catch {
				dispatch(clearUser());
				Cookies.remove('token', { path: '/' });
			}
		})();
	}, [dispatch, verifyToken]);

	return <>{children}</>;
}
