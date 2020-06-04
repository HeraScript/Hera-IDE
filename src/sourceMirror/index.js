import React, { Component } from 'react';
import context from '../context';
import Bar from '../bar';
import './index.scss';
import stdlib from '../snippets/stdlib.hera';

export default class SourceMirror extends Component {
	static contextType = context;

	source = React.createRef();

	componentDidMount() {
		if (this.source.current) {
			this.mirror = CodeMirror(this.source.current, {
				mode: 'hera',
				lineNumbers: true,
				styleActiveLine: true,
				tabSize: 2,
				indentWithTabs: true,
			});
			this.mirror.setSize('100%', '100%');
			this.context.updateSourceMirror(this.mirror);
			this.context.updateCompile(this.compile.bind(this));
		}
	}

	compile = () => {
		const sourceCode = this.mirror.getValue();

		if (sourceCode === '') return;

		const output = Hera.compile(stdlib + '\n' + sourceCode + '\n');
		if (output.success) {
			this.context.outMirror.setValue(
				prettier.format(output.value, {
					parser: 'babel',
					plugins: prettierPlugins,
					printWidth: 120,
				}),
			);
			this.context.updateExec('');
		} else {
			const stdlen = stdlib.split('\n').length;
			const { raw, column } = output.state.getRowColumn();
			this.context.updateExec(
				'Compile error: ' + output.expected() + ' expected at' + ` line: ${raw - stdlen}` + ` column: ${column}`,
			);
		}
	};

	render() {
		return (
			<div id="source">
				<Bar>
					Editor
					<div className="tool">
						<button onClick={this.compile}>Compile</button>
					</div>
				</Bar>
				<div className="source-mirror" ref={this.source} />
			</div>
		);
	}
}
