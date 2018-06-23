import React from 'react'
import 'babel-polyfill';
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider as SlotProvider } from 'react-slot-fill';
import { Provider as MobxProvider } from 'mobx-react';
import { Button } from 'antd-mobile';

import Routers from './routers'

import rootStore from './store';

// import 'antd-mobile/dist/antd-mobile.css';
import './styles/index.less'

class App extends React.Component {
    render() {
        return (
            <MobxProvider {...rootStore}>
                <SlotProvider>
                    {
                        <div className="app-container">
                            <Routers />
                        </div>
                    }
                </SlotProvider>
            </MobxProvider>
        );
    }
}

render(<App/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
