import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './layout';
import Dashboard from './pages/dashboard';
import ErrorPage from './pages/error/error-page';
import Settings from './pages/settings';

const routers = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
		],
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={routers}
				fallbackElement={<div>loading...</div>}
			/>
		</QueryClientProvider>
	</React.StrictMode>
);
