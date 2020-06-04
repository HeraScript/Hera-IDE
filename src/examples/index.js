import React, { Component } from 'react';
import qs from 'qs';
import context from '../context';
import Bar from '../bar';
import './index.scss';
import partialFunction from '../snippets/partial-function.hera';
import userDefinedOp from '../snippets/user-defined-operator.hera';
import builtinOp from '../snippets/builtin-operator.hera';
import basic from '../snippets/basic-syntax.hera';
import nativeDirective from '../snippets/native-directive.hera';
import factorial from '../snippets/factorial.hera';

export default class Examples extends Component {
	static contextType = context;

	snippets = {
		'basic-syntax': basic,
		'partial-function': partialFunction,
		'user-defined-operator': userDefinedOp,
		'builtin-operator': builtinOp,
		'native-directive': nativeDirective,
		factorial: factorial,
	};

	state = {
		active: null,
	};

	componentDidMount() {
		const search = location.search;
		if (search && search.length > 1) {
			const { name } = qs.parse(search.substr(1));
			this.setState({ active: name });
			setTimeout(() => {
				this.context.sourceMirror.setValue(this.snippets[name] || '');
				this.context.compile();
				this.context.run();
			}, 0);
		}
	}

	select = name => {
		this.setState({ active: name });
		this.context.sourceMirror.setValue(this.snippets[name] || '');
		this.context.compile();
		this.context.run();
	};

	copyLink = (name, e) => {
		e.stopPropagation();
		const url = location.origin + location.pathname + '?name=' + name;
		navigator.clipboard.writeText(url);
	};

	renderSnippets = () => {
		const { active } = this.state;
		return Object.keys(this.snippets).map(name => (
			<li key={name} className={`${active === name ? 'active' : ''}`} onClick={() => this.select(name)}>
				<span className="anchor" onClick={e => this.copyLink(name, e)}>
					#
				</span>
				{name}
			</li>
		));
	};

	render() {
		return (
			<div id="examples">
				<Bar>Examples</Bar>
				<ul id="snippet-list">{this.renderSnippets()}</ul>
			</div>
		);
	}
}
