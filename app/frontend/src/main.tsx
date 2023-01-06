import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import {Provider} from 'react-redux'
import store from './services/store.js'

import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
