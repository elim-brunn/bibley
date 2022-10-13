import React, { useCallback, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useRegisterSW } from 'virtual:pwa-register/react';
import { useSnackbar } from 'notistack';

function SW() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker
	} = useRegisterSW();

	const close = useCallback(() => {
		setOfflineReady(false);
		setNeedRefresh(false);
		closeSnackbar();
	}, [setOfflineReady, setNeedRefresh]);

	useEffect(() => {
		console.log('offlineReady', offlineReady);
		if (offlineReady) {
			enqueueSnackbar('', {
				autoHideDuration: 4500,
				content: <Alert severity="success">App is ready to work offline.</Alert>
			});
		} else if (needRefresh) {
			enqueueSnackbar('New content is available, click on reload button to update.', {
				variant: 'warning',
				persist: true,
				action: (
					<>
						<Button onClick={() => updateServiceWorker(true)}>Reload</Button>
						<Button onClick={close}>Close</Button>
					</>
				)
			});
		}
	}, [close, needRefresh, offlineReady, updateServiceWorker]);

	return null;
}

export default SW;
