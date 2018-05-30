import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Button } from 'antd-mobile';

import Routers from './routers'

import 'antd-mobile/dist/antd-mobile.css';
import './styles/index.less'

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                hello
                <Button>
                    test
                </Button>
            </div>
            // <HashRouter>
            //     <Routers />
            // </HashRouter>
        )
    }
}

render(<App/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
