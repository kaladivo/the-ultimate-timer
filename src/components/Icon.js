import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired
	}

	render(){
		const {name, ...props} = this.props;
		return <i {...props} className={"fa fa-" + name} aria-hidden="true"></i>
	}
}