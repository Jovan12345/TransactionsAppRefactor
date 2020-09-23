import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,  compose } from 'redux';
import { Provider } from 'react-redux';
//@ts-ignore
import App from './components/App.tsx';
import reducers from './reducers';
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;
const store = createStore(
    reducers,
    composeEnhansers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);