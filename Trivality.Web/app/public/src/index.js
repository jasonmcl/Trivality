import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import 'antd/dist/antd.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
