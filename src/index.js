import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as sw from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

sw.register();
