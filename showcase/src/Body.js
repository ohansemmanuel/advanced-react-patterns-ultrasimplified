import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { Router } from '@reach/router'
import { HEADER_ALLOWANCE } from './utils/constants'
import { Home } from './content'
import {
  media,
  StyledFloatingBtn,
  SCREEN_SIZES,
  StyledContentContainer,
  H1,
  Columns,
  Column,
  Box,
  CTAContainer
} from './content/StyledContent'
import GithubLogo from './assets/github_logo.svg'
import Button from './Button'

const StyledAppBody = styled.div`
  background: #191921;
  padding: ${() => `${HEADER_ALLOWANCE / 6}vh 10px`};

  ${media.md`
    padding: ${() => `${HEADER_ALLOWANCE}vh 0`};
  `}
`

const patterns = [
  'the-medium-clap',
  'compound-components',
  'reusable-styles',
  'control-props',
  'custom-hooks',
  'props-collection',
  'prop-getters',
  'state-initializers',
  'state-reducers'
]

const notes = {
  '1': 'Animated via an HOC',
  '2': 'Animated via a hook 💪'
}

const RouteComponent = ({ pattern, index, isMediumOrLarger }) => {
  const firstLetterCap = str => str.slice(0, 1).toUpperCase() + str.slice(1)
  const title = pattern
    .split('-')
    .map(firstLetterCap)
    .join(' ')

  const transformIndex = i => (i < 10 ? `0${i}` : i)
  const indexes = [index, index + 1].map(transformIndex)
  const Demo1 = require(`./patterns/${indexes[0]}`).default
  const Demo2 = require(`./patterns/${indexes[1]}`).default

  return (
    <StyledContentContainer>
      <H1>{title}</H1>

      <Columns>
        <Column>
          <Box isPrimary note={notes[index]}>
            <Demo1 />
          </Box>
          {isMediumOrLarger && (
            <CTAContainer alignRight>
              <Button text={`Why ${title}?`} primary />
            </CTAContainer>
          )}
        </Column>
        <Column leftGap>
          <Box note={notes[index + 1]} m={!isMediumOrLarger && '15px 0 0 0'}>
            <Demo2 />
          </Box>
          {!isMediumOrLarger && (
            <CTAContainer>
              <Button text={`Why ${title}?`} primary />
            </CTAContainer>
          )}
          <CTAContainer mtop={!isMediumOrLarger && '10px'}>
            <Button
              text='Code Implementation'
              Icon={<GithubLogo style={{ width: '18px' }} />}
            />
          </CTAContainer>
        </Column>
      </Columns>
    </StyledContentContainer>
  )
}

const Body = ({ setShowSidebar, isMediumOrLarger }) => {
  const toggleSidebar = () => setShowSidebar(val => !val)

  return (
    <StyledAppBody>
      <Router>
        <Home path='/' />
        {patterns.map((pattern, index) => (
          <RouteComponent
            pattern={pattern}
            index={index + 1}
            path={pattern}
            key={pattern}
            isMediumOrLarger={isMediumOrLarger}
          />
        ))}
      </Router>
      {!isMediumOrLarger && (
        <StyledFloatingBtn onClick={toggleSidebar}>+</StyledFloatingBtn>
      )}
    </StyledAppBody>
  )
}

export default Body
