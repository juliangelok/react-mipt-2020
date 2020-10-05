import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import MainPage from './components/main_page'
import LoginForm from './components/login_form'
import RegisterForm from './components/register_form'


import { saveState, loadState } from './persist_store'
import { get_random_meme } from './actions'

require('file-loader?name=[name].[ext]!./index.html');


import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer } from './reducers'

const loggerMiddleware = createLogger();
const persistedState = loadState();

const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.subscribe(() => {
    saveState( store.getState() );
});

store.dispatch(get_random_meme());


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/register' component={RegisterForm} />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
