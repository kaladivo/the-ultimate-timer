import {action, computed, observable, observe} from 'mobx';
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {toSecondsAndMinutes} from '../utils';

const TICK_INTERVAL = 1000;

class ClockStore {
	@observable min;
	@observable sec;

	@action tick = (timeLeft) => {
		const {min, sec} = toSecondsAndMinutes(timeLeft);
		this.min = min;
		this.sec = sec;
	}

	@computed get minToDisplay() {
		return (this.min < 10)? '0' + this.min : this.min;
	}

	@computed get secToDisplay() {
		return (this.sec < 10)? '0' + this.sec : this.sec;
	}
}

const style = {
	fontSize: '6rem'
}

@inject('timerStore')
@observer
export default class Clock extends Component {
	constructor(props) {
		super(props);
		this.clockStore = new ClockStore();
		this.clockStore.tick(props.timerStore.timeLeft);
	}

	componentDidMount() {
		const {tick} = this.clockStore;
		const {timerStore} = this.props;
		this.intervalId = setInterval(() => {
				tick(timerStore.timeLeft);
				timerStore.updateState();
		}, TICK_INTERVAL);
		this.disposer = observe(timerStore, 'isRunning', () => {
			tick(timerStore.timeLeft);
		});
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
		this.disposer();
	}

	render() {
		let {minToDisplay, secToDisplay} = this.clockStore;

		return <div style={style}>{minToDisplay}:{secToDisplay}</div>
	}
}