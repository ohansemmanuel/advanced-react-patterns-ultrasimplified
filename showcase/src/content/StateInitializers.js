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
import Usage8 from '../patterns/08'
import Usage9 from '../patterns/09'

export const StateInitializers = () => (
  <StyledContentContainer>
    <H1>State Initializers </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage8 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why state initializers?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage9 />
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
