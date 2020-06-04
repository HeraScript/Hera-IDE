import React, { Component } from 'react';
import './index.scss';

export default class Bar extends Component {
	render() {
		return <div className="bar">{this.props.children}</div>;
	}
}
