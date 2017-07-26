import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Recatngle extends Component {
	static propTypes = {
		width: PropTypes.string.isRequired,
		height: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
	}

	render () {
		const {width, height, color, style, ...props} = this.props;
		const styleToUse = {
			width, 
			height, 
			backgroundColor: color,
			...style
		}
		return <div style={styleToUse} {...props}></div>
	}
}