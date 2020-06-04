import React, { Component } from 'react';
import './index.scss';

const EXPLORER_WIDTH_MIN = 0;
const EXPLORER_WIDTH_MAX = 400;
const EDITOR_WIDTH_MIN = 150;
const EDITOR_HEIGHT_MIN = 36;
const OUTPUT_HEIGHT_MIN = 36;

export default class LayoutHandler extends Component {
	handv = window.innerWidth * 0.6;
	handh = window.innerHeight * 0.7;
	handex = window.innerWidth * 0.15;

	dhv = React.createRef();
	dhh = React.createRef();
	dhex = React.createRef();

	registerHandlerEvents = (handler, set) => {
		const start = e => {
			e.preventDefault();
			const mouseHandler = event => {
				if (event.buttons === 1) {
					let x = event.pageX;
					let y = event.pageY;
					set({ x, y });
					this.setView();
				}
			};

			const touchHandler = event => {
				if (event.touches.length) {
					const x = event.touches[0].clientX;
					const y = event.touches[0].clientY;
					set({ x, y });
					this.setView();
				}
			};

			const clear = () => {
				document.body.removeEventListener('mousemove', mouseHandler);
				document.body.removeEventListener('touchmove', touchHandler);
				document.body.removeEventListener('mouseup', clear);
				document.body.removeEventListener('touchend', clear);
				document.body.removeEventListener('touchcancel', clear);
			};

			document.body.addEventListener('mousemove', mouseHandler);
			document.body.addEventListener('touchmove', touchHandler);
			document.body.addEventListener('mouseup', clear);
			document.body.addEventListener('touchend', clear);
			document.body.addEventListener('touchcancel', clear);
		};

		handler.addEventListener('mousedown', start);
		handler.addEventListener('touchstart', start);
	};

	setView = () => {
		const W = window.innerWidth;
		const H = window.innerHeight;

		document.body.style.setProperty('--codeh', `${(this.handh / H) * 100}vh`);
		document.body.style.setProperty('--handex', `${(this.handex / W) * 100}vw`);
		document.body.style.setProperty('--handv', `${(this.handv / W) * 100}vw`);
	};

	componentDidMount() {
		this.registerHandlerEvents(this.dhv.current, ({ x }) => {
			x = Math.max(x, this.handex + EDITOR_WIDTH_MIN);
			x = Math.min(x, window.innerWidth - EDITOR_WIDTH_MIN);
			this.handv = x;
		});

		this.registerHandlerEvents(this.dhh.current, ({ y }) => {
			y = Math.max(y, EDITOR_HEIGHT_MIN);
			y = Math.min(y, window.innerHeight - OUTPUT_HEIGHT_MIN);
			this.handh = y;
		});

		this.registerHandlerEvents(this.dhex.current, ({ x }) => {
			x = Math.max(x, EXPLORER_WIDTH_MIN);
			x = Math.min(x, EXPLORER_WIDTH_MAX, this.handv - EDITOR_WIDTH_MIN);
			this.handex = x;
		});
	}

	render() {
		return [
			<div id="hand-ex" key="hand-ex" ref={this.dhex}>
				<div id="hand-ex-inner" />
			</div>,
			<div id="hand-h" key="hand-h" ref={this.dhh}>
				<div id="hand-h-inner" />
			</div>,
			<div id="hand-v" key="hand-v" ref={this.dhv}>
				<div id="hand-v-inner" />
			</div>,
		];
	}
}
