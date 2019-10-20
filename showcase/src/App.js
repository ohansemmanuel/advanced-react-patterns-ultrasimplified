import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Body from './Body'

const StyledContainer = styled.div`
  display: grid;
  grid:
    'sidebar body'
    100vh /24% 1fr;
`

const App = () => {
  return (
    <StyledContainer>
      <Sidebar />
      <Body />
    </StyledContainer>
  )
}

export default hot(module)(App)
