import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store";

import { appRouter } from './App.jsx'

import './index.css'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider  router={appRouter}/>
  </React.StrictMode>
  </Provider>
)
