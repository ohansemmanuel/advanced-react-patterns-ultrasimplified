import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import App from './App'

const GlobalStyle = createGlobalStyle`
*,
*:before,
*:after {
    box-sizing: border-box;
}

  body {
    padding: 0;
    margin: 0;
    color: #b2bbc8;
    font-family: 'Avenir';
    font-size: 16px;
    font-weight: 500;
  }

  button {
    font-family: 'Avenir';
    font-weight: 300;
    cursor: pointer;
    text-align: center;
    border: 0;
    outline: 0;
    color: #fff;
  }

`

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
)
