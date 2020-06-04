import React, { Component } from 'react';
import context from '../context';
import Bar from '../bar';
import './index.scss';

export default class Console extends Component {
	static contextType = context;

	render() {
		return (
			<div id="console">
				<Bar>console</Bar>
				<div id='exec-out'>{this.context.exec}</div>
			</div>
		);
	}
}
