import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './app.scss';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SnackbarProvider maxSnack={3}>
			<App />
		</SnackbarProvider>
	</React.StrictMode>
);
