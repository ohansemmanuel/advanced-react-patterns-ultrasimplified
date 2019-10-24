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
import Usage7 from '../patterns/07'
import Usage8 from '../patterns/08'

export const PropGetters = () => (
  <StyledContentContainer>
    <H1>Prop Getters </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage7 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why prop getters?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage8 />
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
