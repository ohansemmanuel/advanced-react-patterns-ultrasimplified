import React from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import { HEADER_ALLOWANCE } from './utils/constants'
import { Home } from './content'
import {
  media,
  StyledFloatingBtn,
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

const PR_ROOT =
  'https://github.com/ohansemmanuel/advanced-react-patterns-ultrasimplified/pull'
const PR_IDs = [1, 16, 17, 19, 6, 7, 8, 9, 10, 12]
const PRs = PR_IDs.map(id => `${PR_ROOT}/${id}`)

const RouteComponent = ({ pattern, index, isMediumOrLarger }) => {
  const firstLetterCap = str => str.slice(0, 1).toUpperCase() + str.slice(1)
  const title = pattern
    .split('-')
    .map(firstLetterCap)
    .join(' ')

  const transformIndex = i => (i < 10 ? `0${i}` : i)
  const indexes = [index, index + 1].map(transformIndex)

  // Demo to be shown in Display Boxes
  let Demo1, Demo2
  try {
    Demo1 = require(`./patterns/${indexes[0]}`).default
  } catch (error) {
    Demo1 = () => null
  }
  try {
    Demo2 = require(`./patterns/${indexes[1]}`).default
  } catch (error) {
    Demo2 = () => null
  }

  const goToCodeImplementatiomn = () => {
    const newWindow = window.open(PRs[index], 'blank')
    newWindow.opener = null
  }

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
              onClick={goToCodeImplementatiomn}
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
