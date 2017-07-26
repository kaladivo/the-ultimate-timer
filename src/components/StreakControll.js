import React, {Component} from 'react'
import {STYLES} from '../constants';
import {observer, inject} from 'mobx-react';
import {translate} from 'react-i18next';
import Icon from './Icon';

const defaultStyle = {
	background: STYLES.DARKER_BACK,
	borderRadius: '.5rem',
	color: STYLES.GRAY_TEXT,
	padding: '.5rem'
} 

@translate('translations')
@inject('timerStore')
@observer
export default class StreakControll extends Component {
	render() {
		const {t, timerStore, style, i18n, i18nLoadedAt, ...props} = this.props;
		const {streak, resetStreak} = timerStore;

		return <div {...props} style={{...defaultStyle, ...style}}>
			{t('Streak')}: {streak} <Icon onClick={resetStreak} name='times'/>
		</div>
	}
}