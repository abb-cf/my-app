import React from 'react';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import { createRoot } from 'react-dom/client';

import './index.scss';

class MyFlixApplication extends React.Component
{
    render() {
        return (
            <Container>
                <MainView />
            </Container>
            
        );
    }
}

const container = document.getElementsByClassName("app-container")[0];

// const root = createRoot(React.createElement(MyFlixApplication), container);
// root.render(<MainView />);


const root = createRoot(container);
root.render(React.createElement(MyFlixApplication));