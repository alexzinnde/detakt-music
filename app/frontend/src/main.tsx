import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import {Provider} from 'react-redux'
import store from './services/store.js'
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
