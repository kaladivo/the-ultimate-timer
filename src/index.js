import React from 'react';
import ReactDOM from 'react-dom';
import './css'
import App from './App';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import registerServiceWorker from './registerServiceWorker';
import {Provider as MobXProvider} from 'mobx-react';
import stores from './stores';
import {getNotificationPermissions} from './utils';

getNotificationPermissions();

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<MobXProvider {...stores}>
			<App />
		</MobXProvider>
	</I18nextProvider>
	, document.getElementById('root'));
registerServiceWorker();
