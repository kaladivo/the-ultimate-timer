import {action, computed, observable} from 'mobx';
import {toMilisec} from '../utils';
// import ring from '../ring.wav';
import {displayNotification} from '../utils';

export const MODE_WORK = 'work';
export const MODE_BREAK = 'break';

export const DEFAULT_PREFERENCES = {
	workDuration: toMilisec({min: 25}),
	breakDuration: toMilisec({min: 5}),
	longBreakDuration: toMilisec({min: 15}),
	longBreakEvery: 4,
}

const KEY_STREAK = 'streak';

const getPreferences = () => {
	return DEFAULT_PREFERENCES;
}

export default class TimerStore {
	@observable startedAt = null; 
	@observable mode = MODE_WORK;
	@observable streak = 0;
	@observable pausedAt = null;
	@observable totalPausedTime = 0;

	@observable _currentTargetDuration;

	constructor() {
		this._setStreak(Number(localStorage.getItem(KEY_STREAK) || 0));
		this._currentTargetDuration = this.targetDuration;
	}

	@action pause = () => {
		if(this.isPaused) throw new Error('Already paused.');
		this.pausedAt = Date.now();
	}

	@action unpause = () => {
		if(!this.isPaused) throw new Error('Timer not paused.');

		// Move started at so the 
		this.totalPausedTime += Date.now() - this.pausedAt;
		this.pausedAt = null;
	}

	@action stop = () => {
		this.reset();
		this.mode = MODE_WORK;
	}

	@action reset = () => {
		this.startedAt = null;
		this.pausedAt = null;
		this.totalPausedTime = 0;
	}

	@action _setStreak = streak => {
		this.streak = streak;
		localStorage.setItem(KEY_STREAK, streak);
	}

	@action start = () => {
		if(this.isRunning) throw new Error('Already running.');

		this._currentTargetDuration = this.targetDuration;
		this.startedAt = Date.now();
	}

	@action updateState = () => {
		if(this.timeLeft > 0 || this.isPaused) return;
		// new Audio(ring).play();

		displayNotification({title: 'Time is up', text: 'Your Pomodoro timer just run out!'});

		if(this.isWork) {
			this._setStreak(this.streak + 1);
		}
		this.mode = this.isWork? MODE_BREAK : MODE_WORK;
		this.reset();
	}

	@action resetStreak = () => {
		this._setStreak(0);
	}

	@action skipBreak = () => {
		if(!this.isBreak) 
			throw new Error('You can not skip break when the mode is not break.');

		this.mode = MODE_WORK;
	}

	@computed get timeLeft() {
		if(! this.isRunning && !this.isPaused) return this.targetDuration;
		return this.startedAt 
			+ this.totalPausedTime 
			+ this.targetDuration 
			- (this.isPaused? this.pausedAt: Date.now());
	}

	@computed get isWork() {
		return this.mode === MODE_WORK;
	}

	@computed get isBreak() {
		return this.mode === MODE_BREAK;
	}

	@computed get isLongBreak() {
		return this.isBreak && this.streak !== 0 && (this.streak % getPreferences().longBreakEvery) === 0;
	}

	@computed get targetDuration() {
		if(this.isRunning) return this._currentTargetDuration;

		const preferences = getPreferences();
		if(this.isLongBreak) return preferences.longBreakDuration;
		else if(this.isBreak) return preferences.breakDuration;
		else if(this.isWork) return preferences.workDuration;
		else throw new Error('Unrecognizable mode: ' + this.mode);
	}

	@computed get isPaused() {
		return this.pausedAt != null;
	}

	@computed get isRunning() {
		return !this.isPaused && this.startedAt;
	}
}

export const INSTANCE = window.t = new TimerStore();