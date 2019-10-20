import React from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import { HEADER_ALLOWANCE } from './utils/constants'
import {
  Home,
  TheMediumClap,
  CompoundComponents,
  ControlProps,
  CustomHooks,
  PropsCollection,
  PropGetters,
  StateInitializers,
  StateReducers
} from './content'

const StyledAppBody = styled.div`
  padding-top: ${() => `${HEADER_ALLOWANCE}vh`};
  background: #191921;
`

const Body = () => {
  return (
    <StyledAppBody>
      <Router>
        <Home default path='/home' />
        <TheMediumClap path='/the-medium-clap' />
        <CompoundComponents path='/compound-components' />
        <ControlProps path='/control-props' />
        <CustomHooks path='/custom-hooks' />
        <PropsCollection path='/props-collection' />
        <PropGetters path='/prop-getters' />
        <StateInitializers path='/state-initializers' />
        <StateReducers path='/state-reducers' />
      </Router>
    </StyledAppBody>
  )
}

export default Body
