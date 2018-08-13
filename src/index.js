import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './store/reducers/reducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const myStore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Provider store={myStore}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
