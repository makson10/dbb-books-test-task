import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { RouterProvider } from 'react-router';
import routes from './assets/routes';
import { Provider } from 'react-redux';
import { store } from './stores/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	</StrictMode>
);

const portalContainer = document.createElement('div');
portalContainer.id = 'portal-root';
document.body.appendChild(portalContainer);
