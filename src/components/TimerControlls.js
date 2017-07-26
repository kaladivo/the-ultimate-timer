import React, {Component} from 'react'
import {inject, observer} from 'mobx-react';
import Icon from './Icon';

const buttonStyle = {
	fontSize: '5rem',
	cursor: 'pointer',
}

const defaultContainerStyle = {
}

@inject('timerStore')
@observer
export default class TimerControlls extends Component {
	render() {
		const {style, timerStore} = this.props;
		const {isPaused, isRunning, start, pause, unpause, stop} = timerStore;

		let containerStyle = {...defaultContainerStyle, ...style};

		if(isPaused) {
			return <div  style={containerStyle}>
				<Icon onClick={unpause} style={buttonStyle} name="play" />
				<Icon onClick={stop} style={{...buttonStyle, marginLeft: '1rem'}} name="stop" />
			</div>
		} else if(isRunning){
		 return <div style={containerStyle}>
				<Icon onClick={pause} style={buttonStyle} name="pause" />
			</div>;
		} else {
			return <div style={containerStyle}>
				<Icon onClick={start} style={buttonStyle} name="play" />
			</div>
		}
	}
}