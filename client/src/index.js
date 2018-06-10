import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider as SlotProvider } from 'react-slot-fill';
import { Button } from 'antd-mobile';

import Routers from './routers'

// import 'antd-mobile/dist/antd-mobile.css';
import './styles/index.less'

class App extends React.Component {
    render() {
        return (
            <SlotProvider>
                <div className="app-container">
                    <Routers />
                </div>
            </SlotProvider>
        )
    }
}

render(<App/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
