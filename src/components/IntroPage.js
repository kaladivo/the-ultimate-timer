import React, {Component} from 'react';
import Recatngle from './Rectangle';


const centerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	position: 'absolute',
	top: '0',
	bottom: '0',
	left: '0',
	right: '0'
}

export default class IntroPage extends Component {

	render() {
		return <div style={centerStyle}>
			<div style={{paddingBottom: '5rem'}}>
				<h1 style={{letterSpacing: '8px', fontSize: '2.5rem', marginBottom: '1.25rem'}}>Pomodoro Timer</h1>
				<Recatngle className="line" width="50%" height="2px" color="white" style={{margin: '0 auto'}} />
			</div>
		</div>
	}
}