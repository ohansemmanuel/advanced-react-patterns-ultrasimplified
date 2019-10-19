import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import './App.css'

const App = ({ name }) => {
  const [count, setCount] = useState(100)
  return (
    <div className='App'>
      <h1>{`Welcome to ${count}k Euros, ${name}`}</h1>
      <p>Hola como estas is ...</p>
      <button onClick={() => setCount(c => c + 1)}>=>=>=></button>
    </div>
  )
}

export default hot(module)(App)
