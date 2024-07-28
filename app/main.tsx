import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import App from './App'
import { store, useStore } from './store'

const rootElement = document.getElementById('Root')!
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)


useStore