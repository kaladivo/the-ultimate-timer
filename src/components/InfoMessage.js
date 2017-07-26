import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {observer, inject} from 'mobx-react';

@translate('translations')
@inject('timerStore')
@observer
export default class InfoMessage extends Component{
	render() {
		const {t, timerStore, i18n, i18nLoadedAt, ...props} = this.props;
		const {isRunning, isWork, isPaused, isBreak, skipBreak} = timerStore;

		let message;
		if(isWork) {
			if(isRunning) message = t('Working session');
			else if(isPaused) message = t('Resume working session');
			else message = t('Start working session');
		} else if(isBreak) {
			if(isRunning) message = t('Break session');
			else if (isPaused) message = t('Resume break session');
			else message = t('Start break session');
		}

		return <div {...props}>
			<p>{message}</p>
			{isBreak? <p 
				style={{cursor: 'pointer', 'textDecoration':'underline'}} 
				onClick={skipBreak}>{t('Skip break')}</p>: ''}
		</div>;
	}
}