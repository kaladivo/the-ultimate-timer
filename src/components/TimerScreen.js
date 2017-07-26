import React, {Component} from 'react';
import StreakControll from './StreakControll';
import TimerControlls from './TimerControlls';
import Clock from './Clock';
import InfoMessage from './InfoMessage';
import QuotesDisplayer from './QuotesDisplayer';
import {STYLES} from '../constants'; 

const outerStyle = {
	padding: '1.5rem 2rem',
	boxSizing: 'border-box',
	height: '100vh',
}

const innerStyle = {
	position: 'relative',
	textAlign: 'center',
	boxSizing: 'border-box'
}

export default class TimerScreen extends Component {
	render() {
		return <div className="center-children" style={outerStyle}>
			<StreakControll style={{position: 'absolute', top: '1.5rem', right: '2rem'}}/>
			<div style={innerStyle}>
				<div>
					<TimerControlls style={{marginBottom: '4.9rem'}} />
					<Clock />
					<InfoMessage style={{color: STYLES.GRAY_TEXT}}/>
					<QuotesDisplayer style={{color: STYLES.GRAY_TEXT, marginTop: '6.5rem'}}/>
				</div>
			</div>
		</div>
	}
}