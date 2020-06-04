import React, { Component } from 'react';
import context from '../context';
import Bar from '../bar';
import './index.scss';

export default class OutMirror extends Component {
	static contextType = context;

	out = React.createRef();

	componentDidMount() {
		if (this.out.current) {
			this.outMirror = CodeMirror(this.out.current, {
				mode: 'javascript',
				readOnly: true,
				lineNumbers: true,
			});
			this.outMirror.setSize('100%', '100%');
			this.context.updateOutMirror(this.outMirror);
			this.context.updateRun(this.run.bind(this));
		}
	}

	run = () => {
		const compiled = this.context.outMirror.getValue();
		if (compiled !== '') {
			try {
				const exec = eval(compiled);
				this.context.updateExec(exec);
				console.log('exec result:', exec);
			} catch (e) {
				console.error('exec error:', e);
			}
		}
	};

	render() {
		return (
			<div id="out">
				<Bar>
					Compiled
					<div className="tool">
						<button onClick={this.run}>Run</button>
					</div>
				</Bar>
				<div className="out-mirror" ref={this.out} />
			</div>
		);
	}
}
