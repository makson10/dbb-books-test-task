import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import routes from './assets/routes';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import UserProvider from './stores/UserProvider';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Suspense fallback={<p>Loading product details...</p>}>
			<Provider store={store}>
				<UserProvider>
					<RouterProvider router={routes} />
				</UserProvider>
			</Provider>
		</Suspense>
	</StrictMode>
);

const portalContainer = document.createElement('div');
portalContainer.id = 'portal-root';
document.body.appendChild(portalContainer);
