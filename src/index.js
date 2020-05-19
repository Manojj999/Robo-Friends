import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createLogger,applyMiddleware} from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { searchRobots } from './reducers'

const loger = createLogger();
const store = createStore(searchRobots,applyMiddleware(loger))

ReactDOM.render(
    <Provider store={store}>
        <App  />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
