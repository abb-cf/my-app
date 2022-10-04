import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

import './index.css';

class MyFlixApplication extends React.Component
{
    render() {
        return (
            <MainView />
        );
    }
}

const container = document.getElementsByClassName("app-container")[0];

// const root = createRoot(React.createElement(MyFlixApplication), container);
// root.render(<MainView />);

ReactDOM.render(React.createElement(MyFlixApplication), container);