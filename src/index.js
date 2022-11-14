import React from 'react';
// import reactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import { createStore } from 'redux';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

const container = document.getElementsByClassName("app-container")[0];

const root = createRoot(container);
root.render(React.createElement(MyFlixApplication));