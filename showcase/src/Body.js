import React, { useState } from 'react'
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
  StateReducers,
  ReusableStyles
} from './content'
import { media, StyledFloatingBtn } from './content/StyledContent'

const StyledAppBody = styled.div`
  background: #191921;
  padding: ${() => `${HEADER_ALLOWANCE / 6}vh 10px`};

  ${media.md`
    padding: ${() => `${HEADER_ALLOWANCE}vh 0`};
  `}
`

const Body = ({ setShowSidebar, isMediumOrLarger }) => {
  const toggleSidebar = () => setShowSidebar(val => !val)

  return (
    <StyledAppBody>
      <Router>
        <Home default path='/' />
        <TheMediumClap path='/the-medium-clap' />
        <CompoundComponents path='/compound-components' />
        <ReusableStyles path='reusable-styles' />
        <ControlProps path='/control-props' />
        <CustomHooks path='/custom-hooks' />
        <PropsCollection path='/props-collection' />
        <PropGetters path='/prop-getters' />
        <StateInitializers path='/state-initializers' />
        <StateReducers path='/state-reducers' />
      </Router>
      {!isMediumOrLarger && (
        <StyledFloatingBtn onClick={toggleSidebar}>+</StyledFloatingBtn>
      )}
    </StyledAppBody>
  )
}

export default Body
