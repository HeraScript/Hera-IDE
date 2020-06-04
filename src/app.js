import React, { Component } from 'react';
import Context from './context';
import Examples from './examples';
import SourceMirror from './sourceMirror';
import OutMirror from './outMirror';
import Console from './console';
import LayoutHandler from './layoutHandler';
import './theme.scss';
import './app.scss';

export default class App extends Component {
	state = {
		exec: '',
		sourceMirror: null,
		outMirror: null,
		compile: () => {},
		run: () => {},
	};

	render() {
		return (
			<div id="app">
				<Context.Provider
					value={{
						...this.state,
						updateExec: exec => this.setState({ exec }),
						updateSourceMirror: mirror => this.setState({ sourceMirror: mirror }),
						updateOutMirror: mirror => this.setState({ outMirror: mirror }),
						updateCompile: fn => this.setState({ compile: fn }),
						updateRun: fn => this.setState({ run: fn }),
					}}
				>
					<Examples />
					<SourceMirror />
					<OutMirror />
					<Console />
					<LayoutHandler />
				</Context.Provider>
			</div>
		);
	}
}
