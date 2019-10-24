import React from 'react'

import {
  StyledContentContainer,
  H1,
  Columns,
  Column,
  Box,
  CTAContainer
} from './StyledContent'
import GithubLogo from '../assets/github_logo.svg'
import Button from '../Button'
import Usage9 from '../patterns/09'
import Usage10 from '../patterns/10'

export const StateReducers = () => (
  <StyledContentContainer>
    <H1>State Reducers </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage9 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why state reducers?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage10 />
        </Box>
        <CTAContainer>
          <Button
            text='Code Implementation'
            Icon={<GithubLogo style={{ width: '18px' }} />}
          />
        </CTAContainer>
      </Column>
    </Columns>
  </StyledContentContainer>
)
