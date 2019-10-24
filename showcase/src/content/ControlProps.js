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
import Usage4 from '../patterns/04'
import Usage5 from '../patterns/05'

export const ControlProps = () => (
  <StyledContentContainer>
    <H1>Control Props </H1>

    <Columns>
      <Column>
        <Box isPrimary>
          <Usage4 />
        </Box>
        <CTAContainer alignRight>
          <Button text='Why control props?' primary />
        </CTAContainer>
      </Column>
      <Column leftGap>
        <Box>
          <Usage5 />
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
