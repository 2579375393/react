/**
 * Created by Administrator on 2018/4/6 0006.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line
const root = document.getElementById('root')
const render = (Component) => {
  const method = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  method(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
    render(NextApp)
  })
}

