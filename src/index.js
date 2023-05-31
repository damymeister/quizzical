import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./components/styles/style.css"
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "./Redux/reducers/themeReducer";
const store = configureStore({ reducer: themeReducer });
ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById("root"))